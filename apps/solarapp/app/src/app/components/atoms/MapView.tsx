import { View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Map, {
  LatLng,
  LongPressEvent,
  Marker,
  MarkerDragEvent,
  Region,
} from 'react-native-maps';
import { gstyles } from '../../globalStyles';
import HeaderBar from '../organisms/HeaderBar';

const MapView = ({ navigation, route }) => {
  const [done, setDone] = useState(false);
  const [pinLocation, setPinLocation] = useState<LatLng>(
    route?.params?.coordinates ?? {
      latitude: 33,
      longitude: 33,
    }
  );
  const [region, setRegion] = useState<Region>(
    route?.params?.coordinates ?? {
      latitude: 33,
      latitudeDelta: 1,
      longitude: 33,
      longitudeDelta: 1,
    }
  );
  const mapRef = useRef<Map>();

  const onPinDropped = useCallback(
    (e: LongPressEvent) => {
      setPinLocation({
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      });
    },
    [pinLocation]
  );

  const onAction = useCallback(() => {
    setDone(true);
  }, [done]);

  const onPressCoords = useCallback(() => {
    mapRef.current.animateToRegion(
      {
        ...pinLocation,
        longitudeDelta: region.longitudeDelta,
        latitudeDelta: region.latitudeDelta,
      },
      3000
    );
  }, [region]);

  const onDragPin = useCallback(
    (e: MarkerDragEvent) => {
      setPinLocation({
        longitude: e.nativeEvent.coordinate.longitude,
        latitude: e.nativeEvent.coordinate.latitude,
      });
      setRegion({ ...region, ...e.nativeEvent.coordinate });
    },
    [region]
  );

  const onRegionChangeComplete = useCallback(
    (updatedRegion: Region) => setRegion(updatedRegion),
    [region]
  );

  useEffect(() => {
    if (done) {
      setDone(false);
      navigation.navigate(route?.params.previousScreen, {
        selectedCoordinates: {
          ...region,
          ...pinLocation,
        },
      });
    }
  }, [pinLocation, done]);

  return (
    <View style={gstyles.flex1}>
      <HeaderBar
        title={
          region.latitude && region.longitude
            ? `You (${region?.latitude?.toFixed(
                6
              )}, ${region?.longitude?.toFixed(6)})`
            : ''
        }
        subtitle={
          pinLocation.latitude && pinLocation.longitude
            ? `Device (${pinLocation?.latitude?.toFixed(
                6
              )}, ${pinLocation?.longitude?.toFixed(6)})`
            : ''
        }
        buttonTitle={'Done'}
        onAction={onAction}
        onPressTitle={onPressCoords}
      />

      <Map
        ref={mapRef}
        onRegionChange={onRegionChangeComplete}
        initialRegion={region}
        onLongPress={onPinDropped}
        style={[gstyles.wFull, gstyles.flex1, { height: 200 }]}
        maxZoomLevel={20}
        minZoomLevel={0}
        mapType="hybrid"
        showsUserLocation
        showsCompass
        showsMyLocationButton
        showsPointsOfInterest
        showsScale
        showsBuildings
        showsIndoors
        showsTraffic
        showsIndoorLevelPicker
        userLocationAnnotationTitle="My Location"
        userInterfaceStyle="light"
        userLocationCalloutEnabled
        userLocationPriority="high"
        userLocationFastestInterval={1000}
        userLocationUpdateInterval={2000}
      >
        {pinLocation && pinLocation.latitude && pinLocation.longitude && (
          <Marker
            title={'Device Location'}
            coordinate={pinLocation}
            pinColor="red"
            draggable
            onDrag={onDragPin}
          />
        )}
      </Map>
    </View>
  );
};

export default MapView;
