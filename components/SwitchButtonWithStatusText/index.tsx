import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { TaskApi } from '../../services/api/task';
import { DEFAULT_LOCATION } from '../../utils/constants/defaultValue'

const SwitchButtonWithStatusText = () => {
  const positionButton = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isOnRef = useRef(false);

  const handleOffStatus = () => {
    setIsLoading(true);
    TaskApi.setInActive().then((response) => {
      if (response.status === 200) {
        Animated.timing(positionButton, {
          toValue: 0,
          duration: 50,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
        setIsLoading(false);
      }
    });
  };

  const handleOnStatus = () => {
    setIsLoading(true);
    TaskApi.setActive(DEFAULT_LOCATION).then((response) => {
      if (response.status === 200) {
        Animated.timing(positionButton, {
          toValue: 1,
          duration: 50,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
        setIsLoading(false);
      }
    });
  };

  const positionInterPol = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  const backgroundColorAnim = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D60404', '#16B614'],
  });

  const onPress = () => {
    if (isOnRef.current) {
      handleOffStatus();
      isOnRef.current = false;
    } else {
      handleOnStatus();
      isOnRef.current = true;
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator
          style={styles.loading}
          size="small"
          color="#ede9fe"
        />
      )}
      <TouchableOpacity
        style={{width: 50}}
        activeOpacity={0.9}
        onPress={onPress}
        disabled={isLoading}
      >
        <Animated.View
          style={[
            styles.mainStyes,
            {
              backgroundColor: backgroundColorAnim,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [
                  {
                    translateX: positionInterPol,
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default SwitchButtonWithStatusText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 20,
    backgroundColor: '#122620',
    marginTop: 2,
    marginLeft: 2,
  },
  leftText: {
    top: 8,
    left: 8,
  },
  statusText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
  },
  rightText: {
    top: 9,
    right: 8,
  },
  mainStyes: {
    borderRadius: 30,
    backgroundColor: '#81b0ff',
    // height of status button
    height: 20,
    //width fo status button
    width: 40,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    zIndex: 10,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
