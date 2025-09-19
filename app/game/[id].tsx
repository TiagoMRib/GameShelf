import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { fetchGameById } from '../../services/api';
import { useCollections } from '../../services/useCollections';
import useFetch from '../../services/useFetch';
import { gameDetailsStyles as styles } from './gameStyles';

const GameDetails = () => {
    const { id } = useLocalSearchParams();
    
    const {
        data: game,
        loading: gameLoading,
        error: gameError
    } = useFetch(() => fetchGameById(id as string));

    const {
        isInCurrentlyPlaying,
        isInWishlist,
        isInFinished,
        addToCollection,
        removeFromCollection,
        loading: collectionsLoading
    } = useCollections(game?.id);

    const handleAddToCollection = async (collectionType: 'currentlyPlaying' | 'wishlist' | 'finished') => {
        if (!game) return;
        
        try {
            await addToCollection(collectionType, {
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                released: game.released,
                ...(collectionType === 'finished' && { hoursPlayed: 0 })
            });
        } catch (error) {
            console.error('Error adding to collection:', error);
        }
    };

    const handleRemoveFromCollection = async (collectionType: 'currentlyPlaying' | 'wishlist' | 'finished') => {
        if (!game) return;
        
        try {
            await removeFromCollection(collectionType, game.id);
        } catch (error) {
            console.error('Error removing from collection:', error);
        }
    };

    if (gameLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (gameError) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Error: {gameError.message}</Text>
            </View>
        );
    }

    if (!game) {
        return (
            <View style={styles.centered}>
                <Text>Game not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image 
                source={{ uri: game.background_image }} 
                style={styles.headerImage}
                resizeMode="cover"
            />
            
            <View style={styles.content}>
                <Text style={styles.title}>{game.name}</Text>
                
                {/* Collection Buttons */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity 
                        style={[styles.collectionButton, isInCurrentlyPlaying && styles.activeButton]}
                        onPress={() => isInCurrentlyPlaying ? 
                            handleRemoveFromCollection('currentlyPlaying') : 
                            handleAddToCollection('currentlyPlaying')
                        }
                    >
                        <Text style={styles.buttonText}>
                            {isInCurrentlyPlaying ? 'Playing' : '+ Currently Playing'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.collectionButton, isInWishlist && styles.activeButton]}
                        onPress={() => isInWishlist ? 
                            handleRemoveFromCollection('wishlist') : 
                            handleAddToCollection('wishlist')
                        }
                    >
                        <Text style={styles.buttonText}>
                            {isInWishlist ? 'In Wishlist' : '+ Wishlist'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.collectionButton, isInFinished && styles.activeButton]}
                        onPress={() => isInFinished ? 
                            handleRemoveFromCollection('finished') : 
                            handleAddToCollection('finished')
                        }
                    >
                        <Text style={styles.buttonText}>
                            {isInFinished ? 'Finished' : '+ Finished'}
                        </Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Released:</Text>
                    <Text style={styles.value}>{game.released}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Rating:</Text>
                    <Text style={styles.value}>{game.rating}/5 ⭐</Text>
                </View>
                
                {game.metacritic && (
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Metacritic:</Text>
                        <Text style={styles.value}>{game.metacritic}/100</Text>
                    </View>
                )}
                
                {game.genres && game.genres.length > 0 && (
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Genres:</Text>
                        <Text style={styles.value}>
                            {game.genres.map(genre => genre.name).join(', ')}
                        </Text>
                    </View>
                )}
                
                {game.platforms && game.platforms.length > 0 && (
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Platforms:</Text>
                        <Text style={styles.value}>
                            {game.platforms.map(p => p.platform.name).join(', ')}
                        </Text>
                    </View>
                )}
                
                {game.developers && game.developers.length > 0 && (
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Developers:</Text>
                        <Text style={styles.value}>
                            {game.developers.map(dev => dev.name).join(', ')}
                        </Text>
                    </View>
                )}
                
                {game.description_raw && (
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.label}>Description:</Text>
                        <Text style={styles.description}>{game.description_raw}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

export default GameDetails