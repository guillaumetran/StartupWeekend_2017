/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PedometerSensor from "../Pedometer/PedometerSensor";

export default class Challenge extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <PedometerSensor/>
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
