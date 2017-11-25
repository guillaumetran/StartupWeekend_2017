/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Challenge extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Challenge</Text>
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
