import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

export function LoadingSpinner() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value * 360}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, animatedStyle]}>
        <View style={styles.ballTop} />
        <View style={styles.ballBottom} />
        <View style={styles.centerLine} />
        <View style={styles.centerCircleOuter}>
            <View style={styles.centerCircleInner} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#333',
    overflow: 'hidden',
    backgroundColor: '#fff',
    position: 'relative',
  },
  ballTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#FF3B30',
  },
  ballBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#fff',
  },
  centerLine: {
    position: 'absolute',
    top: '47%',
    left: 0,
    right: 0,
    height: '6%',
    backgroundColor: '#333',
  },
  centerCircleOuter: {
    position: 'absolute',
    top: '35%',
    left: '35%',
    width: '30%',
    height: '30%',
    borderRadius: 100,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCircleInner: {
    width: '60%',
    height: '60%',
    borderRadius: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },
});
