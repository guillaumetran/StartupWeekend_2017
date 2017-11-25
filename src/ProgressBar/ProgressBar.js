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
                        <View style={[{ flex: percentage / 100 }, styles.progress]}>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    status: {
        fontSize: 14,
        fontFamily: "sukhumvitset",
        color: "#585858"
    }
});
