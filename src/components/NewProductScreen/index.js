import { loaderStartAction, loaderStopAction } from '@/redux/loaderService/LoaderAction';
import { fetchAllCategoriesAction } from '@/redux/products/ProductsAction';
import { checkEmpty, imageSelector } from '@/utils/commonFunctions';
import { Button } from '@/utils/reusableComponents';
import DropDown from '@/utils/reusableComponents/Dropdown';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import {
  ProductForm,
  ProductImageContainer,
  ProgressBarContainer,
  StyledContainer,
  StyledProductAvatar,
  StyledTextInput,
  StyledTitle,
} from './styles';

export default class NewProductScreen extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      product: '',
      quantity: '',
      price: '',
      selectedUnitIndex: -1,
      totalItems: '',
      selectedCategoryIndex: -1,
      formError: false,
      productImage: '',
      uploading: false,
      transferred: 0,
    };
    this.initialState = this.state;
    this.fetchCategories(props);
    this.unitOptions = ['kg', 'g', 'L', 'mL', 'units'];
  }

  fetchCategories = (props) => {
    const { dispatch, user } = props;
    dispatch(loaderStartAction());
    dispatch(fetchAllCategoriesAction(user?.uid));
  };

  validateForm = () => {
    const {
      product,
      selectedCategoryIndex,
      quantity,
      price,
      selectedUnitIndex,
      totalItems,
    } = this.state;
    if (
      product &&
      selectedCategoryIndex > -1 &&
      quantity &&
      price &&
      selectedUnitIndex > -1 &&
      totalItems
    ) {
      this.setState({
        formError: false,
      });
      return true;
    }
    this.setState({
      formError: true,
    });
    return false;
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

  addNewProduct = async () => {
    const { user, categories, dispatch } = this.props;
    try {
      const {
        product,
        selectedCategoryIndex,
        quantity,
        price,
        selectedUnitIndex,
        totalItems,
        productImage,
      } = this.state;
      const formValid = this.validateForm();
      if (formValid) {
        const categoryOptions = !checkEmpty(categories)
          ? categories.map((item) => item?.category)
          : [];
        const productImageURL = await this.uploadImage(
          productImage,
          `${product}_${categoryOptions}_${Date.now()}.png`,
        );
        const productData = {
          product,
          category: categoryOptions[selectedCategoryIndex],
          quantity,
          price,
          unit: this.unitOptions[selectedUnitIndex],
          total: totalItems,
          image: productImageURL,
        };
        dispatch(loaderStartAction());
        const res = await firestore()
          .collection('products')
          .doc(user?.uid)
          .collection('product')
          .doc()
          .set(productData);
        if (!res) {
          Alert.alert('Success', 'Product added successfully.');
          this.setState(this.initialState);
          dispatch(loaderStopAction());
        }
      }
    } catch (e) {
      Alert.alert('Failure', 'Failed to add product. Please try again.');
      dispatch(loaderStopAction());
    }
  };

  handleCategorySelect = (index) => {
    this.setState({
      selectedCategoryIndex: index,
    });
  };

  handleUnitsSelect = (index) => {
    this.setState({
      selectedUnitIndex: index,
    });
    this.totalItemsRef.focus();
  };

  selectPhoto = async () => {
    const res = await imageSelector();
    this.setState(
      {
        productImage: res,
      },
      () => this.productRef.focus(),
    );
  };

  render() {
    const {
      product,
      selectedCategoryIndex,
      quantity,
      price,
      selectedUnitIndex,
      totalItems,
      formError,
      uploading,
      transferred,
      productImage,
    } = this.state;
    const { categories } = this.props;
    const categoryOptions = !checkEmpty(categories) ? categories.map((item) => item?.category) : [];
    return (
      <StyledContainer>
        <ProductForm>
          {!checkEmpty(categoryOptions) ? (
            <DropDown
              items={categoryOptions}
              onSelect={(index) => this.handleCategorySelect(index)}
              selectedIndex={selectedCategoryIndex}
              placeholder="Select Category"
              borderColor="#fff"
              height={50}
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
              outerColor="#fff"
              color="#000"
            />
          ) : null}
          {selectedCategoryIndex > -1 ? (
            <>
              <ProductImageContainer>
                {!productImage ? (
                  <Pressable
                    onPress={this.selectPhoto}
                    android_ripple={{ color: '#000', radius: 360 }}
                  >
                    <StyledProductAvatar icon="image" size={100} />
                  </Pressable>
                ) : (
                  <Avatar.Image source={{ uri: productImage }} size={100} />
                )}
              </ProductImageContainer>
              <StyledTextInput
                label="Product Name"
                mode="flat"
                onSubmitEditing={() => this.priceRef.focus()}
                blurOnSubmit={false}
                value={product}
                ref={(pRef) => {
                  this.productRef = pRef;
                }}
                onChangeText={(text) => this.setState({ product: text })}
              />
              <StyledTextInput
                label="Price"
                mode="flat"
                onSubmitEditing={() => this.quantityRef.focus()}
                blurOnSubmit={false}
                value={price}
                ref={(priceRef) => {
                  this.priceRef = priceRef;
                }}
                onChangeText={(text) => this.setState({ price: text })}
              />
              <StyledTextInput
                label="Quantity"
                mode="flat"
                blurOnSubmit={false}
                value={quantity}
                ref={(qtyRef) => {
                  this.quantityRef = qtyRef;
                }}
                onChangeText={(text) => this.setState({ quantity: text })}
              />
              <DropDown
                items={this.unitOptions}
                onSelect={(index) => this.handleUnitsSelect(index)}
                selectedIndex={selectedUnitIndex}
                placeholder="Select Product Unit"
                borderColor="#fff"
                height={50}
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
                outerColor="#fff"
                color="#000"
              />
              <StyledTextInput
                label="Total Nos. of Item"
                mode="flat"
                blurOnSubmit
                value={totalItems}
                ref={(totalRef) => {
                  this.totalItemsRef = totalRef;
                }}
                onChangeText={(text) => this.setState({ totalItems: text })}
              />
            </>
          ) : null}
          {formError ? (
            <StyledTitle style={{ color: 'red' }}>*Please fill all the fields.</StyledTitle>
          ) : null}
          {uploading && (
            <ProgressBarContainer>
              <Progress.Bar progress={transferred} width={null} />
            </ProgressBarContainer>
          )}
          <Button caption="Add Product" bordered large onPress={this.addNewProduct} />
        </ProductForm>
      </StyledContainer>
    );
  }
}

NewProductScreen.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  categories: PropTypes.oneOfType([PropTypes.array]).isRequired,
  dispatch: PropTypes.func.isRequired,
};
