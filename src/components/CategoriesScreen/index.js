import { imageSelector } from '@/utils/commonFunctions';
import { Button } from '@/utils/reusableComponents';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import { ProgressBarContainer } from '../NewProductScreen/styles';
import { CategoryForm, CategoryImageContainer, StyledContainer, StyledTextInput } from './styles';

export default class CategoriesScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      category: '',
      formError: false,
      categoryImage: '',
      uploading: false,
      transferred: 0,
    };
    this.initialState = this.state;
  }

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

  addNewCategory = async () => {
    try {
      const { category, categoryImage } = this.state;
      const { user } = this.props;
      if (!categoryImage) {
        Alert.alert('Info', 'Please select an image for the category.');
        return false;
      }
      if (!category) {
        Alert.alert('Info', 'Category name cannot be empty.');
        return false;
      }
      const photoURL = categoryImage
        ? await this.uploadImage(categoryImage, `${category}.png`)
        : null;
      if (category && photoURL) {
        const docRef = firestore()
          .collection('categories')
          .doc();
        const categoryPayload = {
          _id: docRef.id,
          userId: user?.uid,
          image: photoURL,
          category,
        };
        const res = await docRef.set(categoryPayload);
        if (!res) {
          Alert.alert('Success', 'Category added successfully.');
          this.setState(this.initialState);
        } else {
          throw Error();
        }
      } else {
        Alert.alert('Info', 'Please select an image for the category.');
        this.setState({
          formError: true,
        });
      }
      return false;
    } catch (e) {
      Alert.alert('Error', 'Failed to add new category.');
      return false;
    }
  };

  selectPhoto = async () => {
    try {
      const res = await imageSelector();
      if (res) {
        this.setState(
          {
            categoryImage: res,
          },
          () => this.categoryRef.focus(),
        );
      }
    } catch (e) {
      Alert.alert('Failure', e?.message);
    }
  };

  render() {
    const { category, formError, categoryImage, uploading, transferred } = this.state;
    return (
      <StyledContainer>
        <CategoryForm>
          <CategoryImageContainer>
            {!categoryImage ? (
              <Pressable onPress={this.selectPhoto} android_ripple={{ color: '#000', radius: 360 }}>
                <Avatar.Icon icon="image" size={150} />
              </Pressable>
            ) : (
              <Avatar.Image source={{ uri: categoryImage }} size={150} />
            )}
          </CategoryImageContainer>
          <StyledTextInput
            label="Category Name"
            mode="flat"
            onSubmitEditing={() => this.addNewCategory()}
            blurOnSubmit
            value={category}
            placeholder="Ex. Fruits &amp; Vegetables, Personal Care etc."
            ref={(catRef) => {
              this.categoryRef = catRef;
            }}
            error={formError && !category}
            onChangeText={(text) => this.setState({ category: text })}
          />
          {uploading && (
            <ProgressBarContainer>
              <Progress.Bar progress={transferred} width={null} />
            </ProgressBarContainer>
          )}
          <Button
            caption="Add Category"
            bordered
            large
            onPress={this.addNewCategory}
            loading={uploading}
          />
        </CategoryForm>
      </StyledContainer>
    );
  }
}

CategoriesScreen.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
