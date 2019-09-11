import {connect} from 'react-redux';
import Session from './Session';

function getSession(sessions, index) {
  return sessions[index];
}

const mapStateToProps = (state, otherProps) => {
  return {
    session: getSession(state.sessions, state.activeSessionIndex)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    finishSession: (updatedSession) => {
      dispatch({session: updatedSession, type: 'FINISH_SESSION'});
    }
  };
};

const SessionProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Session);

export default SessionProvider;
