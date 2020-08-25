import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Card, Dialog, Divider, IconButton, Portal } from 'react-native-paper';
import { loaderStartAction } from '../../../redux/loaderService/LoaderAction';
import {
  getAllAddressAction,
  updateAddressById,
  getUserDataAction,
} from '../../../redux/user/userAction';
import { checkEmpty, equalityChecker } from '../../../utils/commonFunctions';
import { Button } from '../../../utils/reusableComponents';
import { styles } from '../styles';
import { RenderAddressEditForm } from './RenderAddressEditForm';

export default class EditAddress extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      buildingName: null,
      city: null,
      postalCode: null,
      state: null,
      street: null,
      addressId: null,
      isPrimary: null,
    };
    this.fetchAddress();
  }

  componentDidUpdate(prevProps) {
    const { updateAddress, updateAddressError } = this.props;
    if (!equalityChecker(updateAddress, prevProps.updateAddress) && updateAddress?.status) {
      this.hideDialog();
      Alert.alert('Success', 'Address updated successfully!');
      this.fetchAddress();
    }

    if (!equalityChecker(updateAddressError, prevProps.updateAddressError)) {
      Alert.alert('Error', 'Address update failed!');
      this.hideDialog();
    }
  }

  fetchAddress = () => {
    const { dispatch } = this.props;
    dispatch(loaderStartAction());
    dispatch(getUserDataAction());
    dispatch(getAllAddressAction());
  };

  deleteAddress = () => {};

  editAddress = ({ addressId, buildingName, city, postalCode, state, street, isPrimary }) => {
    this.setState({
      visible: true,
      addressId,
      buildingName,
      city,
      postalCode: postalCode.toString(),
      state,
      street,
      isPrimary
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false,
    });
    this.forceUpdate();
  };

  handleUserInput = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  updateAddress = () => {
    const { addressId, buildingName, city, postalCode, state, street, isPrimary } = this.state;
    const { dispatch } = this.props;
    const updatePayload = { addressId, buildingName, city, postalCode, state, street, isPrimary };
    dispatch(loaderStartAction());
    dispatch(updateAddressById(addressId, updatePayload));
  };

  render() {
    console.log(this.props);
    const { addressData } = this.props;
    const { visible, buildingName, city, postalCode, state, street, isPrimary } = this.state;
    return (
      <SafeAreaView style={styles.addressEditContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.addressCardContainer}>
            {!checkEmpty(addressData) ? (
              addressData.map((item, index) => {
                return (
                  <Card style={styles.addressCard} key={item?.addressId}>
                    <Card.Title
                      title={`Address ${index + 1}`}
                      style={styles.cardTitle}
                      right={(props) => (
                        <View style={styles.addressActionIcon}>
                          <IconButton {...props} icon="delete" onPress={this.deleteAddress} />
                          <IconButton
                            {...props}
                            icon="square-edit-outline"
                            onPress={() => this.editAddress(item)}
                          />
                        </View>
                      )}
                    />
                    <Divider style={styles.dividerStyle} />
                    <Card.Content style={styles.cardContent}>
                      <View style={styles.addressInfo}>
                        <Text style={styles.label}>Building Name:</Text>
                        <Text style={styles.textContent}>{item?.buildingName || 'N/A'}</Text>
                      </View>
                      <View style={styles.addressInfo}>
                        <Text style={styles.label}>City:</Text>
                        <Text style={styles.textContent}>{item?.city || 'N/A'}</Text>
                      </View>
                      <View style={styles.addressInfo}>
                        <Text style={styles.label}>Postal Code:</Text>
                        <Text style={styles.textContent}>{item?.postalCode || 'N/A'}</Text>
                      </View>
                      <View style={styles.addressInfo}>
                        <Text style={styles.label}>State:</Text>
                        <Text style={styles.textContent}>{item?.state || 'N/A'}</Text>
                      </View>
                      <View style={styles.addressInfo}>
                        <Text style={styles.label}>Street:</Text>
                        <Text style={styles.textContent}>{item?.street || 'N/A'}</Text>
                      </View>
                      <View style={styles.addressInfo}>
                        <Text style={styles.label}>Primary:</Text>
                        <Text style={styles.textContent}>{item?.isPrimary ? 'Yes' : 'No'}</Text>
                      </View>
                    </Card.Content>
                  </Card>
                );
              })
            ) : (
              <View style={styles.editAddressNoAddress}>
                <Text style={styles.noAddressText}>No address to edit.</Text>
                <Text style={styles.noAddressText2}>
                  Please add some address from Edit Profile Screen to edit them here.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <Portal>
          <Dialog visible={visible} dismissable={false}>
            <Dialog.Title>Edit Address</Dialog.Title>
            <Dialog.Content>
              <RenderAddressEditForm
                buildingName={buildingName}
                city={city}
                postalCode={postalCode}
                state={state}
                street={street}
                isPrimary={isPrimary}
                onChange={this.handleUserInput}
              />
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
                onPress={this.updateAddress}
                caption="Done"
              />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    );
  }
}

EditAddress.propTypes = {
  addressData: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
