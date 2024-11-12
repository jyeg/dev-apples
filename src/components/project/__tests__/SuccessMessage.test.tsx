import { render, screen } from '@testing-library/react';
import { SuccessMessage } from '../SuccessMessage';

describe('SuccessMessage', () => {
  it('renders the success message with the correct project code', () => {
    render(<SuccessMessage projectCode="NEW_CODE" />);
    expect(
      screen.getByText(
        /Thank you for sending us this important information about NEW_CODE/i,
      ),
    ).toBeInTheDocument();
  });
});
