/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import {StyleSheet, Text, View, Image} from "react-native";

export default class Profile extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile</Text>
                <View style={styles_.container}>
                    <Image
                        style={{height: 150, width: 120}}
                        source={require("../assets/images/pp.jpg")}
                        resizeMode="cover"
                        borderWidth={10}
                        bordercolor={"red"}
                        marginborder={15}
                    />
                    <Text style={{fontWeight: 'bold', fontSize: 23}}>
                        Nom   Prenom
                    </Text>
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
const styles_ = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#F8F8F8"
    }
});
