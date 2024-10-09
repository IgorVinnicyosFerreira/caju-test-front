import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ConfirmationDialog from '../index';

const mockProps = {
  title: 'Confirm Dialog',
  description: 'test description',
  isOpen: true,
  isLoading: false,
  onClose: jest.fn(),
  onAccept: jest.fn(),
};

describe('ConfirmationDialog', () => {
  beforeEach(() => {
    render(<ConfirmationDialog {...mockProps} />);
  });

  it('should render the dialog with title and description', () => {
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('should call onClose when Cancel button is clicked', () => {
    fireEvent.click(screen.getByTestId('close-dialog'));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('should call onAccept when Confirm button is clicked', () => {
    fireEvent.click(screen.getByTestId('accept-dialog'));
    expect(mockProps.onAccept).toHaveBeenCalled();
  });

  it('should render loading spinner when isLoading is true', () => {
    cleanup();
    render(<ConfirmationDialog {...{ ...mockProps, isLoading: true }} />);
    expect(screen.getByTestId('accept-dialog')).toContainElement(screen.getByTestId('spinner'));
    expect(screen.queryByText('Confirmar')).not.toBeInTheDocument();
  });

  it('should disable buttons when isLoading is true', () => {
    cleanup();
    render(<ConfirmationDialog {...{ ...mockProps, isLoading: true }} />);
    expect(screen.getByTestId('close-dialog')).toBeDisabled();
    expect(screen.getByTestId('accept-dialog')).toBeDisabled();
  });
});
