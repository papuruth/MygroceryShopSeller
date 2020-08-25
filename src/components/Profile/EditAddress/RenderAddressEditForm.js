import React from 'react';
import { View } from 'react-native';
import { TextInput, Checkbox } from 'react-native-paper';
import { styles } from '../styles';
import { Text } from '../../../utils/reusableComponents/StyledText';

export const RenderAddressEditForm = ({ buildingName, city, postalCode, state, street, onChange, isPrimary }) => {
  let cityInputRef;
  let postalInputRef;
  let stateInputRef;
  let streetInputRef;
  return (
    <View style={styles.inputFieldsContainer}>
      <TextInput
        style={styles.inputFields}
        label="Building Name"
        mode="outlined"
        onSubmitEditing={() => cityInputRef.focus()}
        blurOnSubmit={false}
        value={buildingName}
        onChangeText={(text) => onChange('buildingName', text)}
      />
      <TextInput
        style={styles.inputFields}
        label="City"
        mode="outlined"
        value={city}
        onSubmitEditing={() => postalInputRef.focus()}
        ref={(cityRef) => {
          cityInputRef = cityRef;
        }}
        blurOnSubmit={false}
        onChangeText={(text) => onChange('city', text)}
      />
      <TextInput
        style={styles.inputFields}
        label="Postal Code"
        mode="outlined"
        keyboardType="number-pad"
        value={postalCode}
        onSubmitEditing={() => stateInputRef.focus()}
        ref={(postalRef) => {
          postalInputRef = postalRef;
        }}
        blurOnSubmit={false}
        onChangeText={(text) => onChange('postalCode', text)}
      />
      <TextInput
        style={styles.inputFields}
        label="State"
        mode="outlined"
        value={state}
        onSubmitEditing={() => streetInputRef.focus()}
        ref={(stateRef) => {
          stateInputRef = stateRef;
        }}
        blurOnSubmit={false}
        onChangeText={(text) => onChange('state', text)}
      />
      <TextInput
        style={styles.inputFields}
        label="Street"
        mode="outlined"
        ref={(streetRef) => {
          streetInputRef = streetRef;
        }}
        value={street}
        onChangeText={(text) => onChange('street', text)}
      />
      <View style={styles.checkbox}>
        <Checkbox
          status={isPrimary ? 'checked' : 'unchecked'}
          onPress={() => onChange('isPrimary', !isPrimary)}
        />
        <Text style={styles.label}>Is Primary</Text>
      </View>
    </View>
  );
};