import { render, screen } from '@testing-library/react';
import TextField from '../index';

describe('TextField', () => {
  it('should render with label and input', () => {
    render(<TextField name="test-input" label="Test Label" />);

    const label = screen.getByTestId('label-text-field-test-input');
    const input = screen.getByTestId('text-field-test-input');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('should display error message', () => {
    render(<TextField name="test-input" label="Test Label" error="This field is required." />);

    const errorMessage = screen.getByTestId('error-text-field-test-input');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('This field is required.');
  });

  it('should accept input properties', () => {
    render(<TextField name="test-input" label="Test Label" placeholder="test str" />);

    const input = screen.getByTestId('text-field-test-input');
    expect(input.getAttribute('placeholder')).toBe('test str');
  });
});
