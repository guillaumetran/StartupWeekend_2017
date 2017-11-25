import Expo from "expo";
import React from "react";
import {Pedometer} from "expo";
import {StyleSheet, Text, View} from "react-native";
import ProgressBar from "../ProgressBar/ProgressBar";

export default class PedometerSensor extends React.Component {
    state = {
        isPedometerAvailable: "checking",
        pastStepCount: 0,
        currentStepCount: 0
    };
    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps
            });
            this.reward();
        });

        Pedometer.isAvailableAsync().then(
            result => {
                this.setState({
                    isPedometerAvailable: String(result)
                });
            },
            error => {
                this.setState({
                    isPedometerAvailable: "Could not get isPedometerAvailable: " + error
                });
            }
        );

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);
        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({pastStepCount: result.steps});
            },
            error => {
                this.setState({
                    pastStepCount: "Could not get stepCount: " + error
                });
            }
        );
    };
    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Nombre total de pas:{this.state.pastStepCount}</Text>
                <Text>Nombres de pas sur la journée: {this.state.currentStepCount}</Text>
                <Text style={gras.container}>Step Up</Text>
                <ProgressBar percent={100}/>
            </View>
        );
    }

    reward() {
        if (this.state.currentStepCount == 10)
            ToastAndroid.show('Congratulation', ToastAndroid.SHORT);
    }
}

const gras = StyleSheet.create({
    container: {
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        marginTop: 15
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center"
    }
});

Expo.registerRootComponent(PedometerSensor);
