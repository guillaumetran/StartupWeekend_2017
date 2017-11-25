import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Font } from "expo";
import TabBar from "./src/Shared/TabBar";
import Loader from "./src/Shared/Loader";
import Home from "./src/Home/Home";

export default class App extends React.Component {
  state = {
    fontLoaded: false,
    page: <Home />
  };

  async componentDidMount() {
    await Font.loadAsync({
      "avenir-book": require("./src/assets/avenir-lt-std/avenir-book.ttf"),
      "avenir-medium": require("./src/assets/avenir-lt-std/avenir-medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <Loader />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        {this.state.page}
        <TabBar selectPage={page => this.setState({ page: page })} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8"
  },
  header: {
    flex: 0.05,
  }
});
