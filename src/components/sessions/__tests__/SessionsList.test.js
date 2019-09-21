import React from 'react';
import SessionsList from '../SessionsList';
import { render, fireEvent } from 'react-native-testing-library';
import data from '../../../store/data';
import ActionCard from "../../utility/ActionCard";
import shortId from "shortid";

let renderer, instance ={};
let sessions = Object.keys(data.sessions).map(key => data.sessions[key]);
const handle = {
  setActiveSessionKey: jest.fn(),
};
const navigation = {
  navigate: jest.fn()
};

beforeEach(() => {
  renderer = render(<SessionsList sessions={sessions} navigation={navigation} handle={handle} thing={shortId.generate()}/>);
  instance = renderer.getByTestId('sessions-list-root');
}, 0);

describe('<SessionsList />', () => {
  it('Should render one session in the list initially and two when session added', () => {
    let actionCards = instance.findAllByType(ActionCard);
    expect(actionCards.length).toBe(1);
    expect(renderer.getAllByText('Edit').length).toBe(1);

    expect(renderer.queryByText('Workout C')).toBeNull();

    sessions.push({key: 'DWYVDAQWAw4', name: 'Workout C', description: 'blah', exercises: []});
    renderer.update(<SessionsList sessions={sessions} navigation={navigation} handle={handle} thing={shortId.generate()} />);
    instance = renderer.getByTestId('sessions-list-root');

    actionCards = instance.findAllByType(ActionCard);
    expect(actionCards.length).toBe(2);
    expect(renderer.getAllByText('Edit').length).toBe(2);

    expect(renderer.queryByText('Workout C')).not.toBeNull();
  });

  it('Should navigate to the Session screen when edit button pressed', () => {
    // Expect navigate to first session.
    fireEvent(renderer.getAllByText('Edit')[0], 'press');
    expect(navigation.navigate).toHaveBeenCalledWith('Session', {sessionId: "BwgFDQ8CCg8"});
    expect(handle.setActiveSessionKey).toHaveBeenCalledTimes(1);
    expect(handle.setActiveSessionKey).toHaveBeenCalledWith('BwgFDQ8CCg8');
  });
});