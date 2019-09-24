import { connect } from 'react-redux'
import SessionsList from './SessionsList';

const mapStateToProps = state => {
  return {
    sessions: Object.keys(state.sessions).map(key => state.sessions[key])
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      setActiveSessionKey: (key) => {
        dispatch({key, type: 'SET_ACTIVE_SESSION'});
      },
    }
  };
};

const SessionsListProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionsList);

export default SessionsListProvider;
