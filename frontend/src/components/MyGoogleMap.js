// MyGoogleMaps.js
import React, { Component } from "react";

import GoogleMapReact from "google-map-react";

import styled from "styled-components";

import AutoComplete from "./Autocomplete";
import Marker from "./Marker";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

class MyGoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      geoCoder: null,
      places: [],
      center: [],
      zoom: 11,
      address: "",
      draggable: true,
      lat: null,
      lng: null,
    };
  }

  componentWillMount() {
    this.setCurrentLocation();
  }

  onMarkerInteraction = (childKey, childProps, mouse) => {
    let { setlatStart, setlngStart } = this.props;

    this.setState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    });
    setlatStart(mouse.lat);
    setlngStart(mouse.lng);
  };
  onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    this.setState({ draggable: true });
    this._generateAddress();
  };

  _onChange = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
  };

  _onClick = (value) => {
    this.setState({
      lat: value.lat,
      lng: value.lng,
    });
    let { setlatStart, setlngStart } = this.props;
    setlatStart(value.lat);
    setlngStart(value.lng);
  };

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });

    this._generateAddress();
  };

  addPlace = (place) => {
    let { setlatStart, setlngStart } = this.props;

    this.setState({
      places: [place],
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    setlatStart(place.geometry.location.lat());
    setlngStart(place.geometry.location.lng());
    this._generateAddress();
  };

  _generateAddress() {
    const { mapApi } = this.state;

    const geocoder = new mapApi.Geocoder();

    geocoder.geocode(
      { location: { lat: this.state.lat, lng: this.state.lng } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.setState({ address: results[0].formatted_address });
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  // Get Current Location Coordinates
  setCurrentLocation() {
    let { setlatStart, setlngStart } = this.props;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: [position.coords.latitude, position.coords.longitude],
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setlatStart(position.coords.latitude);
        setlngStart(position.coords.longitude);
      });
    }
  }

  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
    console.log(this.state.lat);
    console.log(this.state.lng);
    return (
      <div className="map-wrapper">
        <div className="info-wrapper">
          <div style={{ display: "none" }} className="map-details">
            Latitude: <span>{this.state.lat}</span>, Longitude:{" "}
            <span>{this.state.lng}</span>
          </div>
          <div style={{ display: "none" }} className="map-details">
            Zoom: <span>{this.state.zoom}</span>
          </div>
          <div className="map-details">
            Address: <span>{this.state.address}</span>
          </div>
        </div>
        {mapApiLoaded && (
          <div>
            <AutoComplete
              map={mapInstance}
              mapApi={mapApi}
              addplace={this.addPlace}
            />
          </div>
        )}
        <div style={{ flexGrow: 1 }}>
          <GoogleMapReact
            center={this.state.center}
            zoom={this.state.zoom}
            draggable={this.state.draggable}
            onChange={this._onChange}
            onChildMouseDown={this.onMarkerInteraction}
            onChildMouseUp={this.onMarkerInteractionMouseUp}
            onChildMouseMove={this.onMarkerInteraction}
            onChildClick={() => console.log("child click")}
            onClick={this._onClick}
            bootstrapURLKeys={{
              key: "AIzaSyCljZ69bf6eNJUFkxFP60RxixCelSkD60I",
              // key: "AIzaSyAM9uE4Sy2nWFfP-Ha6H8ZC6ghAMKJEKps",
              libraries: ["places", "geometry"],
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          >
            <Marker
              text={this.state.address}
              lat={this.state.lat}
              lng={this.state.lng}
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default MyGoogleMap;
