import { connect } from 'react-redux'
import Workout from './Workout';

function getWorkout(workouts, otherProps) {
  const id = otherProps.navigation.getParam('workoutId', 0);
  return workouts.find((el) => el.id === id);
}

const mapStateToProps = (state, otherProps) => {
  return {
    workout: getWorkout(state.workouts, otherProps)
  }
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onTodoClick: id => {
//       dispatch(toggleTodo(id))
//     }
//   }
// };

const WorkoutsListProvider = connect(
  mapStateToProps,
  // mapDispatchToProps
)(Workout);

export default WorkoutsListProvider;
