import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-with-locales-es6';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert, Image, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { loaderStartAction } from '../../redux/loaderService/LoaderAction';
import { getLocationAction, userSignupAction } from '../../redux/user/userAction';
import { colors } from '../../styles';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';
import { checkEmpty } from '../../utils/commonFunctions';
import { Button } from '../../utils/reusableComponents';
import DropDown from '../../utils/reusableComponents/Dropdown';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.WHITE,
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
    backgroundColor: colors.WHITE,
    maxHeight: '80%',
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  locationInnerContainer: {
    justifyContent: 'flex-start',
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
    paddingRight: 10,
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
    backgroundColor: colors.WHITE,
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
    color: colors.DARKGRAY,
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
    backgroundColor: colors.PURPLE,
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

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      mode: 'date',
      show: false,
      nameValue: '',
      nameError: '',
      passwordValue: '',
      passwordError: '',
      ageValue: '',
      ageError: '',
      mobileValue: '',
      mobileError: '',
      dateOfBirthValue: '',
      dateOfBirthError: '',
      emailValue: '',
      emailError: '',
      locationColor: colors.PURPLE,
      locationSelected: '',
      location: {},
    };
    const { dispatch } = this.props;
    dispatch(getLocationAction());
  }

  componentDidUpdate(prevProps) {
    const {signUpError, signUpStatus, navigation} = this.props;
    if (!checkEmpty(signUpError) && signUpError !== prevProps.signUpError) {
      const { response } = signUpError;
      Alert.alert('Error', response.message || "Some error occured",[{ text: 'OK'}],{ cancelable: false });
    }
    if (signUpStatus !== prevProps.signUpStatus && signUpStatus) {
      Alert.alert(
        'Success',
        'Registration is successfull',
        [
          { text: 'OK', onPress: () => navigation.navigate('login') }
        ],
        { cancelable: false }
      );
    }
  }
  
  show = (mode) => {
    this.setState({
      show: true,
      mode,
    });
  };

  setDate = (event, date) => {
    if (date) {
      const day = moment(date, 'DD-MM-YYYY');
      const now = moment();
      const yob = moment(date, 'YYYY');
      const age = now.diff(yob, 'years');
      this.setState({
        date,
        ageValue: age.toString(),
        dateOfBirthValue: moment(day).format('YYYY-MM-DD'),
        show: false,
      });
    } else {
      this.setState({
        ageValue: '',
        dateOfBirthValue: '',
        show: false,
      });
    }
  };

  datepicker = () => {
    this.show('date');
  };

  showDatepicker = () => {
    Keyboard.dismiss();
    this.setState({ show: true });
  };

  validateFields = () => {
    const { nameValue, mobileValue, dateOfBirthValue, ageValue, emailValue, passwordValue, location } = this.state;
    const { RegisterForm } = APP_CONSTANTS;
    let result = true;
    this.resetForm();
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const reMail = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mobile = /^\d{10}$/g;
    if (regName.test(nameValue) === false) {
      result = false;
      this.setState({ nameError: RegisterForm.nameError });
    }

    if (passwordValue === '') {
      result = false;
      this.setState({ passwordError: RegisterForm.passwordError });
    }

    if (reMail.test(emailValue) === false) {
      result = false;
      this.setState({ emailError: RegisterForm.emailError });
    }

    if (!mobile.test(mobileValue)) {
      result = false;
      this.setState({ mobileError: RegisterForm.mobileError });
    }

    if (dateOfBirthValue === '') {
      result = false;
      this.setState({ dateOfBirthError: RegisterForm.dateError });
    }

    if (ageValue === '') {
      result = false;
      this.setState({ ageError: RegisterForm.ageError });
    }

    if (ageValue !== '' && (ageValue < '18' || ageValue > '60')) {
      result = false;
      this.setState({ ageError: RegisterForm.ageError });
    }
    if (!location) {
      result = false;
      this.setState({ locationColor: colors.ERROR });
    }
    return result;
  };

  resetForm = () => {
    this.setState({
      nameError: '',
      emailError: '',
      dateOfBirthError: '',
      mobileError: '',
      ageError: '',
      passwordError: '',
      locationColor: colors.PURPLE,
    });
  };

  handleLocationSelection = (index, opt) => {
    console.log(index, opt)
    const { locations } = this.props;
    this.setState({
      locationSelected: index,
      location: locations.filter((item) => item.locationName === opt)[0],
    });
  };

  registerUser = () => {
    const result = true;
    if (result === true) {
      const { nameValue, mobileValue, dateOfBirthValue, location, ageValue, emailValue, passwordValue } = this.state;
      // const userRegBody = {
      //   name: nameValue,
      //   phone: Number(mobileValue),
      //   email: emailValue,
      //   password: passwordValue,
      //   age: Number(ageValue),
      //   roles: ['emp'],
      //   address: [],
      //   employeeData: {},
      //   location,
      //   dob: dateOfBirthValue,
      // };
      const userRegBody = {
        name: 'Vinay Yadav',
        phone: 7777888899,
        email: 'vy@gmail.com',
        password: '727785',
        age: 30,
        roles: ['emp'],
        address: [],
        employeeData: {},
        location: {
          locationId: 1,
          locationName: 'Delhi'
        },
        dob: '1994-09-10',
      };
      const { dispatch } = this.props;
      dispatch(loaderStartAction());
      dispatch(userSignupAction(userRegBody));
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
      passwordError,
      passwordValue,
      locationColor,
      locationSelected,
    } = this.state;
    const {
      RegisterForm,
      IMAGES: { regIcon },
    } = APP_CONSTANTS;
    const { locations } = this.props;
    const locationData = !checkEmpty(locations) ? locations.map((item) => item.locationName) : [];
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.avatar} source={regIcon} />
          </View>
          <View style={styles.formContainer}>
            <Input
              containerStyle={styles.inputStyle}
              placeholder={RegisterForm.name}
              errorMessage={nameError}
              errorDisplay={false}
              onChangeText={(text) => this.setState({ nameValue: text })}
              value={nameValue}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.mobileInputRef.focus();
              }}
              blurOnSubmit={false}
            />
            <Input
              containerStyle={styles.inputStyle}
              placeholder={RegisterForm.mobile}
              errorMessage={mobileError}
              keyboardType="phone-pad"
              onChangeText={(text) => this.setState({ mobileValue: text })}
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
              placeholder={RegisterForm.date}
              editable
              onFocus={this.showDatepicker}
              errorMessage={dateOfBirthError}
              value={dateOfBirthValue}
              ref={(input) => {
                this.dobInputRef = input;
              }}
            />
            {show && <DateTimePicker value={date} mode={mode} is24Hour display="default" onChange={this.setDate} />}
            <Input
              containerStyle={styles.inputStyle}
              placeholder={RegisterForm.age}
              editable
              returnKeyType="next"
              keyboardType="number-pad"
              onSubmitEditing={() => {
                this.emailInputRef.focus();
              }}
              blurOnSubmit={false}
              errorMessage={ageError}
              onChangeText={(text) => this.setState({ ageValue: text })}
              value={ageValue}
              ref={(input) => {
                this.ageInputRef = input;
              }}
            />
            <Input
              containerStyle={styles.inputStyle}
              placeholder={RegisterForm.email}
              errorMessage={emailError}
              keyboardType="email-address"
              onChangeText={(text) => this.setState({ emailValue: text })}
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
              placeholder={RegisterForm.password}
              errorMessage={passwordError}
              secureTextEntry
              onChangeText={(text) => this.setState({ passwordValue: text })}
              value={passwordValue}
              returnKeyType="next"
              blurOnSubmit
              ref={(input) => {
                this.passwordInputRef = input;
              }}
            />
            <View style={styles.locationContainer}>
              <DropDown
                items={locationData}
                color="#000000"
                borderColor={locationColor}
                onSelect={(index, option) => this.handleLocationSelection(index, option)}
                selectedIndex={locationSelected}
                placeholder="Select Location"
                style={styles.locationInnerContainer}
              />
            </View>
            <View style={styles.divider} />
            <Button large style={[styles.buttonContainer]} caption={RegisterForm.send} onPress={this.registerUser} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

RegisterScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locations: PropTypes.oneOfType([PropTypes.array]).isRequired,
  signUpError: PropTypes.oneOfType([PropTypes.object]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  signUpStatus: PropTypes.bool.isRequired
};
