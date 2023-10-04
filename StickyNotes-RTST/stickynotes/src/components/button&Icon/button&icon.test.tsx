import { render, fireEvent } from '@testing-library/react';
import Buttons from './button';

const mockAddCard = jest.fn();

describe('Buttons Component', () => 
{
  
  it('renders button with corect text', () =>
   {
    const { getByText } = render(<Buttons addCard={mockAddCard} />);
    const addButton = getByText('Add Notes');
    expect(addButton).toBeInTheDocument();
  });

  it('when  button is clicked function called or not', () =>
   {
    const { getByText } = render(<Buttons addCard={mockAddCard} />);
    const addButton = getByText('Add Notes');
    fireEvent.click(addButton);
    expect(mockAddCard).toHaveBeenCalledTimes(1);
  });


});
