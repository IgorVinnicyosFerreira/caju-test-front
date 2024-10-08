import { renderHook, act } from '@testing-library/react';
import useForm from '../useForm';

describe('useForm', () => {
  const initialData = { name: 'teste', email: 'teste' };

  it('should initialize with initial data', () => {
    const { result } = renderHook(() => useForm(initialData));

    expect(result.current.values).toEqual(initialData);
  });

  it('should update values when handleChange is called', () => {
    const { result } = renderHook(() => useForm(initialData));

    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'Igor Ferreira' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.name).toBe('Igor Ferreira');
  });

  it('should maintain other fields when handleChange is called', () => {
    const { result } = renderHook(() => useForm(initialData));

    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'Igor Ferreira' } } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({ target: { name: 'email', value: 'igor.ferreira@example.com' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values).toEqual({
      name: 'Igor Ferreira',
      email: 'igor.ferreira@example.com',
    });
  });

  it('should call callback on handleSubmit', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useForm(initialData));

    const event = { preventDefault: jest.fn()} as any;

    act(() => {
      result.current.handleSubmit(event, callback);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it('should not affect the state on handleSubmit', () => {
    const { result } = renderHook(() => useForm(initialData));

    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'Luiz' } } as React.ChangeEvent<HTMLInputElement>);
    });

    const event = { preventDefault: jest.fn() } as any;
    const callback = jest.fn();

    act(() => {
      result.current.handleSubmit(event, callback);
    });

    expect(result.current.values.name).toBe('Luiz');
  });
});
