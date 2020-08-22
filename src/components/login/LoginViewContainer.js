import { connect } from 'react-redux';
import LoginView from './LoginView';

const mapStateToProps = state => {
    const { isLoggedIn, loginError } = state.userReducer;
    return {
        isLoggedIn,
        loginError
    };
};

export default connect(mapStateToProps)(LoginView);
