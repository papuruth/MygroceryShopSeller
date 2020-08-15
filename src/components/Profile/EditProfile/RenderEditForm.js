import React from 'react';
import { Pressable, Text, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Avatar, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDown from '../../../utils/reusableComponents/Dropdown';
import { styles } from '../styles';

export const RenderBasicDetailsForm = ({
  name,
  email,
  phone,
  image,
  locationSelected,
  locationsData,
  locationColor,
  handleLocationSelection,
  onChange,
}) => {
  const selectPhoto = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  return (
    <View style={styles.editBasicProfileContainer}>
      <View style={styles.editImageContainer}>
        {image ? (
          <Pressable onPress={selectPhoto}>
            <Avatar.Image size={120} source={image} />
          </Pressable>
        ) : (
          <View>
            <Pressable onPress={selectPhoto}>
              <Avatar.Text size={120} label={name && name.slice(0, 1)} />
            </Pressable>
          </View>
        )}
      </View>
      <View style={styles.inputFieldsContainer}>
        <TextInput
          style={styles.inputFields}
          label="Fullname"
          mode="outlined"
          value={name}
          onChangeText={(text) => onChange('name', text)}
        />
        <TextInput
          style={styles.inputFields}
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={(text) => onChange('email', text)}
        />
        <TextInput
          style={styles.inputFields}
          label="Phone"
          mode="outlined"
          value={phone.toString()}
          onChangeText={(text) => onChange('phone', text)}
        />
      </View>
      <View style={styles.dropDownContainer}>
        <DropDown
          items={locationsData}
          color="#000000"
          height={60}
          borderColor={locationColor}
          onSelect={(index, option) => handleLocationSelection(index, option)}
          selectedIndex={locationSelected}
          placeholder="Select Location"
          style={styles.dropDownInnerContainer}
        />
      </View>
    </View>
  );
};

export const RenderAddressForm = ({ buildingName, city, postalCode, state, street, onChange }) => {
  return (
    <View style={styles.inputFieldsContainer}>
      <TextInput
        style={styles.inputFields}
        label="Building Name"
        mode="outlined"
        value={buildingName}
        onChangeText={(text) => onChange('buildingName', text)}
      />
      <TextInput
        style={styles.inputFields}
        label="City"
        mode="outlined"
        value={city}
        onChangeText={(text) => onChange('city', text)}
      />
      <TextInput
        style={styles.inputFields}
        label="Postal Code"
        mode="outlined"
        keyboardType="number-pad"
        value={postalCode}
        onChangeText={(text) => onChange('postalCode', text)}
      />
      <TextInput
        style={styles.inputFields}
        label="State"
        mode="outlined"
        value={state}
        onChangeText={(text) => onChange('state', text)}
      />
      <TextInput
        style={styles.inputFields}
        label="Street"
        mode="outlined"
        value={street}
        onChangeText={(text) => onChange('street', text)}
      />
    </View>
  );
};

export const RenderProfessionalDetailsForm = ({
  expInYears,
  expInMonths,
  occupation,
  expSelectedInYears,
  expSelectedInMonths,
  occupationSelected,
  handleExperienceSelectionYears,
  handleExperienceSelectionMonths,
  handleOccupationSelection,
  occColor,
  expColor,
}) => {
  return (
    <View>
      <View style={styles.dropDownContainer}>
        <Text style={styles.expTextLabel}>Select Experience</Text>
        <View style={styles.expContainer}>
          <DropDown
            items={expInYears}
            color="#000000"
            height={60}
            borderColor={expColor}
            onSelect={(index, option) => handleExperienceSelectionYears(index, option)}
            selectedIndex={expSelectedInYears}
            placeholder="In Years"
            style={styles.exprInnerContainer}
          />
          <DropDown
            items={expInMonths}
            color="#000000"
            height={60}
            borderColor={expColor}
            onSelect={(index, option) => handleExperienceSelectionMonths(index, option)}
            selectedIndex={expSelectedInMonths}
            placeholder="In Months"
            style={styles.exprInnerContainer}
          />
        </View>
      </View>
      <View style={styles.dropDownContainer}>
        <DropDown
          items={occupation}
          color="#000000"
          height={60}
          borderColor={occColor}
          onSelect={(index, option) => handleOccupationSelection(index, option)}
          selectedIndex={occupationSelected}
          placeholder="Select Occupation"
          style={styles.dropDownInnerContainer}
        />
      </View>
    </View>
  );
};

export const RenderDocsForm = ({ aadharFront, aadharBack, onChange }) => {
  return (
    <View style={styles.docsContainer}>
      <View style={styles.frontImageContainer}>
        <Pressable />
      </View>
      <View style={styles.backImageContainer}>
        <Pressable>
          <Icon name="plus" size={100} />
        </Pressable>
      </View>
    </View>
  );
};
