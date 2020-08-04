import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';
import { Portal, Dialog, Paragraph, TextInput } from 'react-native-paper';
import { Button } from '../../../utils/reusableComponents';
import { styles } from '../styles';
import { checkEmpty } from '../../../utils/commonFunctions';
import RenderEditForm from './RenderEditForm';

export default class EditProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      buildingName: '',
      city: '',
      postalCode: '',
      state: '',
      street: '',
      experience: '',
      occupation: '',
      aadharFront: '',
      aadharBack: '',
    };
  }

  componentDidMount() {
    const { data } = props;
    const { name, phone, email, address, employeeData } = !checkEmpty(data) ? data : {};
    const { buildingName, city, postalCode, state, street } = !checkEmpty(address) ? address : {};
    const { experience, occupation, aadharFront, aadharBack } = !checkEmpty(employeeData) ? employeeData : {};
    this.setState({
      name,
      phone,
      email,
      buildingName,
      city,
      postalCode,
      state,
      street,
      experience,
      occupation,
      aadharFront,
      aadharBack,
    });
  }

  hideDialog = () => {
    const { closeEditProfileHandler } = this.props;
    closeEditProfileHandler();
  };

  handleUserInput = () => {};

  saveProfile = () => {};

  render() {
    const { visible, section } = this.props;
    console.log(this.state);
    const { name, phone, email, buildingName, city, postalCode, state, street, experience, occupation, aadharFront, aadharBack } = this.state;
    return (
      <SafeAreaView>
        <Portal>
          <Dialog visible={visible} dismissable={false}>
            <Dialog.Title>{`Edit ${section}`}</Dialog.Title>
            <Dialog.Content>
              {/* {
                section === 'Basic Details' && <RenderBasicDetailsForm formFields={personalDetails}  />
              } */}
              <Paragraph>This is a test Dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button rounded style={styles.editProfileButton} onPress={this.hideDialog} caption="Cancel" />
              <Button rounded style={styles.editProfileButton} onPress={this.saveProfile} caption="Done" />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    );
  }
}
