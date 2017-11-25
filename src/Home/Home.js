/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default class Home extends React.Component {
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
            <TouchableOpacity style={{ flex: 0.95 }} activeOpacity={0.8}>
              <Image
                style={{ height: "100%", width: "100%" }}
                source={require("../assets/images/kfc.jpg")}
                blurRadius={0.5}
                borderRadius={20}
                resizeMode="cover"
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,.7)",
                    borderRadius: 20
                  }}
                />
              </Image>
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
