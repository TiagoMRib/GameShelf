import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { useThemeColors } from '../context/useThemeColors';
import { createComponentStyles, gameCardWidth } from './styles/componentStyles';

interface GameCardProps {
    id: number;
    name: string;
    background_image: string;
    released: string;
}

const GameCard: React.FC<GameCardProps> = ({ id, name, background_image}) => {
  const colors = useThemeColors();
  const styles = createComponentStyles(colors).gameCard;

  return (
    <Link href={`/game/${id}`} asChild>
      <TouchableOpacity style={[styles.card, { width: gameCardWidth }]}> 
        <Image 
          source={{ uri: background_image }} 
          style={[styles.image, { width: gameCardWidth }]} 
          resizeMode="cover" 
        />
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default GameCard;