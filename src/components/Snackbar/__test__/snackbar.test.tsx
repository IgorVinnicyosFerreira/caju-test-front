import { render, screen } from '@testing-library/react';
import Snackbar from '../index';
import SnackbarTypes from '~/constants/snackbarTypes';

describe('Snackbar', () => {
  it('should render message when isVisible is true', () => {
    render(
      <Snackbar message="test snackbar message" type={SnackbarTypes.SUCCESS} isVisible={true} />
    );

    const snackbar = screen.getByTestId('snackbar');
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveTextContent('test snackbar message');
    expect(snackbar).toHaveClass('show');
  });

  it('should not render message when isVisible is false', () => {
    render(
      <Snackbar message="test snackbar message!" type={SnackbarTypes.ERROR} isVisible={false} />
    );

    const snackbar = screen.getByTestId('snackbar');
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).not.toHaveClass('show');
    expect(snackbar).toHaveTextContent('test snackbar message!');
  });

  it('should render the correct icon for SUCCESS type', () => {
    render(
      <Snackbar message="test snackbar message success!" type={SnackbarTypes.SUCCESS} isVisible={true} />
    );

    const icon = screen.getByTestId(`snackbar-icon-${SnackbarTypes.SUCCESS}`);
    expect(icon).toBeInTheDocument();
  });

  it('should render the correct icon for ERROR type', () => {
    render(
      <Snackbar message="test snackbar message error!" type={SnackbarTypes.ERROR} isVisible={true} />
    );

    const icon = screen.getByTestId(`snackbar-icon-${SnackbarTypes.ERROR}`);
    expect(icon).toBeInTheDocument();
  });
});
