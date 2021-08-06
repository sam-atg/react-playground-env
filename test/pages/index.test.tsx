import React from 'react';
import { render } from '../testUtils';

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<div />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
