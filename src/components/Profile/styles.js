import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export const styles = StyleSheet.create({
  profile: {
    flex: 1,
    width: '100%',
  },
  profileDisplayContainer: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  cardTitle: {},
  dividerStyle: {
    height: 1,
    backgroundColor: colors.grey,
  },
  personalInfoCard: {
    display: 'flex',
    borderTopColor: colors.secondary,
    borderTopWidth: 2,
    flexDirection: 'column',
    marginBottom: 15,
  },
  addressCard: {
    display: 'flex',
    borderTopColor: colors.green,
    borderTopWidth: 2,
    flexDirection: 'column',
    marginBottom: 15,
  },
  personalInfoContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  personalInfoContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  personalInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  personalInfoText: {
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  verifiedUser: { width: 20, height: 20 },
  scrollView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    display: 'flex',
    flex: 1,
    paddingTop: 10,
  },
  addressInfo: {
    margin: 5,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  addressActionIcon: {
    flexDirection: 'row',
  },
  noAddressFound: {
    margin: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginRight: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  professionalInfoCard: {
    display: 'flex',
    borderTopColor: colors.orange,
    borderTopWidth: 2,
    flexDirection: 'column',
    marginBottom: 15,
  },
  professionalInfo: {
    margin: 5,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  documentCard: {
    display: 'flex',
    borderTopColor: colors.BLUE,
    borderTopWidth: 2,
    flexDirection: 'column',
  },
  documentInfo: {
    margin: 5,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  documentInfoImage: {
    height: 150,
    width: 200,
    resizeMode: 'contain',
  },
  editProfileButton: {
    marginLeft: 5,
    marginRight: 5,
  },
  editBasicProfileContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  editImageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  inputFiledsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputFields: {
    marginVertical: 5,
  },
  dropDownContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  dropDownInnerContainer: {
    justifyContent: 'flex-start',
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  expTextLabel: {
    fontWeight: 'bold',
  },
  expContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    maxWidth: '100%',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  exprInnerContainer: {
    minWidth: '48%',
    justifyContent: 'flex-start',
  },
  docsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aadhaarImageContainer: {
    marginVertical: 10,
  },
  buttonShadow: {
    shadowColor: '#000fff',
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "#fff",
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  aadhaarLabel: {
    display: 'flex',
    marginBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 300,
    resizeMode: 'contain',
    height: 150
  },
  addressEditContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  editAddressNoAddress: {
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  noAddressText: {
    fontSize: 30,
    textAlign: 'center',
    alignItems: 'center',
  },
  noAddressText2: {
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
  },
  addressCardContainer: {
    flex: 1,
    padding: 10,
    width: '100%',
  }
});
