import storage from '@react-native-firebase/storage';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { loaderStartAction } from '../../../redux/loaderService/LoaderAction';
import {
  addAddressByUsername,
  updateProfessionalDetails,
  updateUserProfile,
} from '../../../redux/user/userAction';
import { colors } from '../../../styles';
import APP_CONSTANTS from '../../../utils/appConstants/AppConstants';
import { checkEmpty, equalityChecker } from '../../../utils/commonFunctions';
import { Button } from '../../../utils/reusableComponents';
import { styles } from '../styles';
import {
  RenderAddressForm,
  RenderBasicDetailsForm,
  RenderDocsForm,
  RenderProfessionalDetailsForm,
} from './RenderEditForm';

export default class EditProfile extends Component {
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
      rawImge: null,
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
    const { aadharFront, aadharBack } = !checkEmpty(employeeData) ? employeeData : {};
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
    return false;
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
      rawImage,
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
        dispatch(updateProfessionalDetails(data?.employeeData));
        this.setState({
          aadharFront: res1,
          aadharBack: res2,
        });
        Alert.alert('Success', 'Aadhaar uploaded successfully!');
        this.hideDialog();
      }
    }
    if (section === 'Basic Details') {
      let imgUrl;
      if (rawImage) {
        imgUrl = await this.uploadImage(rawImage, `${email}-userAvatar.jpg`);
      }
      Object.assign(data, { name, phone, email, location, image: imgUrl || image });
      dispatch(loaderStartAction());
      dispatch(updateUserProfile(data));
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
      const experience = [experienceInYears.split(/\s/)[0], experienceInMonths.split(/\s/)[0]].join(
        '.',
      );
      Object.assign(data?.employeeData, { experience, occupation });
      console.log(data);
      dispatch(loaderStartAction());
      dispatch(updateProfessionalDetails(data?.employeeData));
      Alert.alert('Success', 'Professional details updated successfully!');
      this.hideDialog();
    }
    this.resetState()
    return false;
  };

  resetState = () => {
    this.setState({
      name:null,
      phone: null,
      email: null,
      image: null,
      location: null,
      buildingName: null,
      city: null,
      postalCode: null,
      state: null,
      street: null,
      experienceInYears: null,
      experienceInMonths: null,
      occupation: null,
      aadharFront: null,
      aadharBack: null,
      rawImage: null,
    })
  }

  handleLocationSelection = (index, opt) => {
    const { locations } = this.props;
    this.setState({
      locationSelected: index,
      location: locations.filter((item) => item.locationName === opt)[0],
    });
  };

  handleOccupationSelection = (index, opt) => {
    const { occupations } = this.props;
    this.setState({
      selectedOccupation: index,
      occupation: occupations.filter((item) => item.occupationName === opt)[0],
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
    if (type === 'rawImage') {
      this.setState({
        image: res,
        [type]: res,
      });
    } else {
      this.setState({
        [type]: res,
      });
    }
    this.forceUpdate()
  };

  render() {
    const { visible, section, locations, occupations } = this.props;
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
    const { exprInYears, exprInMonths } = APP_CONSTANTS;
    const occupationData = !checkEmpty(occupations)
      ? occupations.map((item) => item.occupationName)
      : [];
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
                  occupation={occupationData}
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

EditProfile.defaultProps = {
  dispatch: () => {},
};

EditProfile.propTypes = {
  visible: PropTypes.bool.isRequired,
  section: PropTypes.string.isRequired,
  locations: PropTypes.oneOfType([PropTypes.array]).isRequired,
  occupations: PropTypes.oneOfType([PropTypes.array]).isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dispatch: PropTypes.func,
  closeEditProfileHandler: PropTypes.func.isRequired,
};
