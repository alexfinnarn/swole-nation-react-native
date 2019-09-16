import { connect } from 'react-redux'
import Home from './Home';

function getWorkouts(workouts) {
  const theWorkouts = Object.keys(workouts).map((val) => {
    return workouts[val];
  });

  return theWorkouts;
}

const mapStateToProps = (state, otherProps) => {
  return {
    workouts: getWorkouts(state.workouts),
    thing: state.theThing
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      nextWorkoutInteraction: (workoutKey) => {
        dispatch({key: workoutKey, type: 'SET_ACTIVE_WORKOUT'});
      }
    },
  }
};

const HomeScreenProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeScreenProvider;
