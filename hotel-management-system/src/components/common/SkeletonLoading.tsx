import React from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface SkeletonLoadingProps {
  width?: number | string;
  height?: number;
  style?: any;
}

export const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({
  width = Dimensions.get('window').width - 32,
  height = 20,
  style
}) => {
  const { theme } = useTheme();
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={[styles.container, { width, height }, style]}>
      <Animated.View
        style={[
          styles.skeleton,
          {
            opacity,
            backgroundColor: theme.dark ? '#333' : '#E1E9EE',
            width,
            height,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  skeleton: {
    flex: 1,
  },
});

export const ReservationCardSkeleton: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      <SkeletonLoading height={24} style={styles.title} />
      <SkeletonLoading height={16} style={styles.info} />
      <SkeletonLoading height={16} style={styles.info} />
      <View style={styles.row}>
        <SkeletonLoading width="48%" height={16} />
        <SkeletonLoading width="48%" height={16} />
      </View>
    </View>
  );
};

const styles2 = StyleSheet.create({
  cardContainer: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    marginBottom: 12,
  },
  info: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
