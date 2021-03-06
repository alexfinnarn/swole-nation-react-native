import React from 'react';
import SessionsList from '../SessionsList';
import {render, fireEvent} from 'react-native-testing-library';
import data from '../../../store/data';
import ActionCard from '../../utility/ActionCard';
import shortId from 'shortid';
import SessionTeaser from '../SessionTeaser';

let renderer;
let session = data.sessions[Object.keys(data.sessions)[0]];

beforeEach(() => {
  renderer = render(<SessionTeaser session={session} />);
}, 0);

describe('<SessionsList />', () => {
  it('Renders correctly', () => {
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('Should render session name', () => {
    expect(renderer.getByTestId('session-name').props.children).toBe(
      'Thu Sep 26 12:19:14 2019',
    );
  });

  it('Should render workout name', () => {
    expect(renderer.getByTestId('workout-name').props.children).toBe(
      'Texas Method A',
    );
  });

  it('Should render completed percentage', () => {
    expect(renderer.getByTestId('completion-percentage').props.children).toBe(
      '78%',
    );
  });

  it('Should render session duration', () => {
    expect(renderer.getByTestId('session-duration').props.children).toEqual([
      '15',
      's',
    ]);
  });
});
