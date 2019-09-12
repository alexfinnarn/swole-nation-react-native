import { connect } from 'react-redux'
import ExercisesList from './ExercisesList';

const mapStateToProps = state => {
  return {
    exercises: state.exercises
  }
};

const ExercisesListProvider = connect(
  mapStateToProps,
)(ExercisesList);

export default ExercisesListProvider;
