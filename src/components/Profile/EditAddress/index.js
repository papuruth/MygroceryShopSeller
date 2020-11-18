import {
  addAddressAction,
  deleteAddressById,
  getAllAddressAction,
  updateAddressById,
} from '@/redux/user/userAction';
import { colors } from '@/styles';
import { checkEmpty, equalityChecker } from '@/utils/commonFunctions';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Card, Dialog, Divider, IconButton, Portal } from 'react-native-paper';
import { loaderStartAction } from '../../../redux/loaderService/LoaderAction';
import { Button } from '../../../utils/reusableComponents';
import { styles } from '../styles';
import { RenderAddressEditForm } from './RenderAddressEditForm';
import { RenderNewAddressForm } from './RenderNewAddressForm';

export default class EditAddress extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      visible: false,
      buildingName: null,
      city: null,
      postalCode: null,
      state: null,
      street: null,
      addressId: null,
      addressType: 'Home',
      showNewAddressForm: false,
    };
    this.fetchAddress(props);
  }

  componentDidUpdate(prevProps) {
    const { addAddress, updateAddress, addressDeleteStatus } = this.props;
    if (!equalityChecker(addAddress, prevProps.addAddress) && addAddress?.status) {
      this.fetchAddress(this.props);
      Alert.alert('Success', 'Address added successfully!');
      this.hideDialog();
    }
    if (!equalityChecker(updateAddress, prevProps.updateAddress) && updateAddress?.status) {
      this.fetchAddress(this.props);
      Alert.alert('Success', 'Address updated successfully!');
      this.hideDialog();
    }
    if (
      !equalityChecker(addressDeleteStatus, prevProps.addressDeleteStatus) &&
      addressDeleteStatus?.status
    ) {
      this.fetchAddress(this.props);
      Alert.alert('Success', 'Address deleted successfully!');
      this.hideDialog();
    }
  }

  fetchAddress = (props) => {
    const { dispatch, user } = props;
    dispatch(loaderStartAction());
    dispatch(getAllAddressAction(user?.phoneNumber));
  };

  deleteAddress = (data) => {
    const { dispatch, user } = this.props;
    dispatch(loaderStartAction());
    dispatch(deleteAddressById(data?.addressId, user?.phoneNumber));
  };

  editAddress = ({ addressId, buildingName, city, postalCode, state, street, addressType }) => {
    this.setState({
      visible: true,
      addressId,
      buildingName,
      city,
      postalCode,
      state,
      street,
      addressType,
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false,
      showNewAddressForm: false,
    });
    this.forceUpdate();
  };

  handleUserInput = (name, value) => {
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  };

  addNewAddress = () => {
    this.setState({
      showNewAddressForm: true,
    });
  };

  updateAddress = () => {
    const { addressId, buildingName, city, postalCode, state, street, addressType } = this.state;
    const { dispatch, user } = this.props;
    const updatePayload = { addressId, buildingName, city, postalCode, state, street, addressType };
    dispatch(loaderStartAction());
    dispatch(updateAddressById(addressId, user?.phoneNumber, updatePayload));
  };

  saveNewAddress = () => {
    const { dispatch, addressData, user } = this.props;
    const { buildingName, city, postalCode, state, street, addressType } = this.state;
    const payload = {
      addressId: !checkEmpty(addressData) ? addressData.length + 1 : 1,
      buildingName,
      city,
      postalCode,
      state,
      street,
      addressType,
    };
    console.log(payload);
    if (buildingName && city && postalCode && state && street && addressType) {
      dispatch(loaderStartAction());
      dispatch(addAddressAction(payload, user?.phoneNumber));
    } else {
      Alert.alert('Error', 'Please fill all the fields.!');
    }
  };

  render() {
    const { addressData } = this.props;
    const {
      visible,
      buildingName,
      city,
      postalCode,
      state,
      street,
      showNewAddressForm,
      addressType,
    } = this.state;
    return (
      <SafeAreaView style={styles.addressEditContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.newAddressView}>
            <Button
              bordered
              bgColor={colors.blue}
              caption="Add new address"
              onPress={this.addNewAddress}
            />
          </View>
          <View style={styles.addressCardContainer}>
            {!checkEmpty(addressData) ? (
              addressData.map((item) => {
                return (
                  <Card style={styles.addressCard} key={item?.addressId}>
                    <Card.Title
                      titleStyle={styles.cardTitle}
                      title={item?.addressType}
                      right={(props) => (
                        <View style={styles.addressActionIcon}>
                          <IconButton
                            {...props}
                            icon="delete"
                            onPress={() => this.deleteAddress(item)}
                            color="#000"
                          />
                          <IconButton
                            {...props}
                            color="#000"
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
          <Dialog visible={visible || showNewAddressForm} dismissable={false}>
            <Dialog.Title>{visible ? 'Edit Address' : 'Add New Address'}</Dialog.Title>
            <Dialog.Content>
              {visible ? (
                <RenderAddressEditForm
                  buildingName={buildingName}
                  city={city}
                  postalCode={postalCode}
                  state={state}
                  street={street}
                  addressType={addressType}
                  onChange={this.handleUserInput}
                />
              ) : (
                <RenderNewAddressForm
                  buildingName={buildingName}
                  city={city}
                  postalCode={postalCode}
                  state={state}
                  street={street}
                  addressType={addressType}
                  onChange={this.handleUserInput}
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
                style={styles.editProfileButton}
                onPress={visible ? this.updateAddress : this.saveNewAddress}
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
  addAddress: PropTypes.oneOfType([PropTypes.object]).isRequired,
  updateAddress: PropTypes.oneOfType([PropTypes.object]).isRequired,
  addressDeleteStatus: PropTypes.oneOfType([PropTypes.object]).isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired,
};
