// MyGoogleMaps.js
import React, { Component } from "react";

import GoogleMapReact from "google-map-react";

import styled from "styled-components";

import AutoComplete from "./Autocomplete2";
import Marker from "./Marker2";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

class MyGoogleMap2 extends Component {
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
    let { setlatEnd, setlngEnd } = this.props;

    this.setState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    });
    setlatEnd(mouse.lat);
    setlngEnd(mouse.lng);
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
    let { setlatEnd, setlngEnd } = this.props;

    this.setState({
      lat: value.lat,
      lng: value.lng,
    });
    setlatEnd(value.lat);
    setlngEnd(value.lng);
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
    let { setlatEnd, setlngEnd } = this.props;

    this.setState({
      places: [place],
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    this._generateAddress();
    setlatEnd(place.geometry.location.lat());
    setlngEnd(place.geometry.location.lng());
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
            this.zoom = 13;
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
    let { setlatEnd, setlngEnd } = this.props;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: [position.coords.latitude, position.coords.longitude],
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        setlatEnd(position.coords.latitude);
        setlngEnd(position.coords.longitude);
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

export default MyGoogleMap2;
