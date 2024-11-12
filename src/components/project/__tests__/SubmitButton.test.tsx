import { render, screen } from '@testing-library/react';
import SubmitButton from '../SubmitButton';

describe('SubmitButton', () => {
  it('renders the button with correct text', () => {
    render(<SubmitButton>Submit</SubmitButton>);
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('shows loading state when isPending is true', () => {
    render(<SubmitButton isPending={true}>Submit</SubmitButton>);
    expect(screen.getByRole('button', { name: /Submit/i })).toHaveAttribute(
      'aria-disabled',
    );
  });
});
