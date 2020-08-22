import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import { Card, Divider, IconButton } from 'react-native-paper';
import { styles } from '../styles';
import { checkEmpty } from '../../../utils/commonFunctions';

export default class EditAddress extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      route: { params },
    } = this.props;
    const { address } = params || [];
    return (
      <SafeAreaView style={styles.addressEditContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.addressCardContainer}>
            {!checkEmpty(address) ? (
              address.map(({ addressId, buildingName, city, postalCode, state, street }) => (
                <Card style={styles.addressCard}>
                  <Card.Title
                    title="Address"
                    style={styles.cardTitle}
                    right={(props) => (
                      <View style={styles.addressActionIcon}>
                        <IconButton
                          {...props}
                          icon="delete"
                          onPress={() => {}}
                        />
                        <IconButton
                          {...props}
                          icon="square-edit-outline"
                          onPress={() => {}}
                        />
                      </View>
                    )}
                  />
                  <Divider style={styles.dividerStyle} />
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
                </Card>
              ))
            ) : (
              <View style={styles.editAddressNoAddress}>
                <Text style={styles.noAddressText}>No address to edit.</Text>
                <Text style={styles.noAddressText2}>
                  Please add some address from Edit Profile Screen to edit them here.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

EditAddress.propTypes = {
  route: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
