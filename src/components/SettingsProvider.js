import { connect } from 'react-redux'
import Settings from './Settings';

const mapStateToProps = (state, otherProps) => {
  return {
    theSetting: state.theSetting,
  }
};

const mapDispatchToProps = (dispatch, otherProps) => {
  return {
    handle: {
      saveSettings: (setting) => {
        dispatch({setting, type: 'SAVE_SETTINGS'});
        otherProps.navigation.navigate('Home');
      }
    },
  }
};

const SettingsProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

export default SettingsProvider;
