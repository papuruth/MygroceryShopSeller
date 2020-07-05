import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-with-locales-es6';
import React, { Component } from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { CheckBox, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Lightbox from 'react-native-lightbox';
import { Dropdown, Button } from '../../components';
import { Lang } from './lang';

const cameraIcon = require('../../../assets/icons/camera.png');

const regIcon = require('../../../assets/icons/loginIcon.jpeg');

const Colors = {
  PRIMARY: '#1abc9c',
  WHITE: '#ffffff',
  GREEN: '#0da935',
  LIGHTGRAY: '#C7C7C7',
  DARKGRAY: '#5E5E5E',
  CGRAY: '#33393c',
  PURPLE: '#6659b6',
  BLUE: '#25a8df',
  LIGHTERGRAY: '#dbdbdb',
  ALMOSTWHITE: '#f0f0f0',
  ERROR: '#f21818',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.WHITE,
    paddingLeft: 0,
    position: 'relative',
    paddingRight: 0,
  },
  formContainer: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  inputStyle: {
    paddingBottom: 16,
  },
  innerContaner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    backgroundColor: Colors.WHITE,
    maxHeight: '80%',
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    height: '20%',
    alignContent: 'center',
    marginBottom: 20,
  },
  bottomButton: {
    alignSelf: 'center',
  },
  welcome: {
    textAlign: 'center',
  },
  header: {
    backgroundColor: Colors.WHITE,
    height: 80,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    maxHeight: 80,
  },
  headerText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
  },
  lightText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Light',
    color: Colors.DARKGRAY,
    top: 20,
    textAlign: 'center',
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 60,
  },
  value: {
    fontFamily: 'OpenSans-Light',
    paddingTop: 5,
  },
  hyperlink: {
    color: 'blue',
    fontFamily: 'OpenSans-Light',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  professionalDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  professionalDetailsInnerContainer: {
    justifyContent: 'flex-start',
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
    paddingRight: 10,
  },
  exprContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    maxWidth: '100%',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  exprInnerContainer: {
    minWidth: '45%',
    justifyContent: 'flex-start',
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: '80%',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  checkboxInnerContainer: {
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,

    height: 64,
  },
  buttonStyle: {
    height: 64,
    backgroundColor: Colors.PURPLE,
    paddingTop: 16,
    paddingBottom: 16,
  },
  divider: {
    height: 20,
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 60,
  },
  uploadDocContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    maxWidth: '100%',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  uploadDocText: {
    fontSize: 18,
    fontWeight: '600',
  },
  uploadDocInnerItem: {
    paddingLeft: 10,
  },
  btnAlignment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraContainer: {
    width: '100%',
    position: 'absolute',
    left: 0,
    height: '100%',
    bottom: 0,
    right: 0,
    zIndex: 1,
    top: 0,
  },
  docPreviewContainer: {
    width: 200,
    paddingTop: 10,
    paddingLeft: 10,
  },
  docPreview: {
    flex: 1,
    height: 200,
  },
});

const occupation = [
  'Civil Engineer',
  'Architect',
  'Mason (with Labour)',
  'Carpenter',
  'Electrician',
  'Plumber',
  'Painter',
  'Welder',
  'Tiles / Stone / Flooring',
  'Home Decoration',
];

const exprInYears = [
  '0 Year',
  '1 Year',
  '2 Years',
  '3 Years',
  '4 Years',
  '5 Years',
  '6 Years',
  '7 Years',
  '8 Years',
  '9 Years',
  '10 Years',
];
const exprInMonths = [
  '0 Month',
  '1 Month',
  '2 Months',
  '3 Months',
  '4 Months',
  '5 Months',
  '6 Months',
  '7 Months',
  '8 Months',
  '9 Months',
  '10 Months',
  '11 Months',
];

export default class RegisterScreen extends Component {
  state = {
    openCamera: false,
    takingPic: false,
    docUri: null,
    date: new Date(),
    mode: 'date',
    show: false,
    nameValue: '',
    nameError: '',
    passwordValue: '',
    passwordError: '',
    ageValue: '',
    ageError: '',
    mobileValue: '+91',
    mobileError: '',
    occupationValue: '',
    occupationSelected: '',
    exprValueInMonth: '',
    exprInMonthSelected: '',
    exprValueInYear: '',
    exprInYearSelected: '',
    docsValue: '',
    docsError: '',
    dateOfBirthValue: '',
    dateOfBirthError: '',
    emailValue: '',
    emailError: '',
    addressValue: '',
    addressError: '',
    termsCheckValue: false,
    gdpaValue: false,
    gpdaColor: Colors.PURPLE,
    termsColor: Colors.PURPLE,
    exprColor: Colors.PURPLE,
    occupationColor: Colors.PURPLE,
  };

  show = (mode) => {
    this.setState({
      show: true,
      mode,
    });
  };

  setDate = (event, date) => {
    const day = moment(date, 'DD-MM-YYYY');
    const now = moment();
    const yob = moment(date, 'YYYY');
    const age = now.diff(yob, 'years');
    this.setState({
      date,
      ageValue: age.toString(),
      dateOfBirthValue: moment(day).format('DD-MM-YYYY'),
      show: false,
    });
  };

  datepicker = () => {
    this.show('date');
  };

  showDatepicker = () => {
    Keyboard.dismiss();
    this.setState({ show: true });
  };

  _validateFields = () => {
    const {
      nameValue,
      mobileValue,
      dateOfBirthValue,
      ageValue,
      emailValue,
      addressValue,
      passwordValue,
      gdpaValue,
      exprValueInMonth,
      exprValueInYear,
      occupationValue,
      termsCheckValue,
    } = this.state;

    let result = true;
    this._resetForm();
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const reMail = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mobile = /^\+\d{12}$/g;
    if (regName.test(nameValue) === false) {
      result = false;
      this.setState({ nameError: Lang.RegisterForm.nameError });
    }

    if (passwordValue === '') {
      result = false;
      this.setState({ passwordError: Lang.RegisterForm.passwordError });
    }

    if (reMail.test(emailValue) === false) {
      result = false;
      this.setState({ emailError: Lang.RegisterForm.emailError });
    }

    if (!mobile.test(mobileValue)) {
      result = false;
      this.setState({ mobileError: Lang.RegisterForm.mobileError });
    }

    if (dateOfBirthValue === '') {
      result = false;
      this.setState({ dateOfBirthError: Lang.RegisterForm.dateError });
    }

    if (addressValue === '') {
      result = false;
      this.setState({ addressError: Lang.RegisterForm.addressError });
    }

    if (ageValue === '') {
      result = false;
      this.setState({ ageError: Lang.RegisterForm.ageError });
    }

    if (ageValue !== '' && (ageValue < '18' || ageValue > '60')) {
      result = false;
      this.setState({ ageError: Lang.RegisterForm.ageError });
    }

    if (termsCheckValue === false) {
      this.setState({ termsColor: Colors.ERROR });
      result = false;
    }

    if (gdpaValue === false) {
      this.setState({ gpdaColor: Colors.ERROR });
      result = false;
    }
    if (!exprValueInMonth && !exprValueInYear) {
      this.setState({ exprColor: Colors.ERROR });
      result = false;
    }
    if (!occupationValue) {
      this.setState({ occupationColor: Colors.ERROR });
      result = false;
    }
    return result;
  };

  _resetForm = () => {
    this.setState({
      nameError: '',
      emailError: '',
      dateOfBirthError: '',
      mobileError: '',
      ageError: '',
      passwordError: '',
      addressError: '',
      termsColor: Colors.PURPLE,
      gpdaColor: Colors.PURPLE,
      occupationColor: Colors.PURPLE,
      exprColor: Colors.PURPLE,
    });
  };

  makeAPICall = () => {
    const result = this._validateFields();
    if (result === true) {
      // can send an API call //
    }
  };

  handleOccupationSelected = (index, option) => {
    this.setState({
      occupationSelected: index,
      occupationValue: option,
    });
  };

  handleExprSelected = (index, value, type) => {
    if (type === 'year') {
      this.setState({
        exprInYearSelected: index,
        exprValueInYear: value,
      });
    } else {
      this.setState({
        exprInMonthSelected: index,
        exprValueInMonth: value,
      });
    }
  };

  openCammera = () => {
    this.setState({
      openCamera: true,
    });
  };

  takePicture = async () => {
    const { takingPic } = this.state;
    if (this.camera && !takingPic) {
      const options = {
        quality: 1,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      this.setState({ takingPic: true });

      try {
        const data = await this.camera.takePictureAsync(options);
        this.setState({
          docUri: data.uri,
          openCamera: false,
        });
      } catch (err) {
        Alert.alert('Error', `Failed to take picture: ${err.message || err}`);
        return;
      } finally {
        this.setState({ takingPic: false });
      }
    }
  };

  render() {
    const {
      show,
      mode,
      date,
      nameError,
      nameValue,
      mobileError,
      mobileValue,
      dateOfBirthError,
      dateOfBirthValue,
      ageError,
      ageValue,
      emailError,
      emailValue,
      addressError,
      addressValue,
      passwordError,
      passwordValue,
      exprInMonthSelected,
      exprInYearSelected,
      exprColor,
      occupationColor,
      docsError,
      gdpaValue,
      gpdaColor,
      termsCheckValue,
      termsColor,
      occupationSelected,
      openCamera,
      docUri,
    } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.avatar} source={regIcon} />
          </View>
          <View style={styles.formContainer}>
            <Input
              containerStyle={styles.inputStyle}
              placeholder={Lang.RegisterForm.name}
              errorMessage={nameError}
              errorDisplay={false}
              onChangeText={text => this.setState({ nameValue: text })}
              value={nameValue}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.mobileInputRef.focus();
              }}
              blurOnSubmit={false}
            />
            <Input
              containerStyle={styles.inputStyle}
              placeholder={Lang.RegisterForm.mobile}
              errorMessage={mobileError}
              keyboardType="phone-pad"
              onChangeText={text => this.setState({ mobileValue: text })}
              value={mobileValue}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.dobInputRef.focus();
              }}
              blurOnSubmit={false}
              ref={(input) => {
                this.mobileInputRef = input;
              }}
            />
            <Input
              containerStyle={styles.inputStyle}
              placeholder={Lang.RegisterForm.date}
              editable
              onFocus={this.showDatepicker}
              errorMessage={dateOfBirthError}
              value={dateOfBirthValue}
              ref={(input) => {
                this.dobInputRef = input;
              }}
            />
            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour
                display="default"
                onChange={this.setDate}
              />
            )}
            <Input
              containerStyle={styles.inputStyle}
              placeholder={Lang.RegisterForm.age}
              editable
              returnKeyType="next"
              keyboardType="number-pad"
              onSubmitEditing={() => {
                this.addressInputRef.focus();
              }}
              blurOnSubmit={false}
              errorMessage={ageError}
              onChangeText={text => this.setState({ ageValue: text })}
              value={ageValue}
              ref={(input) => {
                this.ageInputRef = input;
              }}
            />
            <Input
              containerStyle={styles.inputStyle}
              placeholder={Lang.RegisterForm.address}
              errorMessage={addressError}
              onChangeText={text => this.setState({ addressValue: text })}
              value={addressValue}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.emailInputRef.focus();
              }}
              blurOnSubmit={false}
              ref={(input) => {
                this.addressInputRef = input;
              }}
            />
            <Input
              containerStyle={styles.inputStyle}
              placeholder={Lang.RegisterForm.email}
              errorMessage={emailError}
              keyboardType="email-address"
              onChangeText={text => this.setState({ emailValue: text })}
              value={emailValue}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.passwordInputRef.focus();
              }}
              blurOnSubmit={false}
              ref={(input) => {
                this.emailInputRef = input;
              }}
            />
            <Input
              containerStyle={styles.inputStyle}
              placeholder={Lang.RegisterForm.password}
              errorMessage={passwordError}
              secureTextEntry
              onChangeText={text => this.setState({ passwordValue: text })}
              value={passwordValue}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.occupationValue.focus();
              }}
              blurOnSubmit={false}
              ref={(input) => {
                this.passwordInputRef = input;
              }}
            />
            <View style={styles.professionalDetailsContainer}>
              <Text style={styles.professionalDetailsInnerContainer}>
                {Lang.RegisterForm.occupation}
              </Text>
              <Dropdown
                items={occupation}
                color="#000000"
                borderColor={occupationColor}
                onSelect={(index, option) =>
                  this.handleOccupationSelected(index, option)
                }
                selectedIndex={occupationSelected}
                placeholder="Please select an occupation"
                style={styles.professionalDetailsInnerContainer}
              />
              <Text style={styles.professionalDetailsInnerContainer}>
                {Lang.RegisterForm.expr}
              </Text>
              <View style={styles.exprContainer}>
                <Dropdown
                  items={exprInYears}
                  color="#000000"
                  borderColor={exprColor}
                  onSelect={(index, option) =>
                    this.handleExprSelected(index, option, 'year')
                  }
                  selectedIndex={exprInYearSelected}
                  placeholder="Experience in years"
                  style={styles.exprInnerContainer}
                />
                <Dropdown
                  items={exprInMonths}
                  color="#000000"
                  borderColor={exprColor}
                  onSelect={(index, option) =>
                    this.handleExprSelected(index, option, 'month')
                  }
                  selectedIndex={exprInMonthSelected}
                  placeholder="Experience in months"
                  style={styles.exprInnerContainer}
                />
              </View>
              <View style={styles.uploadDocContainer}>
                <Text style={styles.uploadDocText}>
                  {Lang.RegisterForm.docs}
                </Text>
                <TouchableOpacity
                  style={styles.uploadDocInnerItem}
                  onPress={this.openCammera}
                >
                  <Image source={cameraIcon} onPress={this.openCamera} />
                </TouchableOpacity>
              </View>
              {docUri !== null && (
                <View style={styles.docPreviewContainer}>
                  <Lightbox>
                    <Image style={styles.docPreview} source={{ uri: docUri }} />
                  </Lightbox>
                </View>
              )}
            </View>
            <View style={styles.divider} />
            <View style={styles.checkboxContainer}>
              <CheckBox
                iconType="material"
                uncheckedIcon="check-box-outline-blank"
                checkedIcon="check-box"
                checkedColor={Colors.PURPLE}
                uncheckedColor={termsColor}
                containerStyle={styles.checkboxInnerContainer}
                checked={termsCheckValue}
                onPress={() =>
                  this.setState({
                    termsCheckValue: !termsCheckValue,
                  })
                }
              />
              <Text
                style={[styles.value, styles.hyperlink]}
                onPress={this._navigateToTerms}
              >
                {Lang.RegisterForm.terms}
              </Text>
            </View>

            <View style={styles.checkboxContainer}>
              <CheckBox
                iconType="material"
                uncheckedIcon="check-box-outline-blank"
                checkedIcon="check-box"
                checkedColor={Colors.PURPLE}
                uncheckedColor={gpdaColor}
                containerStyle={styles.checkboxInnerContainer}
                checked={gdpaValue}
                onPress={() =>
                  this.setState({
                    gdpaValue: !gdpaValue,
                  })
                }
              />
              <Text
                style={[styles.value, styles.hyperlink]}
                onPress={this._navigateToTerms}
              >
                {Lang.RegisterForm.GDPA}
              </Text>
            </View>
            <Button
              large
              style={[styles.buttonContainer]}
              caption={Lang.RegisterForm.send}
              onPress={this.makeAPICall}
            />
          </View>
          {openCamera && (
            <RNCamera
              ref={(ref) => {
                this.camera = ref;
              }}
              captureAudio={false}
              style={styles.cameraContainer}
              type={RNCamera.Constants.Type.back}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btnAlignment}
                onPress={this.takePicture}
              >
                <Icon name="camera" size={50} color="#fff" />
              </TouchableOpacity>
            </RNCamera>
          )}
        </View>
      </ScrollView>
    );
  }
}
