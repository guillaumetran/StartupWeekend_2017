/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  ScrollView
} from "react-native";
import CardModal from "../Shared/CardModal";
import ModalLine from "../Shared/ModalLine";
import ReductionImage from "../Shared/ReductionImage";
import ReductionContent from "../Shared/ReductionContent";

const { height, width } = Dimensions.get("window");

export default class Home extends React.Component {
  state = {
    reductionModal: false,
    selectedRestaurant: null
  };

  reductions = [
    {
      title: "Mezzo Di pasta",
      description: "Profitez d’un maxi box au prix d’un mini",
      image: require("../assets/images/mezzo.jpg")
    },
    {
      title: "La Frituur",
      description: "Black Friday 1 cornet acheté 1 cornet offert.",
      image: require("../assets/images/frit.png")
    },
    {
      title: "Subway",
      description: "Profitez de 2 menus à 10 €",
      image: require("../assets/images/subway.png")
    },
    {
      title: "KFC",
      description: "1000 pas 1 tenders !",
      image: require("../assets/images/kfc.jpg")
    }
  ];

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.reductions.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  height: height / 3,
                  justifyContent: "center"
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
                    activeOpacity={0.8}
                    onPress={() =>
                      this.setState({
                        selectedRestaurant: item,
                        reductionModal: true
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
            );
          })}
        </ScrollView>
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
                    : require("../assets/images/frit.png")
                }
                date={true}
                title={
                  this.state.selectedRestaurant
                    ? this.state.selectedRestaurant.title
                    : "La Frituur"
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
  delimiter: {
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.borderWidth,
    borderWidth: 0.5
  }
});
