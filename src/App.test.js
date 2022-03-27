<<<<<<< HEAD
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
=======
import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home Screen/i);
>>>>>>> A3
  expect(linkElement).toBeInTheDocument();
});
