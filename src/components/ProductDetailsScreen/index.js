import { loaderStartAction, loaderStopAction } from '@/redux/loaderService/LoaderAction';
import { fetchProductDetailsAction, fetchProductsAction } from '@/redux/products/ProductsAction';
import { colors } from '@/styles';
import APP_CONSTANTS from '@/utils/appConstants/AppConstants';
import { checkEmpty } from '@/utils/commonFunctions';
import { Button } from '@/utils/reusableComponents';
import Rating from '@/utils/reusableComponents/Ratings';
import firestore from '@react-native-firebase/firestore';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, Alert, View } from 'react-native';

import { Avatar, ButtonGroup, Divider } from 'react-native-elements';
import { Dialog, IconButton, List, Portal } from 'react-native-paper';
import RenderProductEditForm from './RenderProductEditForm';
import {
  ProductDetailsAction,
  ProductDetailsContainer,
  ProductDetailsContent,
  ProductDetailsLeft,
  ProductDetailsRight,
  ProductExtraDetails,
  ProductImageContainer,
  ScrollContainer,
  StyledContainer,
  StyledImage,
  StyledSubtitle,
  StyledTitle,
  styles,
} from './styles';

export default class ProductDetailsScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      tabsSelected: 0,
      expandedList: new Map(),
      editFormActive: false,
      uploading: false,
      transferred: 0,
      productData: {},
      newImage: '',
    };
  }

  componentDidMount() {
    this.fetchProductDetails(this.props);
  }

  fetchProductDetails = (props) => {
    const { route, dispatch } = props;
    const { params } = route || {};
    const { productId } = params || {};
    dispatch(loaderStartAction());
    dispatch(fetchProductDetailsAction(productId));
  };

  handleUserInput = (name, value) => {
    this.setState(
      (state) => ({
        productData: Object.assign(state.productData, { [name]: value }),
      }),
      this.forceUpdate(),
    );
  };

  setPhoto = (res) => {
    this.setState(
      (state) => ({
        productData: Object.assign(state.productData, { image: res }),
        newImage: res,
      }),
      this.forceUpdate(),
    );
  };

  keyExtractor = (item, index) => index.toString();

  handlePress = (item) => {
    this.setState((state) => {
      const mapToObj = Object.fromEntries(state.expandedList);
      if (!checkEmpty(mapToObj)) {
        Object.keys(mapToObj).forEach((k) => {
          if (k === item) {
            if (mapToObj[k]) {
              Object.assign(mapToObj, { [k]: false });
            } else {
              Object.assign(mapToObj, { [k]: true });
            }
          } else if (!(item in mapToObj)) {
            Object.assign(mapToObj, { [item]: true });
          } else {
            Object.assign(mapToObj, { [k]: false });
          }
        });
      } else {
        Object.assign(mapToObj, { [item]: true });
      }
      return {
        expandedList: new Map(Object.entries(mapToObj)),
      };
    }, this.forceUpdate());
  };

  deleteProduct = async ({ _id, category }) => {
    const { user, navigation, dispatch } = this.props;
    try {
      const res = await firestore()
        .collection('products')
        .doc(user?.uid)
        .collection('product')
        .doc(_id)
        .delete();
      if (!res) {
        Alert.alert('Success', 'Product deleted successfully.');
        dispatch(fetchProductsAction(user?.uid, category));
        navigation.navigate('products');
      }
    } catch (e) {
      Alert.alert('Failure', e?.message);
    }
  };

  renderProductEditFrom = (data) => {
    if (!checkEmpty(data)) {
      const { features } = data || {};
      const filteredFeilds = { description: '', key_features: '' };
      if (!checkEmpty(features)) {
        features
          .filter((field) => field.key === 'Description' || field.key === 'Key Features')
          .forEach((item) => {
            if (item.key === 'Description') {
              Object.assign(filteredFeilds, { description: item.value });
            }
            if (item.key === 'Key Features') {
              Object.assign(filteredFeilds, { key_features: item.value });
            }
            return false;
          });
      }
      this.setState({
        productData: { ...data, ...filteredFeilds },
        editFormActive: true,
      });
    }
  };

  hideDialog = () => {
    this.setState({
      editFormActive: false,
    });
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

  saveProductDetails = async () => {
    const { dispatch, user } = this.props;
    const {
      APP_MESSAGES: { PRODUCT_DISCLAIMER },
    } = APP_CONSTANTS;
    try {
      const { newImage, productData } = this.state;
      let photoUrl = null;
      if (newImage) {
        photoUrl = await this.uploadImage(
          newImage,
          `${productData?.product}_${productData?.category}_${Date.now()}.png`,
        );
      }
      if (photoUrl) {
        Object.assign(productData, { image: photoUrl });
      }
      if (!checkEmpty(productData)) {
        const {
          _id,
          product,
          price,
          quantity,
          unit,
          total,
          features,
          category,
          image,
          description,
          key_features,
        } = productData;
        let updatedFeatures = [];
        if (!checkEmpty(features)) {
          updatedFeatures = features.map(
            (item) =>
              Object.keys(item).map((k) => {
                if (item[k] === 'Description') {
                  return Object.assign(item, { value: description });
                }
                if (item[k] === 'Key Features') {
                  return Object.assign(item, { value: key_features });
                }
                return item;
              })[0],
          );
        }
        if (checkEmpty(features)) {
          updatedFeatures = [
            { key: 'Description', value: description },
            { key: 'Key Features', value: key_features },
            {
              key: 'Disclaimer',
              value: PRODUCT_DISCLAIMER,
            },
            { key: 'Seller', value: 'Pariso' },
          ];
        }
        const updatePayload = {
          _id,
          product,
          price,
          quantity,
          unit,
          total,
          features: updatedFeatures,
          category,
          image,
        };
        dispatch(loaderStartAction());
        const res = await firestore()
          .collection('products')
          .doc(user?.uid)
          .collection('product')
          .doc(productData?._id)
          .update(updatePayload);
        if (!res) {
          Alert.alert('Success', 'Product updated successfully');
          dispatch(fetchProductsAction(user?.uid, productData?.category));
          dispatch(loaderStopAction());
          this.fetchProductDetails(this.props);
          this.hideDialog();
        }
      }
    } catch (e) {
      Alert.alert('Failure', 'Product update failed.');
      dispatch(loaderStopAction());
    }
  };

  render() {
    const { productDetails } = this.props;
    const {
      tabsSelected,
      expandedList,
      editFormActive,
      productData,
      uploading,
      transferred,
    } = this.state;
    const { image, _id, product, price, quantity, unit, features, ratings } = productDetails || {};
    // Render blank page while product details is being etched
    if (checkEmpty(productDetails)) return null;
    const {
      IMAGES: { background },
    } = APP_CONSTANTS;
    return (
      <StyledContainer source={background} key={_id}>
        <ProductDetailsContainer>
          <ScrollContainer
            contentContainerStyle={{
              alignItems: 'center',
            }}
          >
            <ProductDetailsAction>
              <IconButton
                color={colors.ERROR}
                icon="delete"
                onPress={() => this.deleteProduct(productDetails)}
              />
              <IconButton
                color={colors.white}
                icon="square-edit-outline"
                onPress={() => this.renderProductEditFrom(productDetails)}
              />
            </ProductDetailsAction>
            <ProductImageContainer>
              {image ? (
                <StyledImage source={{ uri: image }} />
              ) : (
                <Avatar
                  size={200}
                  icon={{ name: 'image-broken', type: 'material-community', color: colors.black }}
                  iconStyle={{ color: colors.black }}
                  avatarStyle={{ backgroundColor: '#ededed', zIndex: -1 }}
                />
              )}
            </ProductImageContainer>
            <Divider style={{ height: 1, backgroundColor: colors.white, width: '100%' }} />
            <ProductDetailsContent>
              <ProductDetailsLeft>
                <StyledTitle size={20}>{product}</StyledTitle>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <StyledSubtitle>Product MRP: </StyledSubtitle>
                  <StyledTitle size={16}>Rs. {price}</StyledTitle>
                </View>
                <StyledSubtitle>(inclusive of all taxes)</StyledSubtitle>
                <StyledSubtitle>Unit: {`${quantity} ${unit}`}</StyledSubtitle>
              </ProductDetailsLeft>
              <ProductDetailsRight>
                <Rating
                  startingValue={5}
                  totalRating={ratings.totalRatings}
                  showRating
                  isDisabled
                  starSize={20}
                  onFinishRating={() => {}}
                />
              </ProductDetailsRight>
            </ProductDetailsContent>
            {!checkEmpty(features) ? (
              <ProductExtraDetails>
                <ButtonGroup
                  buttons={['Highlights']}
                  containerStyle={{ height: 50, width: '100%' }}
                  selectedIndex={tabsSelected}
                />
                <List.Section style={{ width: '100%' }}>
                  {features.map((item) => (
                    <List.Accordion
                      key={item.key}
                      title={item.key}
                      titleStyle={{ color: colors.white }}
                      expanded={expandedList.get(item.key)}
                      onPress={() => this.handlePress(item.key)}
                    >
                      <List.Item
                        title={item.value}
                        titleStyle={{ color: colors.black }}
                        titleNumberOfLines={4}
                      />
                    </List.Accordion>
                  ))}
                </List.Section>
              </ProductExtraDetails>
            ) : null}
          </ScrollContainer>
        </ProductDetailsContainer>
        <Portal>
          <Dialog
            visible={editFormActive}
            dismissable={false}
            style={{ justifyContent: 'flex-end' }}
          >
            <ScrollView
              style={{
                width: '100%',
                height: 'auto',
              }}
            >
              <Dialog.Title>Edit Product</Dialog.Title>
              <Dialog.Content style={{ width: '100%' }}>
                <RenderProductEditForm
                  data={productData}
                  uploading={uploading}
                  transferred={transferred}
                  onChange={this.handleUserInput}
                  setPhotoSelected={this.setPhoto}
                />
              </Dialog.Content>
              <Dialog.Actions style={{ width: '100%' }}>
                <Button
                  rounded
                  style={styles.editProductButton}
                  onPress={this.hideDialog}
                  caption="Cancel"
                />
                <Button
                  rounded
                  style={styles.editProductButton}
                  onPress={this.saveProductDetails}
                  caption="Done"
                />
              </Dialog.Actions>
            </ScrollView>
          </Dialog>
        </Portal>
      </StyledContainer>
    );
  }
}

ProductDetailsScreen.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired,
  productDetails: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
