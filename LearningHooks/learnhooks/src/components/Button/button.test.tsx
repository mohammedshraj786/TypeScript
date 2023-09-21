// Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './button';

test('renders a button with label', () => {
  const onClick = jest.fn();
  const { getByText } = render(<Button label="Click me" onClick={onClick} />);
  const buttonElement = getByText('Click me');

  expect(buttonElement).toBeInTheDocument();
});

test('button click fires the onClick function', () => {
  const onClick = jest.fn();
  const { getByText } = render(<Button label="Click me" onClick={onClick} />);
  const buttonElement = getByText('Click me');

  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalled();
});
