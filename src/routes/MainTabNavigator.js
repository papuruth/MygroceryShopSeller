/* eslint-disable react/no-unused-prop-types */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles';
import tabNavigationData from './TabNavigationData';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
  },
  tabBarIconFocused: {
    tintColor: colors.PRIMARY,
  },
  tabBarIconReleased: {
    tintColor: colors.black
  }
});

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      {tabNavigationData.map((item, idx) => (
        <Tab.Screen
          key={`tab_item${idx + 1}`}
          name={item.name}
          component={item.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                <Image resizeMode="contain" source={item.icon} style={[styles.tabBarIcon, focused ? styles.tabBarIconFocused : styles.tabBarIconReleased]} />
              </View>
            ),
            tabBarLabel: ({ focused }) => <Text style={{ fontSize: 12, color: focused ? colors.primary : colors.gray }}>{item.name}</Text>,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

BottomTabs.defaultProps = {
  focused: undefined,
};

BottomTabs.propTypes = {
  focused: PropTypes.bool,
};