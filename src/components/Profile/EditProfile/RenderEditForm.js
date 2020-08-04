import React from 'react';
import { View } from 'react-native';
import { checkEmpty } from '../../../utils/commonFunctions';
import { TextInput } from 'react-native-paper';

export const RenderBasicDetailsForm = ({ formFields }) => {
  return (
    <View>
      {!checkEmpty(formFields) &&
        formFields.map(({ label, value, type }) => {
          if (type === 'text') {
            return <TextInput label={label} mode="outlined" value={value} />;
          }
          return null;
        })}
    </View>
  );
};

export const RenderAddressForm = ({ buildingName, city, postalCode, state, street, onChange }) => {
  return (
    <View>
      <TextInput label="Building Name" mode="outlined" value={buildingName} onChangeText={(text) => onChange('buildingName', text)} />
      <TextInput label="City" mode="outlined" value={city} onChangeText={(text) => onChange('city', text)} />
      <TextInput label="Postal Code" mode="outlined" value={postalCode} onChangeText={(text) => onChange('postalCode', text)} />
      <TextInput label="State" mode="outlined" value={state} onChangeText={(text) => onChange('state', text)} />
      <TextInput label="Street" mode="outlined" value={street} onChangeText={(text) => onChange('street', text)} />
    </View>
  );
};

export const RenderProfessionalDetailsForm = ({ experience, occupation }) => {
  return (
    <View>
      <TextInput label={label} mode="outlined" value={value} />
      <TextInput label={label} mode="outlined" value={value} />
    </View>
  );
};

export const RenderDocsForm = ({ aadharFront, aadharBack, onChange }) => {
  return (
    <View>
      <TextInput label={label} mode="outlined" value={value} />
    </View>
  );
};
