import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  registerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
      
  }
});
export default class RegisterScreen extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.registerContainer}>
        <View style={styles.header}>
          <Text>Register Screen</Text>
        </View>
      </SafeAreaView>
    );
  }
}
