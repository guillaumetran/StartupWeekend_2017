/**
 * Created by guillaumetran on 26/11/2017.
 */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity
} from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";

export default class ReductionContent extends React.Component {
  state = {
    location: null
  };

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

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        error: true
      });
    } else {
      this._getLocationAsync();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.2, justifyContent: "center" }}>
          <View
            style={{
              flex: 0.8,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <View style={{ flex: 0.8 }}>
              <Text style={styles.description}>
                Conditions : Offre valable du 16/09/2017 au 14/09/2017 Présenter
                son défi validé dans l’établissement.
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              flex: 0.8,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <View style={{ flex: 0.8, borderRadius: 15 }}>
              <MapView
                initialRegion={{
                  latitude: 48.5523076,
                  longitude: 7.7085868,
                  latitudeDelta: 0.0322,
                  longitudeDelta: 0.0322
                }}
                provider={MapView.PROVIDER_GOOGLE}
                ref={map => (this.map = map)}
                showsUserLocation={true}
                style={{ flex: 1 }}
                customMapStyle={mapStyle}
              >
                <MapView.Marker
                  coordinate={{ latitude: 48.5523076, longitude: 7.7085868 }}
                />
              </MapView>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.15, justifyContent: "center" }}>
          <View
            style={{
              flex: 0.8,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <View style={{ flex: 0.8 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "#2ECC71",
                  borderRadius: 10
                }}
                onPress={() => {
                  if (this.props.updateNotif) this.props.updateNotif();
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <View style={styles.item}>
                    <Text style={styles.text}>Accepter le défi</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: "white",
    fontSize: 18,
    fontFamily: "avenir-book"
  },
  description: {
    color: "#5A5A5A",
    fontSize: 18,
    fontFamily: "avenir-book",
    textAlign: "justify",
    lineHeight: Platform.OS === "ios" ? 20 : 40
  },
  item: {
    flex: 1,
    alignItems: "center"
  }
});
