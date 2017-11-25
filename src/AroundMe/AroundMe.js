/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";
import Loader from "../Shared/Loader";

const { width, height } = Dimensions.get("window");

export default class AroundMe extends React.Component {
  state = {
    location: null,
    index: 0,
    restaurant: null,
    error: false
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        error: true
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        error: true
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  render() {
    if (!this.state.location || this.state.error) {
      return <Loader />;
    }
    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.map = map)}
          provider={MapView.PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0122
          }}
          customMapStyle={mapStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8"
  }
});

mapStyle = [
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [{ visibility: "on" }, { saturation: -100 }, { lightness: 65 }]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      { visibility: "simplified" },
      { saturation: -100 },
      { lightness: 51 }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [{ visibility: "simplified" }, { saturation: -100 }]
  },
  {
    featureType: "road.arterial",
    elementType: "all",
    stylers: [{ visibility: "on" }, { saturation: -100 }, { lightness: 30 }]
  },
  {
    featureType: "road.local",
    elementType: "all",
    stylers: [{ visibility: "on" }, { saturation: -100 }, { lightness: 40 }]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "simplified" }, { saturation: -100 }]
  },
  {
    featureType: "administrative.province",
    elementType: "all",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      { visibility: "on" },
      { color: "#000000" },
      { weight: 0.29 },
      { saturation: -100 },
      { lightness: -13 }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ hue: "#00b3ff" }, { saturation: -21 }, { lightness: -25 }]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#8693a1" },
      { weight: 2.3 },
      { lightness: -13 },
      { gamma: 1.08 }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "on" }, { color: "#000000" }, { weight: 0.48 }]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "on" }, { color: "#ffffff" }, { weight: 2.6 }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "on" }, { color: "#000000" }, { lightness: 21 }]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      { visibility: "on" },
      { color: "#000000" },
      { lightness: -37 },
      { gamma: 0.01 }
    ]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "on" }, { color: "#f5f0f5" }, { weight: 4.43 }]
  }
];
