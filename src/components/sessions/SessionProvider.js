import {connect} from 'react-redux';
import Session from './Session';

function getSession(sessions, key) {
  return sessions[key];
}

const mapStateToProps = (state, otherProps) => {
  return {
    session: getSession(state.sessions, state.activeSessionKey)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      finishSession: (updatedSession) => {
        dispatch({session: updatedSession, type: 'FINISH_SESSION'});
      },
    }
  };
};

const SessionProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Session);

export default SessionProvider;
