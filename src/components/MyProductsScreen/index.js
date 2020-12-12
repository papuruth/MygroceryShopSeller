import { loaderStartAction } from '@/redux/loaderService/LoaderAction';
import { fetchAllCategoriesAction, fetchProductsAction } from '@/redux/products/ProductsAction';
import { colors } from '@/styles';
import APP_CONSTANTS from '@/utils/appConstants/AppConstants';
import { checkEmpty } from '@/utils/commonFunctions';
import DropDown from '@/utils/reusableComponents/Dropdown';
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, ListItem } from 'react-native-elements';
import {
  CategoriesContainer,
  ProductsContainer,
  StyledContainer,
  StyledFlatList,
  StyledTitle,
} from './styles';

export default class MyProductsScreen extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      selectedCategoryIndex: -1,
    };
    this.fetchCategories(props);
  }

  fetchCategories = (props) => {
    const { dispatch, user } = props;
    dispatch(loaderStartAction());
    dispatch(fetchAllCategoriesAction(user?.uid));
  };

  handleCategorySelect = (index) => {
    this.setState(
      {
        selectedCategoryIndex: index,
      },
      () => {
        if (index > -1) {
          this.fetchProducts(index);
        }
      },
    );
  };

  fetchProducts = (index) => {
    const { categories, user, dispatch } = this.props;
    const categoryOptions = !checkEmpty(categories) ? categories.map((item) => item?.category) : [];
    const category = !checkEmpty(categoryOptions) ? categoryOptions[index] : null;
    if (category) {
      dispatch(loaderStartAction());
      dispatch(fetchProductsAction(user?.uid, category));
    }
  };

  keyExtractor = (item, index) => index.toString();

  showProductDetais = (data) => {
    const { navigation } = this.props;
    navigation.navigate('product-details', { productId: data?._id });
  };

  renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      pad={10}
      containerStyle={{ marginVertical: 5, zIndex: -1, borderRadius: 5 }}
      accessible
      onPressOut={() => this.showProductDetais(item)}
      onPress={() => {}}
    >
      {item.image ? (
        <Avatar rounded size={100} title={item.product} source={{ uri: item.image }} />
      ) : (
        <Avatar
          rounded
          size={100}
          icon={{ name: 'image-broken', type: 'material-community', color: colors.black }}
          iconStyle={{ color: colors.black }}
          avatarStyle={{ backgroundColor: '#ededed', zIndex: -1 }}
        />
      )}
      <ListItem.Content style={{ marginLeft: 20 }}>
        <ListItem.Title>{`Rs. ${item.price}`}</ListItem.Title>
        <ListItem.Subtitle>{item.product}</ListItem.Subtitle>
        <ListItem.Subtitle>{`${item.quantity} ${item.unit}`}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron iconStyle={{ color: colors.black }} />
    </ListItem>
  );

  render() {
    const {
      IMAGES: { background },
    } = APP_CONSTANTS;
    const { selectedCategoryIndex } = this.state;
    const { categories, products } = this.props;
    const categoryOptions = !checkEmpty(categories) ? categories.map((item) => item?.category) : [];
    return (
      <StyledContainer source={background}>
        <CategoriesContainer>
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
        </CategoriesContainer>
        {!checkEmpty(products) && selectedCategoryIndex > -1 ? (
          <ProductsContainer>
            <StyledFlatList
              keyExtractor={this.keyExtractor}
              data={products}
              renderItem={this.renderItem}
            />
          </ProductsContainer>
        ) : (
          selectedCategoryIndex > -1 && (
            <StyledTitle>
              No Products in the catgory {categoryOptions[selectedCategoryIndex]}
            </StyledTitle>
          )
        )}
        {checkEmpty(categoryOptions) && checkEmpty(products) ? (
          <StyledTitle>No Data Found</StyledTitle>
        ) : null}
      </StyledContainer>
    );
  }
}

MyProductsScreen.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.oneOfType([PropTypes.array]).isRequired,
  products: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
