import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps'; // 0.20.1
import CurrentLocationButton from './CurrentLocationButton';

export default class Map extends Component {
	state = {
		region: {
				latitude: 37.78825,
	      longitude: -122.4324,
	      latitudeDelta: 0.0922,
	      longitudeDelta: 0.0421,
		}
	}

  componentDidMount() {
  	this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5,
      }
      this.onRegionChange(region);
    });
  }

  //arrow function so proper 'this' is referenced
  handleCurrentLocationButtonPress = () => {
  	navigator.geolocation.getCurrentPosition((position) => {
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region);
  	});
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
    	<View style={styles.container}> 
    		<View style={styles.container}>
	        <MapView
	          style={styles.map}
	          region={this.state.region}
	          showsUserLocation={true}
	          followUserLocation={true}
	          onRegionChange={this.onRegionChange.bind(this)}>
	        </MapView>
      	</View>
        <View style={styles.currentLocationButton}>
					<CurrentLocationButton onPress={this.handleCurrentLocationButtonPress}/>
				</View>
    	</View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
	currentLocationButton: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		backgroundColor: 'red',
		bottom: 30,
		right: 30
	}
});
