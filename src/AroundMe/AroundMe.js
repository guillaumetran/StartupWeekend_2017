/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Animated,
  TouchableOpacity,
  Image
} from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";
import Loader from "../Shared/Loader";
import ReductionImage from "../Shared/ReductionImage";
import CardModal from "../Shared/CardModal";
import ModalLine from "../Shared/ModalLine";
import ReductionContent from "../Shared/ReductionContent";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = height / 4;

const reductions = [
  {
    title: "Mezzo Di pasta",
    description: "Profitez d’un maxi box au prix d’un mini",
    image: require("../assets/images/mezzo.png"),
    coordinate: {
      latitude: 48.5523076,
      longitude: 7.7085868
    }
  },
  {
    title: "La Frituur",
    description: "Black Friday 1 cornet acheté 1 cornet offert.",
    image: require("../assets/images/frit.png"),
    coordinate: {
      latitude: 48.5649829,
      longitude: 7.7319789
    }
  },
  {
    title: "Subway",
    description: "Profitez de 2 menus à 10 €",
    image: require("../assets/images/kfc.jpg"),
    coordinate: {
      latitude: 48.580594,
      longitude: 7.7323268
    }
  }
];

export default class AroundMe extends React.Component {
  state = {
    animation: new Animated.Value(0),
    location: null,
    index: 0,
    reductionModal: false,
    error: false,
    selectedRestaurant: null
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

  componentDidMount() {
    this.state.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.state.index !== index) {
          const { coordinate } = reductions[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0122
            },
            350
          );
          this.setState({ index });
        }
      }, 10);
    });
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
            latitudeDelta: 0.1122,
            longitudeDelta: 0.1122
          }}
          customMapStyle={mapStyle}
        >
          {reductions.map((item, index) => {
            return (
              <MapView.Marker
                key={index}
                style={{ backgroundColor: "transparent" }}
                image={require("../assets/images/marker.png")}
                coordinate={item.coordinate}
                onPress={() => {
                  this.refs.scrollView._component.scrollTo({
                    x: index * (CARD_WIDTH + 10),
                    y: 0,
                    animated: false
                  });
                }}
              />
            );
          })}
        </MapView>
        <Animated.ScrollView
          ref="scrollView"
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          snapToAlignment="start"
          decelerationRate="fast"
          style={styles.scrollView}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.state.animation
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
        >
          {reductions.map((item, index) => {
            return (
              <View key={index} style={styles.card}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center"
                  }}
                >
                  <View
                    style={{
                      flex: 0.95,
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    <TouchableOpacity
                      style={{ flex: 0.95 }}
                      activeOpacity={0.7}
                      onPress={() =>
                        this.setState({
                          reductionModal: true,
                          selectedRestaurant: item
                        })}
                    >
                      <ReductionImage
                        image={item.image}
                        title={item.title}
                        description={item.description}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </Animated.ScrollView>
        <CardModal
          swipeArea={height / 3}
          swipeThreshold={50}
          isOpen={this.state.reductionModal}
          onClosed={() => this.setState({ reductionModal: false })}
          headerSize={0.25}
          backdropOpacity={0.7}
          header={
            <View style={{ flex: 0.25, backgroundColor: "transparent" }}>
              <ModalLine />
            </View>
          }
          backdropContent={
            <View style={{ flex: 0.24, backgroundColor: "transparent" }}>
              <ReductionImage
                image={
                  this.state.selectedRestaurant
                    ? this.state.selectedRestaurant.image
                    : require("../assets/images/kfc.jpg")
                }
                date={true}
                title={
                  this.state.selectedRestaurant
                    ? this.state.selectedRestaurant.title
                    : "Nom restaurant"
                }
              />
            </View>
          }
        >
          {this.props.updateNotif ? (
            <ReductionContent
              updateNotif={() => this.props.updateNotif()}
              closeModal={() => this.setState({ reductionModal: false })}
            />
          ) : (
            <ReductionContent
              closeModal={() => this.setState({ reductionModal: false })}
            />
          )}
        </CardModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8"
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  card: {
    marginLeft: 10,
    elevation: 2,
    alignSelf: "center",
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden"
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
