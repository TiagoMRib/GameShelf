import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  const [hoursText, setHoursText] = useState('');

  const handleConfirm = () => {
    const hours = parseInt(hoursText);
    
    // Validation
    if (isNaN(hours) || hours < 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of hours (0 or greater)');
      return;
    }
    
    if (hours > 10000) {
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
      animationType="fade"
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
            placeholder="Enter hours (e.g., 25)"
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    fontStyle: 'italic',
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HoursPlayedPopUp;