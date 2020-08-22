import React, { PureComponent } from 'react';
import storage from '@react-native-firebase/storage';
import { SafeAreaView, Alert } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import _ from 'lodash';
import { colors } from '../../../styles';
import { checkEmpty, equalityChecker } from '../../../utils/commonFunctions';
import { Button } from '../../../utils/reusableComponents';
import { styles } from '../styles';
import {
  RenderBasicDetailsForm,
  RenderAddressForm,
  RenderProfessionalDetailsForm,
  RenderDocsForm,
} from './RenderEditForm';
import APP_CONSTANTS from '../../../utils/appConstants/AppConstants';
import { updateUserProfile, addAddressByUsername } from '../../../redux/user/userAction';
import { loaderStartAction } from '../../../redux/loaderService/LoaderAction';

export default class EditProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      image: '',
      location: '',
      buildingName: '',
      city: '',
      postalCode: '',
      state: '',
      street: '',
      expSelectedInYears: null,
      expSelectedInMonths: null,
      experienceInYears: null,
      experienceInMonths: null,
      selectedOccupation: null,
      aadharFront: null,
      aadharBack: null,
      locationSelected: null,
      locationColor: colors.PURPLE,
      occColor: colors.PURPLE,
      expColor: colors.PURPLE,
      uploading: false,
      transferred: 0,
    };
  }

  componentDidMount() {
    const { data, locations } = this.props;
    const { name, phone, email, location, address, employeeData, image } = !checkEmpty(data)
      ? data
      : {};
    const { buildingName, city, postalCode, state, street } = !checkEmpty(address) ? address : {};
    const { experience, occupation, aadharFront, aadharBack } = !checkEmpty(employeeData)
      ? employeeData
      : {};
    this.setState({
      name,
      phone,
      email,
      image,
      buildingName,
      city,
      postalCode,
      state,
      street,
      locationSelected: _.findIndex(
        locations,
        (item) => item.locationName === location?.locationName,
      ),
      aadharFront,
      location,
      aadharBack,
    });
  }

  hideDialog = () => {
    const { closeEditProfileHandler } = this.props;
    closeEditProfileHandler();
  };

  handleUserInput = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  uploadImage = async (image, fileName) => {
    console.log('uploader', fileName);
    this.setState({
      uploading: true,
      transferred: 0,
    });
    const task = storage()
      .ref(fileName)
      .putFile(image);
    // set progress state
    task.on('state_changed', (snapshot) => {
      this.setState({
        transferred: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      });
    });
    try {
      await task;
      const res = await storage()
        .ref(fileName)
        .getDownloadURL();
      this.setState({
        uploading: false,
      });
      return res;
    } catch (e) {
      console.error(e);
      this.setState({
        uploading: false,
      });
    }
  };

  saveProfile = async () => {
    const { section, data, dispatch } = this.props;
    const {
      name,
      phone,
      email,
      image,
      location,
      buildingName,
      city,
      postalCode,
      state,
      street,
      experienceInYears,
      experienceInMonths,
      occupation,
      aadharFront,
      aadharBack,
    } = this.state;
    if (section === 'Documents') {
      if (checkEmpty(aadharFront) || checkEmpty(aadharBack)) {
        Alert.alert('Error', 'Please select both photo and try again.');
        return false;
      }
      const res1 =
        !checkEmpty(aadharFront) &&
        (await this.uploadImage(aadharFront, `${email}-aadharFront.jpg`));
      const res2 =
        !checkEmpty(aadharBack) && (await this.uploadImage(aadharBack, `${email}-aadharBack.jpg`));
      if (res1 && !res2) {
        Alert.alert('Error', 'Aadhaar back image upload failed. Try again!');
      }
      if (!res1 && res2) {
        Alert.alert('Error', 'Aadhaar front image upload failed. Try again!');
      }
      if (res1 && res2) {
        Object.assign(data?.employeeData, {
          aadharFront: res1,
          aadharBack: res2,
        });
        dispatch(loaderStartAction());
        dispatch(updateUserProfile(data?.id, data));
        this.setState({
          aadharFront: res1,
          aadharBack: res2,
        });
        Alert.alert('Success', 'Aadhaar uploaded successfully!');
        this.hideDialog();
      }
    }
    if (section === 'Basic Details') {
      const imgUrl = await this.uploadImage(image, `${email}-userAvatar.jpg`);
      Object.assign(data, { name, phone, email, location, image: imgUrl });
      dispatch(loaderStartAction());
      dispatch(updateUserProfile(data?.id, data));
      Alert.alert('Success', 'Basic details updated successfully!');
      this.hideDialog();
    }
    if (section === 'Address') {
      const prevAddress = !checkEmpty(data?.address)
        ? data?.address[data?.address?.lenght - 1]
        : [];
      const newAddress = {
        addressId: null,
        buildingName,
        city,
        postalCode,
        state,
        street,
        isPrimary: null,
      };
      if (!equalityChecker(prevAddress, newAddress)) {
        console.log(data);
        dispatch(loaderStartAction());
        dispatch(addAddressByUsername(newAddress));
        Alert.alert('Success', 'New address added successfully!');
      } else {
        Alert.alert('Error', 'Address already exist! Please edit and save to update.');
      }
      this.hideDialog();
    }
    if (section === 'Professional Details') {
      const experience = [experienceInYears.split(/\s/)[0], experienceInMonths.split(/\s/)[0]].join('.');
      Object.assign(data?.employeeData, {experience, occupation});
      console.log(data);
      dispatch(loaderStartAction());
      dispatch(updateUserProfile(data?.id, data));
      Alert.alert('Success', 'Professional details updated successfully!');
      this.hideDialog();
    }
  };

  handleLocationSelection = (index, opt) => {
    const { locations } = this.props;
    this.setState({
      locationSelected: index,
      location: locations.filter((item) => item.locationName === opt)[0],
    });
  };

  handleOccupationSelection = (index, opt) => {
    this.setState({
      selectedOccupation: index,
      occupation: opt,
    });
  };

  handleExperienceSelectionYears = (index, opt) => {
    this.setState({
      expSelectedInYears: index,
      experienceInYears: opt,
    });
  };

  handleExperienceSelectionMonths = (index, opt) => {
    this.setState({
      expSelectedInMonths: index,
      experienceInMonths: opt,
    });
  };

  setSelectedPhotos = (res, type) => {
    this.setState({
      [type]: res,
    });
  };

  render() {
    const { visible, section, locations } = this.props;
    const locationsData = !checkEmpty(locations) ? locations.map((item) => item.locationName) : [];
    const {
      name,
      phone,
      email,
      image,
      locationSelected,
      locationColor,
      buildingName,
      city,
      postalCode,
      state,
      street,
      aadharFront,
      aadharBack,
      expSelectedInYears,
      expSelectedInMonths,
      selectedOccupation,
      occColor,
      expColor,
      uploading,
      transferred,
    } = this.state;
    const { occupation, exprInYears, exprInMonths } = APP_CONSTANTS;
    return (
      <SafeAreaView>
        <Portal>
          <Dialog visible={visible} dismissable={false}>
            {section === 'Address' ? (
              <Dialog.Title>{`Add ${section}`}</Dialog.Title>
            ) : (
              <Dialog.Title>{`Edit ${section}`}</Dialog.Title>
            )}
            <Dialog.Content>
              {section === 'Basic Details' && (
                <RenderBasicDetailsForm
                  name={name}
                  email={email}
                  phone={phone}
                  image={image}
                  setPhotos={this.setSelectedPhotos}
                  locationColor={locationColor}
                  locationSelected={locationSelected}
                  locationsData={locationsData}
                  handleLocationSelection={this.handleLocationSelection}
                  onChange={this.handleUserInput}
                />
              )}
              {section === 'Address' && (
                <RenderAddressForm
                  buildingName={buildingName}
                  city={city}
                  postalCode={postalCode}
                  state={state}
                  street={street}
                  onChange={this.handleUserInput}
                />
              )}
              {section === 'Professional Details' && (
                <RenderProfessionalDetailsForm
                  occupation={occupation}
                  expInYears={exprInYears}
                  expInMonths={exprInMonths}
                  handleExperienceSelectionYears={this.handleExperienceSelectionYears}
                  handleExperienceSelectionMonths={this.handleExperienceSelectionMonths}
                  handleOccupationSelection={this.handleOccupationSelection}
                  expSelectedInYears={expSelectedInYears}
                  expSelectedInMonths={expSelectedInMonths}
                  occupationSelected={selectedOccupation}
                  occColor={occColor}
                  expColor={expColor}
                />
              )}
              {section === 'Documents' && (
                <RenderDocsForm
                  aadharFront={aadharFront}
                  aadharBack={aadharBack}
                  setPhotos={this.setSelectedPhotos}
                  uploading={uploading}
                  transferred={transferred}
                />
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                rounded
                style={styles.editProfileButton}
                onPress={this.hideDialog}
                caption="Cancel"
              />
              <Button
                rounded
                loading={uploading}
                style={styles.editProfileButton}
                onPress={this.saveProfile}
                caption="Done"
              />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    );
  }
}
