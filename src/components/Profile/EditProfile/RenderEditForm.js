import { colors } from '@/styles';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';
import { imageSelector } from '../../../utils/commonFunctions';
import { styles } from '../styles';

export const RenderBasicDetailsForm = ({
  displayName,
  photoURL,
  uploading,
  transferred,
  onChange,
  setPhotos,
}) => {
  const selectPhoto = async () => {
    const res = await imageSelector();
    setPhotos(res, 'rawImage');
  };
  return (
    <View style={styles.editBasicProfileContainer}>
      <View style={styles.editImageContainer}>
        {photoURL ? (
          <Pressable onPress={() => selectPhoto()} android_ripple={{ color: '#000', radius: 360 }}>
            <Avatar.Image
              size={120}
              source={{
                uri: photoURL,
              }}
            />
          </Pressable>
        ) : (
          <View>
            <Pressable
              onPress={() => selectPhoto()}
              android_ripple={{ color: '#000', radius: 360 }}
            >
              <Avatar.Text size={120} label={displayName && displayName.slice(0, 1)} />
            </Pressable>
          </View>
        )}
      </View>
      <View style={styles.inputFieldsContainer}>
        <TextInput
          style={styles.inputFields}
          label="Fullname"
          placeholderTextColor={colors.black}
          mode="outlined"
          value={displayName}
          onChangeText={(text) => onChange('displayName', text)}
        />
      </View>
      <View>
        {uploading && (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        )}
      </View>
    </View>
  );
};

RenderBasicDetailsForm.propTypes = {
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  uploading: PropTypes.bool.isRequired,
  transferred: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  setPhotos: PropTypes.func.isRequired,
};
