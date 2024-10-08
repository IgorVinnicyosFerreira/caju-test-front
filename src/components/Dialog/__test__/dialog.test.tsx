import { render, screen } from '@testing-library/react';
import Dialog from '../Dialog';

describe('Dialog', () => {
  it('should render Dialog with your children when isOpen is true', () => {
    render(
      <Dialog isOpen={true}>
        <h1 id="dialog-title">Teste title Dialog</h1>
        <p id="dialog-description">This is a dialog description for test.</p>
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Teste title Dialog')).toBeInTheDocument();
    expect(screen.getByText('This is a dialog description for test.')).toBeInTheDocument();
  });

  it('should not render anything when isOpen is false', () => {
    const { container } = render(<Dialog isOpen={false}>This should not be visible.</Dialog>);

    expect(container.firstChild).toBeNull();
  });
});
