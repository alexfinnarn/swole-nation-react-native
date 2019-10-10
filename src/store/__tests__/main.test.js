import store from '../main';
import data from '../data';
import {WorkoutActions} from '../actions';

const texasMethodA = 'DQkECwYLCQQ';
const texasMethodB = 'DAwJBQEMAA0';
const squatsKey = 'Bw0ECwAKBws';
const firstSession = 'BwgFDQ8CCg8';

describe('Main Reducer', () => {
  it('Should render the default state', () => {
    expect(store(undefined, {})).toEqual(data);
  });

  // it('SAVE_SETTINGS', () => {
  //   const reducer = store(undefined, {type: WorkoutActions.SAVE_SETTINGS, setting: 'Foo'});
  //   expect(reducer.theSetting).toBe('Foo');
  //   expect(reducer.theSetting).not.toEqual(data.theSetting);
  // });
});

describe('Workouts Reducer', () => {
  it('CREATE_WORKOUT', () => {
    const reducer = store(undefined, {type: WorkoutActions.CREATE_WORKOUT});
    expect(Object.keys(reducer.workouts).length).toBe(3);
    expect(Object.keys(reducer.workouts).length).not.toEqual(
      Object.keys(data.workouts).length,
    );
    expect(reducer.activeWorkoutKey).not.toEqual(data.activeWorkoutKey);
  });

  it('DELETE_WORKOUT', () => {
    expect(data.workouts[texasMethodA]).toBeDefined();
    const reducer = store(undefined, {
      type: WorkoutActions.DELETE_WORKOUT,
      key: texasMethodA,
    });
    expect(Object.keys(reducer.workouts).length).toBe(1);
    expect(Object.keys(reducer.workouts).length).not.toEqual(
      Object.keys(data.workouts).length,
    );
  });

  it('UPDATE_WORKOUT', () => {
    expect(data.workouts[texasMethodB]).toBeDefined();
    const newData = Object.assign({}, data);
    newData.workouts[texasMethodB].name = 'Workout C';
    const reducer = store(undefined, {
      type: WorkoutActions.UPDATE_WORKOUT,
      workout: newData.workouts[texasMethodB],
    });

    expect(reducer.workouts[texasMethodB].name).toBe('Workout C');
    expect(reducer.workouts[texasMethodB]).toEqual(
      newData.workouts[texasMethodB],
    );
    expect(reducer.theThing).not.toEqual(data.theThing);
  });

  it('SET_ACTIVE_WORKOUT', () => {
    const reducer = store(undefined, {
      type: WorkoutActions.SET_ACTIVE_WORKOUT,
      key: texasMethodA,
      transformerKey: 'addFive',
    });
    expect(reducer.activeWorkoutKey).toBe(texasMethodA);
    expect(reducer.activeWorkoutKey).not.toEqual(data.activeWorkoutKey);
    expect(reducer.activeTransformerKey).toBe('addFive');
    expect(reducer.activeTransformerKey).not.toEqual(data.activeTransformerKey);
  });
});

describe('Exercises Reducer', () => {
  it('ADD_EXERCISE', () => {
    expect(
      data.workouts[texasMethodA].exercises.includes('Deadlifts'),
    ).not.toBeTruthy();
    let newData = Object.assign({}, data);
    newData.activeWorkoutKey = texasMethodA;
    const reducer = store(newData, {
      type: WorkoutActions.ADD_EXERCISE,
      exercise: {name: 'Deadlifts'},
    });
    expect(
      reducer.workouts[texasMethodA].exercises.includes('Deadlifts'),
    ).toBeTruthy();
    expect(reducer.theThing).not.toEqual(data.theThing);
  });

  it('CREATE_EXERCISE', () => {
    const reducer = store(undefined, {type: WorkoutActions.CREATE_EXERCISE});
    expect(Object.keys(reducer.exercises).length).toBeGreaterThan(
      Object.keys(data.exercises).length,
    );
  });

  it('UPDATE_EXERCISE', () => {
    let newExercise = Object.assign({}, data).exercises[squatsKey];
    newExercise.name = 'Not Squats';
    newExercise.sets.unshift({reps: 7, weight: 260.0});

    let reducer = store(undefined, {
      type: WorkoutActions.UPDATE_EXERCISE,
      exercise: newExercise,
    });
    expect(reducer.exercises[squatsKey].name).toBe('Not Squats');
    expect(reducer.exercises[squatsKey].sets[0]).toEqual({
      reps: 7,
      weight: 260.0,
    });
  });

  it('SET_ACTIVE_EXERCISE', () => {
    const reducer = store(undefined, {
      type: WorkoutActions.SET_ACTIVE_EXERCISE,
      key: squatsKey,
    });
    expect(reducer.activeExerciseKey).toBe(squatsKey);
    expect(reducer.activeExerciseKey).not.toEqual(data.activeExerciseKey);
  });

  // it('ADD_SET', () => {
  //   let newData = Object.assign({}, data);
  //   newData.activeExerciseKey = squatsKey;
  //   const reducer = store(newData, {type: WorkoutActions.ADD_SET, set: {reps: 7, weight: 260.0}});
  //   expect(reducer.exercises[squatsKey].sets.length).toBeGreaterThan(data.exercises[squatsKey].sets.length);
  // });

  it('UPDATE_SET', () => {
    let newData = Object.assign({}, data);
    newData.activeExerciseKey = squatsKey;
    const reducer = store(newData, {
      type: WorkoutActions.UPDATE_SET,
      index: 0,
      set: {reps: 7, weight: 260.0},
    });
    expect(reducer.exercises[squatsKey].sets[0]).toEqual({
      reps: 7,
      weight: 260.0,
    });
    expect(reducer.theThing).not.toEqual(data.theThing);
  });

  // it('REMOVE_SET', () => {
  //   let newData = Object.assign({}, data, {activeExerciseKey: squatsKey});
  //   const reducer = store(newData, {type: WorkoutActions.REMOVE_SET, index: 0});
  //   expect(reducer.exercises[squatsKey].sets.length).toBeLessThan(newData.exercises[squatsKey].sets.length);
  //   expect(reducer.theThing).not.toEqual(data.theThing);
  // });
});

describe('Sessions Reducer', () => {
  it('CREATE_SESSION', () => {
    // let newData = Object.assign({}, data);
    // newData.activeWorkoutKey = texasMethodA;
    // const reducer = store(newData, {type: WorkoutActions.CREATE_SESSION});
    // expect(Object.keys(reducer.sessions).length).toBeGreaterThan(Object.keys(data.sessions).length);
  });

  it('SET_ACTIVE_SESSION', () => {
    const reducer = store(undefined, {
      type: WorkoutActions.SET_ACTIVE_SESSION,
      key: firstSession,
    });
    expect(reducer.activeSessionKey).toBe(firstSession);
    expect(reducer.activeSessionKey).not.toEqual(data.activeSessionKey);
  });

  it('FINISH_SESSION', () => {
    const aSesh = {
      name: 'Sesh Two',
      key: 'BwgFDQ8CCg8',
      workoutKeys: [],
      exercises: [],
    };
    const reducer = store(undefined, {
      type: WorkoutActions.FINISH_SESSION,
      session: aSesh,
    });
    expect(reducer.sessions[aSesh.key].name).toBe('Sesh Two');
  });
});
