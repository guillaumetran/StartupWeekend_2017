/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import { Pedometer } from "expo";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import ReductionImage from "../Shared/ReductionImage";
import CardModal from "../Shared/CardModal";
import ModalLine from "../Shared/ModalLine";

const { width, height } = Dimensions.get("window");

export default class Challenge extends React.Component {
  state = {
    currentStepCount: 0,
    reductionModal: false,
    firstStep: true
  };

  reward() {
    if (this.state.firstStep && this.state.currentStepCount >= 50) {
      this.setState({ reductionModal: true, firstStep: false });
    }
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
      this.reward();
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

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
                progress={this.state.currentStepCount * 3.5}
                progressText={
                  this.state.currentStepCount > 30
                    ? "30 pas / 30 pas"
                    : this.state.currentStepCount + " pas / 30 pas"
                }
              />
            </TouchableOpacity>
          </View>
        </View>
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
                title="La Frituur"
                description="Jusqu'à -25% !"
                progress={
                  this.state.currentStepCount
                    ? this.state.currentStepCount / 5
                    : 0
                }
                progressText={
                  this.state.currentStepCount > 500
                    ? "500 pas / 500 pas"
                    : this.state.currentStepCount + " pas / 500 pas"
                }
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
