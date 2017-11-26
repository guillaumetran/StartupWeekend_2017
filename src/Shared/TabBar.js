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
import IconBadge from "react-native-icon-badge";

export default class TabBar extends React.Component {
  state = {
    selectedIndex: 0,
    notifDefis: 0
  };

  pages = [
    {
      name: "Accueil",
      icon: "home",
      component: <Home updateNotif={() => this.updateNotif()} />
    },
    {
      name: "Proche",
      icon: "location-arrow",
      component: <AroundMe updateNotif={() => this.updateNotif()} />
    },
    { name: "Défis", icon: "trophy", component: <Challenge /> },
    { name: "Profile", icon: "user", component: <Profile /> }
  ];

  updateNotif() {
    this.setState({ notifDefis: this.state.notifDefis + 1 });
  }

  selectPage(item, index) {
    this.props.selectPage(item.component);
    this.setState({ selectedIndex: index });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {this.pages.map((item, index) => {
            if (index === 2 && this.state.notifDefis > 0) {
              return (
                <IconBadge
                  key={index}
                  MainElement={
                    <TouchableOpacity
                      key={index}
                      style={styles.button}
                      onPress={() => this.selectPage(item, index)}
                    >
                      <FontAwesome
                        color={
                          this.state.selectedIndex === index
                            ? "#007AFF"
                            : "#8E8E93"
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
                  }
                  BadgeElement={
                    <Text style={{ color: "#FFFFFF" }}>
                      {this.state.notifDefis}
                    </Text>
                  }
                  IconBadgeStyle={{
                    width: 25,
                    height: 20,
                    backgroundColor: "#D61700",
                    alignItems: "center",
                    justifyContent: "center",
                    top: 0,
                    right: 0
                  }}
                  Hidden={false}
                />
              );
            }
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
