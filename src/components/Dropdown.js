import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Text, TouchableHighlight } from 'react-native';

import { colors } from '../styles';

class DropDown extends React.Component {
  static defaultProps = {
    placeholder: 'Please Select experience',
    selectedIndex: -1,
    color: colors.primary,
    borderColor: colors.primary,
  };

  state = {
    isOpened: false,
  };

  _openModal = () => {
    this.setState({ isOpened: true });
  };

  _closeModal = () => {
    this.setState({ isOpened: false });
  };

  _renderRow = (text, color) => (
    <TouchableHighlight underlayColor="lightgray">
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text style={{ color }}>{text}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    const {
      items,
      color,
      onSelect,
      style,
      borderColor,
      selectedIndex,
      placeholder,
    } = this.props;
    return (
      <ModalDropdown
        options={items}
        onDropdownWillShow={this._openModal}
        onDropdownWillHide={this._closeModal}
        style={style}
        dropdownStyle={{
          shadowColor: 'blue',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 5,
          shadowOpacity: 1.0,
        }}
        adjustFrame={(params) => {
          // eslint-disable-next-line no-param-reassign
          params.left = 30;
          // eslint-disable-next-line no-param-reassign
          params.right = 30;
          return params;
        }}
        renderRow={text => this._renderRow(text, color)}
        onSelect={onSelect}
      >
        <View style={[styles.container, { borderColor }]}>
          <Text style={{ color }}>
            {selectedIndex > -1 && items[selectedIndex]
              ? items[selectedIndex]
              : placeholder}
          </Text>
          <Icon
            name={this.state.isOpened ? 'angle-up' : 'angle-down'}
            color={color}
            size={20}
            style={styles.icon}
          />
        </View>
      </ModalDropdown>
    );
  }
}

const styles = {
  container: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    borderRadius: 5,
  },
  icon: {
    marginLeft: 10,
  },
};

export default DropDown;
