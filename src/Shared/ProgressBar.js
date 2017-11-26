import React from "react";
import { StyleSheet, Text, View } from "react-native";

const barHeight = 25;

export default class ProgressBar extends React.Component {
  render() {
    const percentage = this.props.percentage || 0;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View style={styles.container}>
          <View style={styles.bar}>
            <View style={[{ flex: percentage / 100 }, styles.progress]} />
            <View
              style={{
                position: "absolute",
                left: "40%",
                backgroundColor: "transparent"
              }}
            >
              <Text style={styles.progressText}>{this.props.progressText}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9
  },
  bar: {
    flex: 0.3,
    height: barHeight,
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row"
  },
  progress: {
    backgroundColor: "#60AAFF",
    borderRadius: 15,
    alignItems: "center"
  },
  progressText: {
    fontSize: 15,
    fontFamily: "avenir-book",
    color: "#585858"
  }
});
