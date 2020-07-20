import React, { Component } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements';
import APP_CONSTANTS from '../../utils/appConstants/AppConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4d4d4',
  },
  avatar: {
    width: 100,
    height: 60,
  },
  loginIcon: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
});

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    };
  }

  render() {
    const {
      IMAGES: { loginIcon },
    } = APP_CONSTANTS;
    const { phone, password } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.loginIcon}>
          <Image style={styles.avatar} source={loginIcon} />
        </View>
        <View style={styles.inputContainer}>
          <Icon style={styles.inputIcon} name="person" aria-hidden="true" />
          <TextInput style={styles.inputs} placeholder="Phone Number" value={phone} underlineColorAndroid="transparent" onChangeText={(value) => this.setState({ phone: value })} />
        </View>

        <View style={styles.inputContainer}>
          <Icon style={styles.inputIcon} name="lock" />
          <TextInput style={styles.inputs} placeholder="Password" value={password} secureTextEntry underlineColorAndroid="transparent" onChangeText={(value) => this.setState({ password: value })} />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
