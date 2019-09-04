import { connect } from 'react-redux'
import WorkoutsList from './WorkoutsList';

const mapStateToProps = state => {
  return {
    workouts: state.workouts
  }
};

const WorkoutsListProvider = connect(
  mapStateToProps,
)(WorkoutsList);

export default WorkoutsListProvider;
