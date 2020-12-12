import { colors } from '@/styles';
import APP_CONSTANTS from '@/utils/appConstants/AppConstants';
import { checkEmpty, currencyFormatter } from '@/utils/commonFunctions';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Alert, FlatList, SafeAreaView } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import { fetchAllOrdersAction } from '@/redux/user/userAction';
import { sendOrderUpdateNotificationAction } from '@/redux/notifications/NotificationActions';
import OrderDetailsFooter from './OrderDetailsFooter';
import OrderDetailsHeader from './OrderDetailsHeader';
import { ItemsDetailsContainer, StyledContainer } from './styles';

export default class OrderDetailsScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectedOrderActionIndex: -1,
      orderActionsData: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Confirm', value: 'Confirmed' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Delivered', value: 'Delivered' },
        { label: 'Cancel', value: 'Cancelled' },
      ],
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const { orderActionsData } = this.state;
    const { params } = route || {};
    const { orderDetails } = params || {};
    const { status } = orderDetails || {};
    const selectedOrderActionIndex = orderActionsData.findIndex((item) => item.value === status);
    this.setState({
      selectedOrderActionIndex,
    });
  }

  keyExtractor = ({ _id }) => _id;

  renderOrderItems = ({ item }) => (
    <ListItem
      bottomDivider
      pad={20}
      key={item?._id}
      containerStyle={{
        marginVertical: 1,
        zIndex: -1,
        borderRadius: 5,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
      linearGradientProps={{
        colors: [colors.primaryGradientStart, colors.primary],
        start: { x: 1, y: 0 },
        end: { x: 0.2, y: 0 },
      }}
      ViewComponent={LinearGradient}
    >
      {item.image ? (
        <Avatar rounded size={50} title={item.product} source={{ uri: item.image }} />
      ) : (
        <Avatar
          rounded
          size={50}
          icon={{ name: 'image-broken', type: 'material-community', color: colors.black }}
          iconStyle={{ color: colors.black }}
          avatarStyle={{ backgroundColor: '#ededed', zIndex: -1 }}
        />
      )}
      <ListItem.Content>
        <ListItem.Title style={{ color: colors.white }}>{item.name}</ListItem.Title>
        <ListItem.Subtitle
          style={{
            color: colors.white,
          }}
        >
          {currencyFormatter(item?.price)} X {item?.itemCount}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Title style={{ color: colors.white, fontWeight: 'bold' }}>
        {currencyFormatter(item?.price * item?.itemCount)}
      </ListItem.Title>
    </ListItem>
  );

  handleSelectedOrderAction = (selectedOrderActionIndex) => {
    this.setState(
      {
        selectedOrderActionIndex,
      },
      () => {
        Alert.alert('Info', 'Are you sure? You want to change the order status.', [
          { text: 'Cancel', onPress: () => {} },
          { text: 'Yes', onPress: this.updateOrderStatus },
        ]);
      },
    );
  };

  getNotifBodyMessage = (orderId, status, username) => {
    if (status === 'Confirmed') {
      return `Hi! ${username ||
        ''} Your order ${orderId.toUpperCase()} has been ${status} by the seller.`;
    }
    if (status === 'In Progress') {
      return `Hi! ${username || ''} Your order ${orderId.toUpperCase()} is ${status}.`;
    }
    if (status === 'Cancelled') {
      return `Hi! ${username ||
        ''} Your order ${orderId.toUpperCase()} has been ${status} by the seller.`;
    }
    return `Hi! ${username || ''} Your order ${orderId.toUpperCase()} has been ${status}.`;
  };

  updateOrderStatus = async () => {
    const { selectedOrderActionIndex, orderActionsData } = this.state;
    if (selectedOrderActionIndex > -1) {
      const { route, dispatch, user, navigation } = this.props;
      const { params } = route || {};
      const { orderDetails } = params || {};
      const { orderId, userDetails } = orderDetails || {};
      const status = orderActionsData[selectedOrderActionIndex];
      if (orderId && status) {
        const res = await firestore()
          .collection('orders')
          .doc(orderId)
          .update({ status: status.value });
        if (!res) {
          Alert.alert('Success', 'Order Status Successfully Updated!!!');
          dispatch(fetchAllOrdersAction(user?.uid));
          if (!checkEmpty(userDetails) && userDetails?.tokens && status?.value !== 'Pending') {
            const { tokens } = userDetails || {};
            const notifPayload = {
              message: {
                tokens,
                notification: {
                  body: this.getNotifBodyMessage(orderId, status?.value, userDetails?.displayName),
                  title: 'Order Status Updated',
                },
                data: {
                  route: 'orders',
                },
                android: {
                  priority: 'HIGH',
                },
              },
            };
            dispatch(
              sendOrderUpdateNotificationAction(notifPayload, orderId, userDetails?.uid, user?.uid),
            );
          }
          navigation.goBack();
        }
      }
    }
  };

  render() {
    const {
      IMAGES: { background },
    } = APP_CONSTANTS;
    const { selectedOrderActionIndex, orderActionsData } = this.state;
    const { route } = this.props;
    const { params } = route || {};
    const { orderDetails } = params || {};
    const { products } = orderDetails || {};
    const actions = orderActionsData.map((item) => item?.label);
    return (
      <StyledContainer source={background} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ItemsDetailsContainer style={{ flex: 1 }}>
            <FlatList
              data={products}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderOrderItems}
              ListHeaderComponent={<OrderDetailsHeader orderDetails={orderDetails} />}
              ListFooterComponent={(
                <OrderDetailsFooter
                  orderDetails={orderDetails}
                  orderActionHandler={this.handleSelectedOrderAction}
                  orderActionsData={actions}
                  selectedOrderActionIndex={selectedOrderActionIndex}
                />
              )}
            />
          </ItemsDetailsContainer>
        </SafeAreaView>
      </StyledContainer>
    );
  }
}

OrderDetailsScreen.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object]).isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
