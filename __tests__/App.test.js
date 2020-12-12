import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { App } from 'Components/App';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


describe('Components/App test', () => {
  it('should render', () => {
    act(() => {
      render(<App />, container);
    });
    expect(container.querySelector('.dashboard')).not.toBeNull();
  });


  it('should sensors work', async () => {
    act(() => {
      render(<App />, container);
    });

    /* eslint-disable jest/prefer-to-have-length */
    expect(container.querySelectorAll('.dashboard > .dashboard__sensors .dashboard__sensor').length).toBe(0);

    await act(() => sleep(2000));

    expect(container.querySelectorAll('.dashboard > .dashboard__sensors .dashboard__sensor').length).toBe(4);
  })
});