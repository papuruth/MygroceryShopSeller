import { Button } from '@/utils/reusableComponents';
import firestore from '@react-native-firebase/firestore';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert } from 'react-native';
import { CategoryForm, StyledContainer, StyledTextInput } from './styles';

export default class CategoriesScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      category: '',
      formError: false,
    };
  }

  addNewCategory = async () => {
    try {
      const { category } = this.state;
      const { user } = this.props;
      if (category) {
        const res = await firestore()
          .collection('categories')
          .doc(user?.uid)
          .collection('category')
          .doc(category)
          .set({ category });
        if (!res) {
          Alert.alert('Success', 'Category added successfully.');
          this.setState({
            category: '',
            formError: false,
          });
        } else {
          throw Error();
        }
      } else {
        this.setState({
          formError: true,
        });
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to add new category.');
    }
  };

  render() {
    const { category, formError } = this.state;
    return (
      <StyledContainer>
        <CategoryForm>
          <StyledTextInput
            label="Category Name"
            mode="flat"
            onSubmitEditing={() => cityInputRef.focus()}
            blurOnSubmit={false}
            value={category}
            placeholder="Ex. Fruits &amp; Vegetables"
            error={formError && !category}
            onChangeText={(text) => this.setState({ category: text })}
          />
          <Button caption="Add Category" bordered large onPress={this.addNewCategory} />
        </CategoryForm>
      </StyledContainer>
    );
  }
}

CategoriesScreen.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
