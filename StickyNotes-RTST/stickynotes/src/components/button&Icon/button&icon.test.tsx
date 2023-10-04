import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import Buttons from './button';


const mockAddCard = jest.fn();

describe('Buttons Component', () => {
  it('renders the button with correct text', () => {
    const { getByText } = render(<Buttons addCard={mockAddCard} />);
    const addButton = getByText('Add Notes');
    expect(addButton).toBeInTheDocument();
  });

  it('calls addCard function when the button is clicked', () => {
    const { getByText } = render(<Buttons addCard={mockAddCard} />);
    const addButton = getByText('Add Notes');
    
    userEvent.click(addButton);

    expect(mockAddCard).toHaveBeenCalledTimes(1);
  });

});
