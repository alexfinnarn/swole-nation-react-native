import { connect } from 'react-redux'
import WorkoutsList from './WorkoutsList';

const mapStateToProps = state => {
  // console.log(state.workouts);
  return {
    workouts: state.workouts
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
)(WorkoutsList);

export default WorkoutsListProvider;