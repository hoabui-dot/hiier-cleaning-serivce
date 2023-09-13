import { Entypo } from '@expo/vector-icons';
import { Icon } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import CurrentLocation from '../ZoomButton';
import { Platform, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Region, PROVIDER_DEFAULT } from 'react-native-maps';

interface MapCustomProps {
  region: Region;
}
const MapCustom = ({ region }: MapCustomProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const mapView = useRef<MapView>(null);

  useEffect(() => {
    if (isReady) {
      mapView.current?.animateToRegion(region, 200);
    }
  }, [region, isReady]);

  const handleGoToMarkerLocation = () => {
    mapView.current?.animateToRegion(region, 200);
  };

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        ref={mapView}
        style={styles.container}
        initialRegion={region}
        provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        zoomEnabled={true}
        onMapReady={() => setIsReady(true)}
        region={region}
      >
        {/* <Marker coordinate={region}>
          <Icon as={Entypo} name={'location-pin'} size={10} color={'red.500'} />
        </Marker> */}
      </MapView>
      <CurrentLocation onGoCurrentLocation={handleGoToMarkerLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default MapCustom;
