import React, { useState } from 'react';
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeColors } from '../context/useThemeColors';
import { createComponentStyles } from './styles/componentStyles';

interface HoursPlayedPopUpProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (hours: number) => void;
  gameName: string;
}

const HoursPlayedPopUp: React.FC<HoursPlayedPopUpProps> = ({
  visible,
  onCancel,
  onConfirm,
  gameName
}) => {
  const colors = useThemeColors();
  const styles = createComponentStyles(colors).hoursPlayedPopUp;
  
  const [hoursText, setHoursText] = useState('');

  const handleConfirm = () => {
    const hours = parseInt(hoursText);
    
    // Validation
    if (isNaN(hours) || hours < 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of hours (0 or greater)');
      return;
    }
    
    if (hours > 100000) {
      Alert.alert('Invalid Input', 'Hours played seems too high. Please enter a reasonable number.');
      return;
    }

    onConfirm(hours);
    setHoursText(''); // Reset input for next time
  };

  const handleCancel = () => {
    setHoursText(''); // Reset input
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Mark as Finished</Text>
          <Text style={styles.subtitle}>"{gameName}"</Text>
          
          <Text style={styles.label}>Hours Played</Text>
          <TextInput
            style={styles.input}
            value={hoursText}
            onChangeText={setHoursText}
            placeholder="Enter hours played"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            autoFocus={true}
            selectTextOnFocus={true}
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Add to Finished</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HoursPlayedPopUp;