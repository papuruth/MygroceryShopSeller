import PropTypes from 'prop-types';
import React from 'react';
import { Image, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Avatar, Card, Divider, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Verified from '../../assets/icons/verified.svg';
import { loaderStartAction } from '../../redux/loaderService/LoaderAction';
import { getUserDataAction } from '../../redux/user/userAction';
import { colors } from '../../styles';
import { checkEmpty, dateTimeFormater } from '../../utils/commonFunctions';
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
    const { dispatch } = this.props;
    dispatch(getUserDataAction());
    dispatch(loaderStartAction());
  }

  componentDidUpdate() {
    const { userDetails } = this.props;
    if (!checkEmpty(userDetails)) {
      this.updateState();
    }
  }

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
  }

  render() {
    const { refreshing, showEditProfile, section } = this.state;
    const { userDetails } = this.props;
    const { id, name, email, phone, age, image, location, address, employeeData, dob } = !checkEmpty(userDetails) ? userDetails : {};
    const { experience, jobStartDate, aadharFront, aadharBack, rating, perDayCharge, occupation, verified } = !checkEmpty(employeeData) ? employeeData : {};
    const { buildingName, city, postalCode, state, street } = !checkEmpty(address) ? address : {};
    return (
      <SafeAreaView style={styles.profile} key={id}>
        <ScrollView contentContainerStyle={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}>
          <View style={styles.profileDisplayContainer}>
            <Card style={styles.personalInfoCard}>
              <Card.Title title="Basic Details" style={styles.cardTitle} right={(props) => <IconButton {...props} icon="square-edit-outline" onPress={() => this.editProfile('Basic Details')} />} />
              <Divider style={styles.dividerStyle} />
              <Card.Content style={styles.personalInfoContent}>
                <View style={styles.imageContainer}>{image ? <Avatar.Image size={120} source={image} /> : <Avatar.Text size={120} label={name && name.slice(0, 1)} />}</View>
                <View style={styles.personalInfoContainer}>
                  <View style={styles.personalInfo}>
                    <Icon name="account" size={20} />
                    <Text style={styles.personalInfoText}>{name}</Text>
                    {verified && <Verified style={styles.verifiedUser}/>}
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
                    <Text style={styles.personalInfoText}>{location ? location?.locationName : 'N/A'}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
            <Card style={styles.addressCard}>
              <Card.Title title="Address" style={styles.cardTitle} right={(props) => <IconButton {...props} icon="square-edit-outline" onPress={() => this.editProfile('Address')} />} />
              <Divider style={styles.dividerStyle} />
              <Card.Content style={styles.cardContent}>
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
            </Card>
            <Card style={styles.professionalInfoCard}>
              <Card.Title
                title="Professional Details"
                style={styles.cardTitle}
                right={(props) => <IconButton {...props} icon="square-edit-outline" onPress={() => this.editProfile('Professional Details')} />}
              />
              <Divider style={styles.dividerStyle} />
              <Card.Content style={styles.cardContent}>
                <View style={styles.professionalInfo}>
                  <Text style={styles.label}>Ocupation</Text>
                  <Text style={styles.textContent}>{occupation || 'N/A'}</Text>
                </View>
                <View style={styles.professionalInfo}>
                  <Text style={styles.label}>Job Start Date</Text>
                  <Text style={styles.textContent}>{jobStartDate ? dateTimeFormater(jobStartDate, 'DD/MM/YYYY') : 'N/A'}</Text>
                </View>
                <View style={styles.professionalInfo}>
                  <Text style={styles.label}>Experience:</Text>
                  <Text style={styles.textContent}>{experience || 'N/A'}</Text>
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
              <Card.Title title="Documents" style={styles.cardTitle} right={(props) => <IconButton {...props} icon="square-edit-outline" onPress={() => this.editProfile('Documents')} />} />
              <Divider style={styles.dividerStyle} />
              <Card.Content style={styles.cardContent}>
                <View style={styles.documentInfo}>
                  <Text style={styles.label}>Aadhaar Front:</Text>
                  <Text style={styles.textContent}>{aadharFront ? <Image source={aadharFront} /> : 'N/A'}</Text>
                </View>
                <View style={styles.documentInfo}>
                  <Text style={styles.label}>Aadhaar Back:</Text>
                  <Text style={styles.textContent}>{aadharBack ? <Image source={aadharBack} /> : 'N/A'}</Text>
                </View>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
        <EditProfile visible={showEditProfile} section={section} data={userDetails} closeEditProfileHandler={this.closeEditProfileHandler} />
      </SafeAreaView>
    );
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userDetails: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
