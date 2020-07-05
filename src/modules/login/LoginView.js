import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';

const loginIcon = require('../../../assets/icons/loginIcon.jpeg');

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
    return (
      <View style={styles.container}>
        <View style={styles.loginIcon}>
          <Image style={styles.avatar} source={loginIcon} />
        </View>
        <View style={styles.inputContainer}>
          <Icon style={styles.inputIcon} name="person" aria-hidden="true" />
          <TextInput
            style={styles.inputs}
            placeholder="Phone Number"
            underlineColorAndroid="transparent"
            onChangeText={(phone) => this.setState({ phone })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon style={styles.inputIcon} name="lock" />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry
            underlineColorAndroid="transparent"
            onChangeText={(password) => this.setState({ password })}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
