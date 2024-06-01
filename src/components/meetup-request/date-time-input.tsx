import { Calendar } from '@tamagui/lucide-icons';
import React, { useState } from 'react'
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateTimeInput = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<string>("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    let dt = date.toDateString();
    let time = date.toTimeString()
    setDate(`${dt} ${time}`);
    hideDatePicker();
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Date" style={styles.input} editable={false} value={date} />
        <Pressable onPress={showDatePicker}>
          <Calendar />
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  )
}

export default DateTimeInput

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  }
})