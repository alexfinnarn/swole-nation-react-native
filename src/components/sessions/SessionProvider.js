import { connect } from 'react-redux'
import Session from './Session';

function getSession(sessions, index) {
  return sessions[index];
}

const mapStateToProps = (state, otherProps) => {
  return {
    session: getSession(state.sessions, state.activeSessionIndex)
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
