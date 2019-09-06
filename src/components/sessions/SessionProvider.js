import { connect } from 'react-redux'
import Session from './Session';

function getSession(workouts, exercises, otherProps) {
  // const id = otherProps.navigation.getParam('workoutId', 0);
  // let session = workouts.find((workout) => workout.id === id) || null;
  let session = workouts[workouts.length - 1];

  if (session) {
    session.exercises = session.exercises.map((exercise) => exercises.find((ex) => ex.name === exercise));
    return session;
  }

  return {};
}

const mapStateToProps = (state, otherProps) => {
  return {
    session: getSession(state.workouts, state.exercises, otherProps)
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
