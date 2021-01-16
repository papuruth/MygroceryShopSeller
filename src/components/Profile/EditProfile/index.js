/* eslint-disable no-underscore-dangle */
import { loaderStartAction, loaderStopAction } from '@/redux/loaderService/LoaderAction';
import { checkEmpty } from '@/utils/commonFunctions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { sessionService } from 'redux-react-native-session';
import { Button } from '../../../utils/reusableComponents';
import { styles } from '../styles';
import { RenderBasicDetailsForm } from './RenderEditForm';

export default class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      phoneNumber: '',
      photoURL: '',
      city: '',
      businessName: '',
      rawImage: '',
      uploading: false,
      transferred: 0,
    };
    this.initialState = this.state;
  }

  componentDidMount() {
    const { data } = this.props;
    if (!checkEmpty(data)) {
      const { displayName, phoneNumber, photoURL, city, businessName } = data;
      this.setState({
        displayName,
        phoneNumber,
        photoURL,
        city,
        businessName,
      });
    }
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
    this.setState({
      uploading: true,
      transferred: 0,
    });
    try {
      const task = storage()
        .ref(fileName)
        .putFile(image);
      // set progress state
      task.on('state_changed', (snapshot) => {
        this.setState({
          transferred: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
        });
      });
      await task;
      const res = await storage()
        .ref(fileName)
        .getDownloadURL();
      this.setState({
        uploading: false,
        transferred: 0,
      });
      return res;
    } catch (e) {
      console.error(e);
      this.setState({
        uploading: false,
        transferred: 0,
      });
    }
    return false;
  };

  saveProfile = async () => {
    const { section, dispatch } = this.props;
    try {
      const { displayName, phoneNumber, rawImage, photoURL, city, businessName } = this.state;
      if (section === 'Basic Details') {
        if (!displayName || !phoneNumber || !photoURL || !city || !businessName) {
          Alert.alert('Info', 'Please fill all the fields.');
          return false;
        }
        dispatch(loaderStartAction());

        let imgUrl;
        if (rawImage) {
          imgUrl = await this.uploadImage(rawImage, `${phoneNumber}-userAvatar.jpg`);
        }
        await auth().currentUser.updateProfile({
          displayName,
          photoURL: imgUrl || photoURL,
        });
        const user = auth().currentUser.toJSON();
        if (!checkEmpty(user)) {
          await firestore()
            .collection('distributors')
            .doc(user?.uid)
            .update({ ...user, city, businessName });
          Object.assign(user, { city, businessName });
          await sessionService.saveSession(user);
          await sessionService.saveUser(user);
        }
        Alert.alert('Success', 'Profile updated successfully!');
        this.resetState();
      }
    } catch (e) {
      console.log('error', e?.message);
    }
    dispatch(loaderStopAction());
    return false;
  };

  resetState = () => {
    this.setState(this.initialState, this.hideDialog);
  };

  setSelectedPhotos = (res, type) => {
    if (type === 'rawImage') {
      this.setState({
        photoURL: res,
        [type]: res,
      });
    } else {
      this.setState({
        [type]: res,
      });
    }
    this.forceUpdate();
  };

  render() {
    const { section } = this.props;
    const { displayName, photoURL, uploading, transferred, city, businessName } = this.state;
    return (
      <SafeAreaView>
        <Portal>
          <Dialog visible dismissable={false}>
            <Dialog.Title>{`Edit ${section}`}</Dialog.Title>
            <Dialog.Content>
              {section === 'Basic Details' && (
                <RenderBasicDetailsForm
                  displayName={displayName}
                  uploading={uploading}
                  photoURL={photoURL}
                  city={city}
                  businessName={businessName}
                  transferred={transferred}
                  setPhotos={this.setSelectedPhotos}
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

EditProfile.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  closeEditProfileHandler: PropTypes.func.isRequired,
  section: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
