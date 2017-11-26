/**
 * Created by guillaumetran on 25/11/2017.
 */
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    Dimensions,
    Button
} from "react-native";
import CardModal from "../Shared/CardModal";
import ModalLine from "../Shared/ModalLine";
import ReductionImage from "../Shared/ReductionImage";
import { MapView, Constants, Location, Permissions } from "expo";


const {height, width} = Dimensions.get("window");

export default class Home extends React.Component {
    state = {
        reductionModal: false,
        location: null
    };

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            this.setState({
                error: true
            });
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    componentWillMount() {
        if (Platform.OS === "android" && !Constants.isDevice) {
            this.setState({
                error: true
            });
        } else {
            this._getLocationAsync();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <View
                        style={{
                            flex: 0.95,
                            justifyContent: "center",
                            flexDirection: "row"
                        }}
                    >
                        <TouchableOpacity
                            style={{flex: 0.95}}
                            activeOpacity={0.8}
                            onPress={() => this.setState({reductionModal: true})}
                        >
                            <ReductionImage
                                image={require("../assets/images/kfc.jpg")}
                                title="KFC"
                                description="Jusqu'à -15% !"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <CardModal
                    swipeArea={height / 3}
                    swipeThreshold={50}
                    isOpen={this.state.reductionModal}
                    onClosed={() => this.setState({reductionModal: false})}
                    headerSize={0.25}
                    backdropOpacity={0.9}
                    header={
                        <View style={{flex: 0.25, backgroundColor: "transparent"}}>
                            <ModalLine/>
                        </View>
                    }
                    backdropContent={
                        <View style={{flex: 0.24, backgroundColor: "transparent"}}>
                            <ReductionImage
                                image={require("../assets/images/kfc.jpg")}
                                date={true}
                                title="KFC"
                            />
                        </View>
                    }
                >
                    <View style={{flex: 0.25, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{flex: 0.5, fontSize: 25}} >
                            Text
                        </Text>
                    </View>
                    <View style={styles.delimiter}/>
                    <View style={{flex: 0.25, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{flex: 0.5, fontSize: 25}}> Tessssssssssssssst</Text>
                    </View>
                    <View style={{flex: 0.5}}>
                        <MapView
                            initialRegion={{
                                latitude: 48.5523076,
                                longitude: 7.7085868,
                                latitudeDelta: 0.0122,
                                longitudeDelta: 0.0122
                            }}
                            provider={MapView.PROVIDER_GOOGLE}
                            ref={map => (this.map = map)}
                            showsUserLocation={true}
                            style={{ flex: 1 }}
                            customMapStyle={mapStyle}
                        >
                            <MapView.Marker
                                coordinate={{latitude: 48.5523076,longitude: 7.7085868}}
                                onPress={() => {
                                    this.refs.scrollView._component.scrollTo({
                                        x: index * (CARD_WIDTH + 10),
                                        y: 0,
                                        animated: false
                                    });
                                }}
                            />
                        </MapView>
                    </View>
                    <View style={{flex: 0.25, alignItems: "center", justifyContent: "center"}}>
                        <TouchableOpacity
                            onPress={this.text()}
                            style={{flex: 0.5,
                                backgroundColor: "#00e500",
                                borderRadius: 5}}
                        >
                            <Text style={{alignItems: "center", justifyContent: "center", color: "white", fontSize: 25}}>
                                Accepter le défi
                            </Text>
                        </TouchableOpacity>
                    </View>
                </CardModal>
            </View>
        );
    }

    text() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8"
    },
    delimiter: {
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.borderWidth,
        borderWidth: 0.5
    }

});
