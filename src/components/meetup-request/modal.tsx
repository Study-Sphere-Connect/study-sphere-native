import { StyleSheet, Text, View, Modal as RNModal, Pressable, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';
import { X } from '@tamagui/lucide-icons';
import DateTimeInput from './date-time-input';

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({modalVisible, setModalVisible}: ModalProps) => {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <BlurView intensity={200} style={styles.blurView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <X />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <DateTimeInput />
            </View>
          </View>
        </View>
      </BlurView>
    </RNModal>
  )
}

export default Modal

const styles = StyleSheet.create({
    blurView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      width: 300,
      height: 400,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
    },
    inputContainer: {

    },
});
