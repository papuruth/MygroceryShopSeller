import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import _ from 'lodash';
import { colors } from '../../../styles';
import { checkEmpty } from '../../../utils/commonFunctions';
import { Button } from '../../../utils/reusableComponents';
import { styles } from '../styles';
import {
  RenderBasicDetailsForm,
  RenderAddressForm,
  RenderProfessionalDetailsForm,
  RenderDocsForm,
} from './RenderEditForm';
import APP_CONSTANTS from '../../../utils/appConstants/AppConstants';

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
      aadharFront: '',
      aadharBack: '',
      locationSelected: null,
      locationColor: colors.PURPLE,
      occColor: colors.PURPLE,
      expColor: colors.PURPLE,
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

  saveProfile = () => {};

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
    } = this.state;
    const { occupation, exprInYears, exprInMonths } = APP_CONSTANTS;
    return (
      <SafeAreaView>
        <Portal>
          <Dialog visible={visible} dismissable={false}>
            <Dialog.Title>{`Edit ${section}`}</Dialog.Title>
            <Dialog.Content>
              {section === 'Basic Details' && (
                <RenderBasicDetailsForm
                  name={name}
                  email={email}
                  phone={phone}
                  image={image}
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
              {
                section === 'Documents' && (
                  <RenderDocsForm />
                )
              }
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
