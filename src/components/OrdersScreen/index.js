import { loaderStartAction } from '@/redux/loaderService/LoaderAction';
import { fetchAllOrdersAction } from '@/redux/user/userAction';
import { colors } from '@/styles';
import APP_CONSTANTS from '@/utils/appConstants/AppConstants';
import { checkEmpty, currencyFormatter, dateTimeFormater } from '@/utils/commonFunctions';
import { Button } from '@/utils/reusableComponents';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import LottieView from 'lottie-react-native';
import myOrdersEmpty from '@/assets/animation/my-orders.json';
import { FlatList } from 'react-native';
import { Avatar, ButtonGroup } from 'react-native-elements';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DeliveryInfo,
  FinalAmountContainer,
  ItemDetailsContainer,
  ItemIconContainer,
  ItemPriceContainer,
  NoOrdersContainer,
  OrderDetailsContainer,
  OrderStatusContainer,
  StyledCardActions,
  StyledCardContainer,
  StyledCardContent,
  StyledCardTitle,
  StyledContainer,
  StyledItemDetailsContaner,
  StyledTitle,
} from './styles';

export default class OrdersScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    this.fetchAllOrders(this.props);
  }

  fetchAllOrders = (props) => {
    const { dispatch, user } = props;
    dispatch(loaderStartAction());
    dispatch(fetchAllOrdersAction(user?.uid));
  };

  gotoOrderDetails = (orderDetails) => {
    const { navigation } = this.props;
    navigation.navigate('order-details', { orderDetails });
  };

  keyExtractor = (item) => item?.orderId;

  renderOrders = ({ item }) => {
    return (
      <StyledCardContainer colors={['gray', 'black']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <StyledCardContent>
          <StyledCardTitle>
            <StyledTitle size={18}>
              Placed on, {dateTimeFormater(item?.dateCreated, 'ddd, hh:mm A')}
            </StyledTitle>
          </StyledCardTitle>
          <OrderDetailsContainer>
            <StyledCardTitle>
              <StyledTitle size={18}>Scheduled for, {item?.deliveryDate}</StyledTitle>
            </StyledCardTitle>
            <Divider style={{ backgroundColor: '#fff' }} />
            <DeliveryInfo>
              <Icon name="basket" size={18} style={{ paddingRight: 8 }} color={colors.ERROR} />
              <StyledTitle size={14} bold>
                Delivered by MyGroceryMarket
              </StyledTitle>
            </DeliveryInfo>
            <StyledItemDetailsContaner>
              <ItemIconContainer>
                <Avatar
                  icon={{
                    name: 'store',
                    type: 'material-community',
                    size: 50,
                    color: colors.orange,
                  }}
                  containerStyle={{ backgroundColor: '#FFF496' }}
                  size={50}
                />
              </ItemIconContainer>
              <ItemDetailsContainer>
                <StyledTitle size={18} bold>
                  {item?.distributorDetails?.business || item?.distributorDetails?.name}
                </StyledTitle>
                <StyledTitle size={18}>Delivery charges</StyledTitle>
                <StyledTitle size={18}>Order ID: {item?.orderId}</StyledTitle>
                <OrderStatusContainer>
                  <StyledTitle size={18} style={{ paddingRight: 5 }}>
                    Status: {item?.status}
                  </StyledTitle>
                  {item?.status === 'In Progress' ? (
                    <Icon name="progress-clock" color={colors.orange} size={20} />
                  ) : null}
                  {item?.status === 'Delivered' || item?.status === 'Confirmed' ? (
                    <Icon name="check-circle" color={colors.SUCCESS} size={20} />
                  ) : null}
                </OrderStatusContainer>
              </ItemDetailsContainer>
              <ItemPriceContainer>
                <StyledTitle size={18}>{currencyFormatter(item?.subTotal)}</StyledTitle>
                <StyledTitle
                  style={{ color: item?.deliveryCharges > 0 ? colors.white : colors.SUCCESS }}
                  size={18}
                >
                  {item?.deliveryCharges > 0 ? currencyFormatter(item?.deliveryCharges) : 'Free'}
                </StyledTitle>
              </ItemPriceContainer>
            </StyledItemDetailsContaner>
          </OrderDetailsContainer>
          <FinalAmountContainer>
            <StyledTitle bold size={18}>
              Final paid amount
            </StyledTitle>
            <StyledTitle bold size={18}>
              {currencyFormatter(item?.subTotal)}
            </StyledTitle>
          </FinalAmountContainer>
        </StyledCardContent>
        <StyledCardActions>
          <Button
            style={{ width: '100%' }}
            bgColor={colors.orange}
            caption="View Details"
            onPress={() => this.gotoOrderDetails(item)}
          />
        </StyledCardActions>
      </StyledCardContainer>
    );
  };

  handleScreenChange = (index) => {
    this.setState({
      selectedIndex: index,
    });
  };

  render() {
    const { myOrders, navigation } = this.props;
    const { selectedIndex } = this.state;
    const sortedOrders = !checkEmpty(myOrders)
      ? myOrders.sort((a, b) => b?.dateCreated - a?.dateCreated)
      : [];
    const pendingOrders = !checkEmpty(sortedOrders)
      ? sortedOrders.filter(
          (item) =>
            item?.status === 'Pending' ||
            item?.status === 'Confirmed' ||
            item?.status === 'In Progress',
        )
      : [];
    const deliveredOrders = !checkEmpty(sortedOrders)
      ? sortedOrders.filter((item) => item?.status === 'Delivered')
      : [];
    const cancelledOrders = !checkEmpty(sortedOrders)
      ? sortedOrders.filter((item) => item?.status === 'Cancelled')
      : [];
    let ordersToRender = [];
    if (selectedIndex === 0) {
      ordersToRender = pendingOrders;
    } else if (selectedIndex === 1) {
      ordersToRender = deliveredOrders;
    } else {
      ordersToRender = cancelledOrders;
    }

    const {
      IMAGES: { background },
    } = APP_CONSTANTS;
    return (
      <StyledContainer source={background}>
        {!checkEmpty(myOrders) ? (
          <>
            <ButtonGroup
              buttons={['Pending Orders', 'Delivered Orders', 'Cancelled Orders']}
              selectedIndex={selectedIndex}
              containerStyle={{ width: '100%' }}
              onPress={this.handleScreenChange}
            />

            {!checkEmpty(ordersToRender) ? (
              <FlatList
                style={{ width: '100%' }}
                data={ordersToRender}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderOrders}
              />
            ) : (
              <StyledTitle style={{ marginTop: 40 }} bold>
                No Data Found
              </StyledTitle>
            )}
          </>
        ) : (
          <NoOrdersContainer>
            <LottieView source={myOrdersEmpty} autoPlay style={{ height: 300, marginBottom: 20 }} />
            <StyledTitle size={18}>No Orders to display</StyledTitle>
            <StyledTitle size={18}>Please order products to see them here.</StyledTitle>
            <Button
              style={{ marginTop: 50 }}
              caption="Start Shopping"
              bordered
              onPress={() => navigation.navigate('home')}
            />
          </NoOrdersContainer>
        )}
      </StyledContainer>
    );
  }
}

OrdersScreen.propTypes = {
  myOrders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
