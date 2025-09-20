import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets/constants/icons';
import { fetchGameById } from '../../services/api';
import { useCollections } from '../../services/useCollections';
import useFetch from '../../services/useFetch';
import CollectionButton from '../components/CollectionButton';
import HoursPlayedPopUp from '../components/HoursPlayedPopUp';
import { gameDetailsStyles as styles } from './gameStyles';

const GameDetails = () => {
    const { id } = useLocalSearchParams();
    
    const [isHoursPopUpVisible, setIsHoursPopUpVisible] = useState(false);
    const [isEditingHours, setIsEditingHours] = useState(false);
    
    const {
        data: game,
        loading: gameLoading,
        error: gameError
    } = useFetch(() => fetchGameById(id as string));

    const {
        isInCurrentlyPlaying,
        isInWishlist,
        isInFinished,
        finishedGameData,
        addToCollection,
        removeFromCollection,
        loading: collectionsLoading
    } = useCollections(game?.id);

    const handleAddToCollection = async (collectionType: 'currentlyPlaying' | 'wishlist' | 'finished', hoursPlayed?: number) => {
        if (!game) return;
        
        try {
            await addToCollection(collectionType, {
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                released: game.released,
                ...(collectionType === 'finished' && { hoursPlayed: hoursPlayed || 0 })
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

    // Collection button handlers
    const handleCurrentlyPlayingAdd = () => {
        handleAddToCollection('currentlyPlaying');
    };

    const handleCurrentlyPlayingRemove = () => {
        handleRemoveFromCollection('currentlyPlaying');
    };

    const handleWishlistAdd = () => {
        handleAddToCollection('wishlist');
    };

    const handleWishlistRemove = () => {
        handleRemoveFromCollection('wishlist');
    };

    const handleFinishedAdd = () => {
        setIsEditingHours(false);
        setIsHoursPopUpVisible(true);
    };

    const handleFinishedRemove = () => {
        handleRemoveFromCollection('finished');
    };

    // Handle edit hours button press
    const handleEditHoursPress = () => {
        setIsEditingHours(true);
        setIsHoursPopUpVisible(true);
    };

    // Handle hours confirmation from pop up
    const handleHoursConfirm = (hours: number) => {
        setIsHoursPopUpVisible(false);
        setIsEditingHours(false);
        handleAddToCollection('finished', hours);
    };

    // Handle pop up cancel
    const handleHoursCancel = () => {
        setIsHoursPopUpVisible(false);
        setIsEditingHours(false);
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
        <>
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
                        <CollectionButton
                            collectionType="currentlyPlaying"
                            isInCollection={isInCurrentlyPlaying}
                            onAdd={handleCurrentlyPlayingAdd}
                            onRemove={handleCurrentlyPlayingRemove}
                        />

                        <CollectionButton
                            collectionType="wishlist"
                            isInCollection={isInWishlist}
                            onAdd={handleWishlistAdd}
                            onRemove={handleWishlistRemove}
                        />

                        <CollectionButton
                            collectionType="finished"
                            isInCollection={isInFinished}
                            onAdd={handleFinishedAdd}
                            onRemove={handleFinishedRemove}
                        />
                    </View>

                    {/* Hours Played Display - Only show if game is finished*/}
                    {isInFinished && finishedGameData && (
                        <View style={styles.hoursPlayedContainer}>
                            <Text style={styles.hoursPlayedText}>
                                Hours Played: {finishedGameData.hoursPlayed || 0}h
                            </Text>
                            <TouchableOpacity 
                                style={styles.editButton}
                                onPress={handleEditHoursPress}
                            >
                                <Image source={icons.edit} style={styles.editIcon} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    )}
                    
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

            {/* Hours Played Pop Up */}
            <HoursPlayedPopUp
                visible={isHoursPopUpVisible}
                onCancel={handleHoursCancel}
                onConfirm={handleHoursConfirm}
                gameName={game?.name || ''}
            />
        </>
    );
}

export default GameDetails