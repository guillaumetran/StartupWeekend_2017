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
  Dimensions
} from "react-native";
import CardModal from "../Shared/CardModal";
import ModalLine from "../Shared/ModalLine";
import ReductionImage from "../Shared/ReductionImage";

const { height, width } = Dimensions.get("window");

export default class Home extends React.Component {
  state = {
    reductionModal: false
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center" }}>
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
              onPress={() => this.setState({ reductionModal: true })}
            >
              <ReductionImage
                image={require("../assets/images/kfc.jpg")}
                title="KFC"
                description="Jusqu'à -15% !"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.95,
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flex: 0.95,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity style={{ flex: 0.49 }}>
                <View
                  style={{ flex: 1, backgroundColor: "blue", borderRadius: 20 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 0.49 }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "green",
                    borderRadius: 20
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ flex: 0.95, flexDirection: "row" }}>
            <TouchableOpacity style={{ flex: 0.95 }}>
              <View
                style={{ flex: 1, backgroundColor: "blue", borderRadius: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <CardModal
          swipeArea={height / 3}
          swipeThreshold={50}
          isOpen={this.state.reductionModal}
          onClosed={() => this.setState({ reductionModal: false })}
          headerSize={0.25}
          backdropOpacity={0.9}
          header={
            <View style={{ flex: 0.25, backgroundColor: "transparent" }}>
              <ModalLine />
            </View>
          }
          backdropContent={
            <View style={{ flex: 0.24, backgroundColor: "transparent" }}>
              <ReductionImage
                image={require("../assets/images/kfc.jpg")}
                date={true}
                title="KFC"
              />
            </View>
          }
        >
          <Text style={{ marginTop: 20 }}>OUIIII</Text>
        </CardModal>
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
