import React, { useRef } from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';
import { gameDetailsStyles } from '../game/gameStyles';

interface CollectionButtonProps {
  collectionType: 'currentlyPlaying' | 'wishlist' | 'finished';
  isInCollection: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

const CollectionButton: React.FC<CollectionButtonProps> = ({
  collectionType,
  isInCollection,
  onAdd,
  onRemove
}) => {
  // Animation value for scaling
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Get button text based on collection type and state
  const getButtonText = () => {
    if (isInCollection) {
      switch (collectionType) {
        case 'currentlyPlaying':
          return 'Playing';
        case 'wishlist':
          return 'In Wishlist';
        case 'finished':
          return 'Finished';
        default:
          return 'Added';
      }
    } else {
      switch (collectionType) {
        case 'currentlyPlaying':
          return '+ Currently Playing';
        case 'wishlist':
          return '+ Wishlist';
        case 'finished':
          return '+ Finished';
        default:
          return '+ Add';
      }
    }
  };

  const handlePress = () => {
    if (isInCollection) {
      onRemove();
    } else {
      onAdd();
    }
  };

  // Animation handlers
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.75,
      useNativeDriver: true, // for better performance
      tension: 100,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  return (
    <TouchableOpacity 
      style={[
        gameDetailsStyles.collectionButton, 
        isInCollection && gameDetailsStyles.activeButton
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1} // Disable default opacity change since we're using scale
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Text style={gameDetailsStyles.buttonText}>
          {getButtonText()}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CollectionButton;