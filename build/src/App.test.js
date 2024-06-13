import { render, screen } from '@testing-library/react';
import Login from './Components/login'; // Assuming Withdraw component is located in './Components/Withdraw'

test('Bad Bank', () => {
  render(<Login />);
  const welcomeText = screen.getByText("Log In");
  expect(welcomeText).toBeInTheDocument();
});

