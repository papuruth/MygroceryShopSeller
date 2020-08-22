import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { imageSelector, checkEmpty } from '../../../utils/commonFunctions';
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
  setPhotos,
}) => {
  const selectPhoto = async () => {
    const res = await imageSelector();
    setPhotos(res, 'image');
  };
  return (
    <View style={styles.editBasicProfileContainer}>
      <View style={styles.editImageContainer}>
        {image ? (
          <Pressable
            onPress={() => selectPhoto('image')}
            android_ripple={{ color: '#000', radius: 360 }}
          >
            <Avatar.Image
              size={120}
              source={{
                uri: image,
              }}
            />
          </Pressable>
        ) : (
          <View>
            <Pressable
              onPress={() => selectPhoto('image')}
              android_ripple={{ color: '#000', radius: 360 }}
            >
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

export const RenderDocsForm = ({ aadharFront, aadharBack, setPhotos, uploading, transferred }) => {
  const selectPhoto = async (type) => {
    const res = await imageSelector();
    setPhotos(res, type);
  };
  return (
    <View style={styles.docsContainer}>
      <View style={styles.aadhaarImageContainer}>
        <Text style={styles.aadhaarLabel}>Aadhaar Front Image</Text>
        {!checkEmpty(aadharFront) ? (
          <Image source={{ uri: aadharFront }} style={styles.imageBox} />
        ) : (
          <Pressable
            onPress={() => selectPhoto('aadharFront')}
            android_ripple={{ color: '#000', radius: 360 }}
            style={styles.buttonShadow}
          >
            <Icon name="plus" size={100} />
          </Pressable>
        )}
      </View>
      <View style={styles.aadhaarImageContainer}>
        <Text style={styles.aadhaarLabel}>Aadhaar Back Image</Text>
        {!checkEmpty(aadharBack) ? (
          <Image source={{ uri: aadharBack }} style={styles.imageBox} />
        ) : (
          <Pressable
            onPress={() => selectPhoto('aadharBack')}
            android_ripple={{ color: '#000', radius: 360 }}
            style={styles.buttonShadow}
          >
            <Icon name="plus" size={100} />
          </Pressable>
        )}
      </View>
      <View>
        {uploading && (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        )}
      </View>
    </View>
  );
};
