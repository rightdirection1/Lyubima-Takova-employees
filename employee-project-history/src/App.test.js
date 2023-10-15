import { render, screen } from '@testing-library/react';
import App from './App';

test('App component renders without errors', () => {
  render(<App />);
  const headingElement = screen.getByText(/Employee Pair Work Duration/i);
  expect(headingElement).toBeInTheDocument();
});

