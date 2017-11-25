import Expo from "expo";
import React from "react";
import {Pedometer} from "expo";
import {StyleSheet, Text, View, Dimensions, ScrollView, RefreshControl} from "react-native";
import ProgressBar from "../ProgressBar/ProgressBar";


const {height, width} = Dimensions.get("window");
const cardHeight = height * 0.4;
const cardWidth = width * 0.9;

export default class PedometerSensor extends React.Component {
    state = {
        isPedometerAvailable: "checking",
        pastStepCount: 0,
        currentStepCount: 0,
        refreshing: false
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

    _onRefresh() {
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}
                            refreshControl={<RefreshControl refreshing={this.state.refreshing}
                                                            onRefresh={this._onRefresh.bind(this)}/>}>

                    <View style={styles.separator}/>
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <View style={styles.separator}/>
                            <View style={styles.textPlacement}>
                                <Text style={styles.title}>KFC</Text>
                            </View>
                            <View style={styles.space}/>
                            <View style={styles.textPlacement}>
                                <Text style={styles.description}>-15% pour 2km parcourus</Text>
                            </View>
                        </View>
                        <ProgressBar percentage={this.state.currentStepCount / 2}/>
                        <View style={styles.separator}/>
                        <View style={styles.textPlacement}>
                            <Text style={styles.description}> {this.state.currentStepCount}m/200m</Text>
                        </View>
                    </View>

                    <View style={styles.separator}/>
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <View style={styles.separator}/>
                            <View style={styles.textPlacement}>
                                <Text style={styles.title}>McDonald's</Text>
                            </View>
                            <View style={styles.space}/>
                            <View style={styles.textPlacement}>
                                <Text style={styles.description}>-25% pour 3km parcourus</Text>
                            </View>
                        </View>
                        <ProgressBar percentage={this.state.currentStepCount / 3}/>
                        <View style={styles.separator}/>
                        <View style={styles.textPlacement}>
                            <Text> {this.state.currentStepCount}m/300m</Text>
                        </View>
                    </View>

                    <View style={styles.separator}/>
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <View style={styles.separator}/>
                            <View style={styles.textPlacement}>
                                <Text style={styles.title}>KFC</Text>
                            </View>
                            <View style={styles.space}/>
                            <View style={styles.textPlacement}>
                                <Text style={styles.description}>-15% pour 2km parcourus</Text>
                            </View>
                        </View>
                        <ProgressBar percentage={this.state.currentStepCount}/>
                        <View style={styles.separator}/>
                        <View style={styles.textPlacement}>
                            <Text style={styles.description}> {this.state.currentStepCount}m/200m</Text>
                        </View>
                    </View>

                    <View style={styles.separator}/>
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <View style={styles.separator}/>
                            <View style={styles.textPlacement}>
                                <Text style={styles.title}>KFC</Text>
                            </View>
                            <View style={styles.space}/>
                            <View style={styles.textPlacement}>
                                <Text style={styles.description}>-15% pour 2km parcourus</Text>
                            </View>
                        </View>
                        <ProgressBar percentage={this.state.currentStepCount}/>
                        <View style={styles.separator}/>
                        <View style={styles.textPlacement}>
                            <Text style={styles.description}> {this.state.currentStepCount}m/200m</Text>
                        </View>
                    </View>


                </ScrollView>

            </View>
        );
    }

    reward() {
        if (this.state.currentStepCount === 10)
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
    },
    title: {
        fontSize: 30,
        color: "#585858",
        justifyContent: 'center',
        alignItems: "center",
    },
    textPlacement: {
        justifyContent: 'center',
        alignItems: "center",
    },
    description: {
        fontSize: 20,
        color: "#585858",
        justifyContent: 'center',
        alignItems: "center",
    },
    image: {
        paddingTop: 30
    },
    delimiter: {
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    separator: {
        height: 15
    },
    space: {
        height: 25
    },
    card: {
        width: cardWidth,
        height: cardHeight,
        backgroundColor: "#EFEFEF",
        borderRadius: 15,
        justifyContent: "space-between"
    }
});

Expo.registerRootComponent(PedometerSensor);
