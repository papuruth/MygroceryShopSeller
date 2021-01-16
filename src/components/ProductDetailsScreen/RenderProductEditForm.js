import { colors } from '@/styles';
import { imageSelector } from '@/utils/commonFunctions';
import TextInput from '@/utils/reusableComponents/TextInput';
import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Progress from 'react-native-progress';
import { styles } from './styles';

export default class RenderProductEditForm extends React.Component {
  selectPhoto = async () => {
    try {
      const { setPhotoSelected } = this.props;
      const res = await imageSelector();
      if (res) {
        setPhotoSelected(res);
        this.productRef.focus();
      }
    } catch (e) {
      Alert.alert('Failure', e?.message);
    }
  };

  render() {
    const { data, onChange, uploading, transferred } = this.props;
    const { image, product, price, quantity, total, description, key_features } = data || {};

    return (
      <SafeAreaView style={styles.editBasicProfileContainer}>
        <View style={styles.editImageContainer}>
          {image ? (
            <Pressable
              onPress={() => this.selectPhoto()}
              android_ripple={{ color: '#000', radius: 360 }}
            >
              <Avatar.Image
                size={150}
                source={{
                  uri: image,
                }}
              />
            </Pressable>
          ) : (
            <View>
              <Pressable
                onPress={() => this.selectPhoto()}
                android_ripple={{ color: '#000', radius: 360 }}
              >
                <Avatar.Icon size={150} icon="image" />
              </Pressable>
            </View>
          )}
        </View>
        <View style={styles.inputFiledsContainer}>
          <TextInput
            style={styles.inputFields}
            label="Product Name"
            placeholderTextColor={colors.black}
            inputRef={(pRef) => {
              this.productRef = pRef;
            }}
            onSubmitEditing={() => this.priceRef.focus()}
            mode="flat"
            value={product}
            onChangeText={(text) => onChange('product', text)}
          />
          <TextInput
            style={styles.inputFields}
            label="Price"
            placeholderTextColor={colors.black}
            mode="flat"
            onSubmitEditing={() => this.qtyRef.focus()}
            inputRef={(priceRef) => {
              this.priceRef = priceRef;
            }}
            value={price}
            onChangeText={(text) => onChange('price', text)}
          />
          <TextInput
            style={styles.inputFields}
            label="Quantity"
            placeholderTextColor={colors.black}
            mode="flat"
            onSubmitEditing={() => this.totalRef.focus()}
            inputRef={(qRef) => {
              this.qtyRef = qRef;
            }}
            value={quantity}
            onChangeText={(text) => onChange('quantity', text)}
          />
          <TextInput
            style={styles.inputFields}
            label="Total Items"
            placeholderTextColor={colors.black}
            mode="flat"
            onSubmitEditing={() => this.descRef.focus()}
            inputRef={(totRef) => {
              this.totalRef = totRef;
            }}
            value={total}
            onChangeText={(text) => onChange('total', text)}
          />
          <TextInput
            style={styles.inputFields}
            label="Description"
            placeholderTextColor={colors.black}
            mode="flat"
            onSubmitEditing={() => this.keyFeatRef.focus()}
            inputRef={(dRef) => {
              this.descRef = dRef;
            }}
            value={description}
            onChangeText={(text) => onChange('description', text)}
          />
          <TextInput
            style={styles.inputFields}
            label="Key Features"
            placeholderTextColor={colors.black}
            mode="flat"
            inputRef={(keyRef) => {
              this.keyFeatRef = keyRef;
            }}
            value={key_features}
            onChangeText={(text) => onChange('key_features', text)}
          />
        </View>
        <View>
          {uploading && (
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={transferred} width={300} />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

RenderProductEditForm.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setPhotoSelected: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  transferred: PropTypes.number.isRequired,
};
