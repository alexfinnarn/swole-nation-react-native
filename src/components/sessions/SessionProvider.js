import { connect } from 'react-redux'
import Session from './Session';

function getSession(sessions, otherProps) {
  const id = otherProps.navigation.getParam('sessionId', 0);
  return sessions.find((session) => session.id === id) || '';
}

const mapStateToProps = (state, otherProps) => {
  return {
    session: getSession(state.sessions, otherProps)
  }
};

// const mapDispatchToProps = dispatch => {
//   return {
//     handleUpdate: (updatedWorkout, action) => {
//       dispatch({workout: updatedWorkout, type: action });
//     }
//   }
// };

const SessionProvider = connect(
  mapStateToProps,
  // mapDispatchToProps
)(Session);

export default SessionProvider;
