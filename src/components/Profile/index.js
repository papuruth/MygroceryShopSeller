import PropTypes from 'prop-types';
import React from 'react';
import { Image, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Avatar, Card, Divider, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Verified from '../../assets/icons/verified.svg';
import { loaderStartAction } from '../../redux/loaderService/LoaderAction';
import { getUserDataAction, getLocationAction } from '../../redux/user/userAction';
import { colors } from '../../styles';
import { checkEmpty, dateTimeFormater, equalityChecker } from '../../utils/commonFunctions';
import EditProfile from './EditProfile';
import { styles } from './styles';

export default class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      showEditProfile: false,
      section: '',
    };
    this.fetchUserDetails();
  }

  componentDidUpdate(prevProps) {
    const { userDetails, updateAddress, addAddress } = this.props;
    if (!checkEmpty(userDetails)) {
      this.updateState();
    }
    if (!equalityChecker(addAddress, prevProps.addAddress) && addAddress?.status) {
      this.fetchUserDetails();
    }
  }

  fetchUserDetails = () => {
    const { dispatch } = this.props;
    dispatch(loaderStartAction());
    dispatch(getUserDataAction());
    dispatch(getLocationAction());
  };

  updateState = () => {
    this.setState({
      refreshing: false,
    });
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    const { dispatch } = this.props;
    dispatch(loaderStartAction());
    dispatch(getUserDataAction());
  };

  editProfile = (section) => {
    this.setState({
      showEditProfile: true,
      section,
    });
  };

  closeEditProfileHandler = () => {
    this.setState({
      showEditProfile: false,
      section: '',
    });
  };

  render() {
    const { refreshing, showEditProfile, section } = this.state;
    const {
      userDetails,
      locations,
      navigation,
      userProfileUpdateStatus,
      userProfileUpdateError,
      dispatch,
    } = this.props;
    const {
      id,
      name,
      email,
      phone,
      age,
      image,
      location,
      address,
      employeeData,
      dob,
    } = !checkEmpty(userDetails) ? userDetails : {};
    const {
      experience,
      jobStartDate,
      aadharFront,
      aadharBack,
      rating,
      perDayCharge,
      occupation,
      verified,
    } = !checkEmpty(employeeData) ? employeeData : {};
    const experienceModified = experience ? experience.split('.') : [];
    const exprInYears = !checkEmpty(experienceModified) && parseInt(experienceModified[0], 10) > 1 ?  `${experienceModified[0]} Years` : `${experienceModified[0]} Year`;
    const exprInMonths = !checkEmpty(experienceModified) && parseInt(experienceModified[1], 10) > 1 ?  `${experienceModified[1]} Months` : `${experienceModified[1]} Month`;
    return (
      <SafeAreaView style={styles.profile} key={id}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
        >
          <View style={styles.profileDisplayContainer}>
            <Card style={styles.personalInfoCard}>
              <Card.Title
                title="Basic Details"
                style={styles.cardTitle}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="square-edit-outline"
                    onPress={() => this.editProfile('Basic Details')}
                  />
                )}
              />
              <Divider style={styles.dividerStyle} />
              <Card.Content style={styles.personalInfoContent}>
                <View style={styles.imageContainer}>
                  {image ? (
                    <Avatar.Image size={120} source={{ uri: image }} />
                  ) : (
                    <Avatar.Text size={120} label={name && name.slice(0, 1)} />
                  )}
                </View>
                <View style={styles.personalInfoContainer}>
                  <View style={styles.personalInfo}>
                    <Icon name="account" size={20} />
                    <Text style={styles.personalInfoText}>{name}</Text>
                    {verified && <Verified style={styles.verifiedUser} />}
                  </View>
                  <View style={styles.personalInfo}>
                    <Icon name="email" size={20} />
                    <Text style={styles.personalInfoText}>{email}</Text>
                  </View>
                  <View style={styles.personalInfo}>
                    <Icon name="phone" size={20} />
                    <Text style={styles.personalInfoText}>{phone}</Text>
                  </View>
                  <View style={styles.personalInfo}>
                    <Icon name="calendar" size={20} />
                    <Text style={styles.personalInfoText}>
                      {dateTimeFormater(dob, 'DD/MM/YYYY')} 
                      {' '}
                      {`(${age})`}
                    </Text>
                  </View>
                  <View style={styles.personalInfo}>
                    <Icon name="map-marker" size={20} />
                    <Text style={styles.personalInfoText}>
                      {location ? location?.locationName : 'N/A'}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
            <Card style={styles.addressCard}>
              <Card.Title
                title="Address"
                style={styles.cardTitle}
                right={(props) => (
                  <View style={styles.addressActionIcon}>
                    <IconButton
                      {...props}
                      icon="shape-square-plus"
                      onPress={() => this.editProfile('Address')}
                    />
                    <IconButton
                      {...props}
                      icon="square-edit-outline"
                      onPress={() => navigation.navigate('edit-address', {address})}
                    />
                  </View>
                )}
              />
              <Divider style={styles.dividerStyle} />
              {!checkEmpty(address) ? (
                address.slice(0, 1).map(({ addressId, buildingName, city, postalCode, state, street }) => (
                  <Card.Content style={styles.cardContent} key={addressId}>
                    <View style={styles.addressInfo}>
                      <Text style={styles.label}>Building Name:</Text>
                      <Text style={styles.textContent}>{buildingName || 'N/A'}</Text>
                    </View>
                    <View style={styles.addressInfo}>
                      <Text style={styles.label}>City:</Text>
                      <Text style={styles.textContent}>{city || 'N/A'}</Text>
                    </View>
                    <View style={styles.addressInfo}>
                      <Text style={styles.label}>Postal Code:</Text>
                      <Text style={styles.textContent}>{postalCode || 'N/A'}</Text>
                    </View>
                    <View style={styles.addressInfo}>
                      <Text style={styles.label}>State:</Text>
                      <Text style={styles.textContent}>{state || 'N/A'}</Text>
                    </View>
                    <View style={styles.addressInfo}>
                      <Text style={styles.label}>Street:</Text>
                      <Text style={styles.textContent}>{street || 'N/A'}</Text>
                    </View>
                  </Card.Content>
                ))
              ) : (
                <Card.Content style={styles.cardContent}>
                  <View style={styles.noAddressFound}>
                    <Text style={styles.label}>
                      No address found, please use add button to add an address.
                    </Text>
                  </View>
                </Card.Content>
              )}
            </Card>
            <Card style={styles.professionalInfoCard}>
              <Card.Title
                title="Professional Details"
                style={styles.cardTitle}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="square-edit-outline"
                    onPress={() => this.editProfile('Professional Details')}
                  />
                )}
              />
              <Divider style={styles.dividerStyle} />
              <Card.Content style={styles.cardContent}>
                <View style={styles.professionalInfo}>
                  <Text style={styles.label}>Ocupation</Text>
                  <Text style={styles.textContent}>{occupation || 'N/A'}</Text>
                </View>
                <View style={styles.professionalInfo}>
                  <Text style={styles.label}>Job Start Date</Text>
                  <Text style={styles.textContent}>
                    {jobStartDate ? dateTimeFormater(jobStartDate, 'DD/MM/YYYY') : 'N/A'}
                  </Text>
                </View>
                <View style={styles.professionalInfo}>
                  <Text style={styles.label}>Experience:</Text>
                  <Text style={styles.textContent}>{experience ? [exprInYears, exprInMonths].join(' ') : 'N/A'}</Text>
                </View>
                <View style={styles.professionalInfo}>
                  <Text style={styles.label}>Per Day Charge:</Text>
                  <Text style={styles.textContent}>{perDayCharge || 'N/A'}</Text>
                </View>
                <View style={styles.professionalInfo}>
                  <Text style={styles.label}>Rating:</Text>
                  {rating ? (
                    Array(rating)
                      .fill()
                      .map(() => (
                        <Text style={styles.textContent}>
                          <Icon name="star" size={20} color={colors.yellow} />
                        </Text>
                      ))
                  ) : (
                    <Text style={styles.textContent}>N/A</Text>
                  )}
                  {rating &&
                    Array(5 - rating)
                      .fill()
                      .map(() => (
                        <Text style={styles.textContent}>
                          <Icon name="star-outlined" size={20} color={colors.yellow} />
                        </Text>
                      ))}
                </View>
              </Card.Content>
            </Card>
            <Card style={styles.documentCard}>
              <Card.Title
                title="Documents"
                style={styles.cardTitle}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="square-edit-outline"
                    onPress={() => this.editProfile('Documents')}
                  />
                )}
              />
              <Divider style={styles.dividerStyle} />
              <Card.Content style={styles.cardContent}>
                <View style={styles.documentInfo}>
                  <Text style={styles.label}>Aadhaar Front:</Text>
                  {aadharFront ? (
                    <Image source={{ uri: aadharFront }} style={styles.documentInfoImage} />
                  ) : (
                    <Text style={styles.textContent}>N/A</Text>
                  )}
                </View>
                <View style={styles.documentInfo}>
                  <Text style={styles.label}>Aadhaar Back:</Text>
                  {aadharBack ? (
                    <Image source={{ uri: aadharBack }} style={styles.documentInfoImage} />
                  ) : (
                    <Text style={styles.textContent}>N/A</Text>
                  )}
                </View>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
        <EditProfile
          visible={showEditProfile}
          section={section}
          data={userDetails}
          locations={locations}
          dispatch={dispatch}
          userProfileUpdateStatus={userProfileUpdateStatus}
          userProfileUpdateError={userProfileUpdateError}
          closeEditProfileHandler={this.closeEditProfileHandler}
        />
      </SafeAreaView>
    );
  }
}

Profile.propTypes = {
  userProfileUpdateStatus: PropTypes.oneOfType([PropTypes.object]).isRequired,
  userProfileUpdateError: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  locations: PropTypes.oneOfType([PropTypes.array]).isRequired,
  userDetails: PropTypes.oneOfType([PropTypes.object]).isRequired,
  updateAddress: PropTypes.oneOfType([PropTypes.object]).isRequired,
  addAddress: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
