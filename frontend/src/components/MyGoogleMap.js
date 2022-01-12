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
  state = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    geoCoder: null,
    placesStart: [],
    placesEnd: [],
    center: [],
    zoom: 9,
    address: "",
    draggable: true,
    latStart: null,
    lngStart: null,
    latEnd: null,
    lngEnd: null,
  };

  componentWillMount() {
    this.setCurrentLocation();
  }

  onMarkerInteraction = (childKey, childProps, mouse) => {
    this.setState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    });
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
  };

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });

    this._generateAddress();
  };

  addStartPlace = (place) => {
    this.setState({
      placesStart: [place],
      latStart: place.geometry.location.lat(),
      lngStart: place.geometry.location.lng(),
    });
    this._generateAddress();
  };
  addEndPlace = (place) => {
    this.setState({
      placesEnd: [place],
      latEnd: place.geometry.location.lat(),
      lngEnd: place.geometry.location.lng(),
    });
    this._generateAddress();
  };

  _generateAddress() {
    const { mapApi } = this.state;

    const geocoder = new mapApi.Geocoder();

    geocoder.geocode({ location: { lat: this.state.latStart, lng: this.state.lngStart } }, (results, status) => {
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
    });
  }

  // Get Current Location Coordinates
  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: [position.coords.latitude, position.coords.longitude],
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }

  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
    console.log(this.state.latStrat);
    console.log(this.state.lngStart);
    console.log(this.state.latEnd);
    console.log(this.state.lngEnd);
    return (
      <div style={{ height: "100vh", width: "100vh" }}>
        {mapApiLoaded && (
          <>
          <div>
            <h6>ride beginning</h6>
            <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addStartPlace} />
          </div>
          <div>
            <h6>ride end</h6>
            <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addStartPlace} />
          </div></>
        )}
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
          <Marker text={this.state.address} lat={this.state.latStart} lng={this.state.lngEnd} />
        </GoogleMapReact>

        <div className="info-wrapper">
          <div className="map-details">
            Latitude: <span>{this.state.latStart}</span>, Longitude: <span>{this.state.lngEnd}</span>
          </div>
          <div className="map-details">
            Zoom: <span>{this.state.zoom}</span>
          </div>
          <div className="map-details">
            Address: <span>{this.state.address}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MyGoogleMap;
