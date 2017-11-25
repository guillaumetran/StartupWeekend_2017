/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default class Profile extends React.Component {
  render() {
    return (
      <Image
        style={{ height: "100%", width: "100%" }}
        source={this.props.image}
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
        >
          {this.props.date ? (
            <View
              style={{
                flex: 0.3,
                justifyContent: "flex-end",
                flexDirection: "row",
                alignItems: "flex-end"
              }}
            >
              <Text style={styles.date}>Jusqu’au 26 novembre</Text>
              <View
                style={{
                  flex: 0.1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -3
                }}
              >
                <MaterialIcons color="white" name="date-range" size={20} />
              </View>
            </View>
          ) : (
            <View />
          )}
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View
              style={{
                flex: 0.5,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.title}>{this.props.title}</Text>
              </View>
              {this.props.description ? (
                <Text style={styles.description}>{this.props.description}</Text>
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "avenir-medium",
    fontSize: 30,
    color: "white"
  },
  date: {
    fontFamily: "avenir-book",
    fontSize: 14,
    color: "white"
  },
  description: {
    fontFamily: "avenir-book",
    fontSize: 18,
    color: "white"
  }
});
