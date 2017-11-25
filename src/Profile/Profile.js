/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <View>
          <Image
              style={{ height: "58%", width: "66%" }}
              source={require("../assets/images/kfc.jpg")}
              resizeMode="cover"
          />
        </View>
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
