/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Home from "../Home/Home";
import AroundMe from "../AroundMe/AroundMe";
import Challenge from "../Challenge/Challenge";
import Profile from "../Profile/Profile";

const pages = [
  { name: "Accueil", icon: "home", component: <Home /> },
  { name: "Proche", icon: "location-arrow", component: <AroundMe /> },
  { name: "Défis", icon: "trophy", component: <Challenge /> },
  { name: "Profile", icon: "user", component: <Profile /> }
];

export default class TabBar extends React.Component {
  state = {
    selectedIndex: 0
  };

  selectPage(item, index) {
    this.props.selectPage(item.component);
    this.setState({ selectedIndex: index });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {pages.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => this.selectPage(item, index)}
              >
                <FontAwesome
                  color={
                    this.state.selectedIndex === index ? "#007AFF" : "#8E8E93"
                  }
                  name={item.icon}
                  size={32}
                />
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        this.state.selectedIndex === index
                          ? "#007AFF"
                          : "#8E8E93"
                    }
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: "white"
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "avenir-book",
    fontSize: 12
  }
});
