import { connect } from 'react-redux'
import SessionTeaser from './SessionTeaser';

function getSession(sessions, otherProps) {
  if (otherProps.type === 'next') {
    return sessions.find((session) => session.id === 2);
  }

  if (otherProps.type === 'last') {
    return sessions.find((session) => session.id === 1);
  }
}

const mapStateToProps = (state, otherProps) => {
  return {
    session: getSession(state.sessions, otherProps),
  }
};

// const mapDispatchToProps = dispatch => {
//   return {
//     handleUpdate: (updatedWorkout, action) => {
//       dispatch({workout: updatedWorkout, type: action });
//     }
//   }
// };

const SessionTeaserProvider = connect(
  mapStateToProps,
  // mapDispatchToProps
)(SessionTeaser);

export default SessionTeaserProvider;
