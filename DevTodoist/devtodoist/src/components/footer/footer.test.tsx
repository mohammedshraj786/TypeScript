import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Footer from './footer';

test('Footer rights display', () => 
{
  const { getByText } = render(<Footer />);

  const copyrightText = getByText(`All rights reserved © ${new Date().getFullYear()}`);
  
  expect(copyrightText).toBeInTheDocument();
});

test('Footer displays  check for that link', () => 
{
  const { getByText } = render(<Footer />);
  const linkElement = getByText('Todo Document For Learning');
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute(
    'href',
    'https://simtk-confluence.stanford.edu:8443/display/OpenSim/Documentation+To+Do+List'
  );
});
