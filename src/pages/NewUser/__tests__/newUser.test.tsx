import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HashRouter as Router } from 'react-router-dom';
import NewUserPage from '../index'; 
import AdmissionsServiceFactory from '~/factories/services/admissionsServiceFactory';
import { SnackbarProvider } from '~/contexts/snackbarContext';

jest.mock('../../../constants/env', () => ({
  VITE_API_ADMISSIONS_BASE_URL: 'http://mock-api.test',
}));

describe('NewUserPage Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AdmissionsServiceFactory.make = jest.fn().mockReturnValue({
      create: jest.fn().mockResolvedValue(Promise.resolve()),
    });
  });

  it('should submit the form and show success snackbar', async () => {
    render(
      <SnackbarProvider>
        <Router>
          <NewUserPage />
        </Router>
      </SnackbarProvider>
    );

    fireEvent.change(screen.getByTestId('text-field-name'), { target: { value: 'Teste Usuário' } });
    fireEvent.change(screen.getByTestId('text-field-email'), { target: { value: 'teste@usuario.com' } });
    fireEvent.change(screen.getByTestId('text-field-cpf'), { target: { value: '123.456.789-09' } });
    fireEvent.change(screen.getByTestId('text-field-admissionDate'), { target: { value: '2024-01-01' } });

    fireEvent.click(screen.getByTestId('submit-form'));

    await waitFor(() => {
      expect(screen.getByText('Usuário cadastrado com sucesso!')).toBeInTheDocument();
    });
  });

  test('should show error snackbar on submission failure', async () => {
    AdmissionsServiceFactory.make = jest.fn().mockReturnValue({
      create: jest.fn().mockResolvedValue(Promise.reject()),
    });

    render(
      <SnackbarProvider>
        <Router>
          <NewUserPage />
        </Router>
      </SnackbarProvider>
    );

    fireEvent.change(screen.getByTestId('text-field-name'), { target: { value: 'Teste Usuário' } });
    fireEvent.change(screen.getByTestId('text-field-email'), { target: { value: 'teste@usuario.com' } });
    fireEvent.change(screen.getByTestId('text-field-cpf'), { target: { value: '123.456.789-09' } });
    fireEvent.change(screen.getByTestId('text-field-admissionDate'), { target: { value: '2024-01-01' } });

    fireEvent.click(screen.getByTestId('submit-form'));

    await waitFor(() => {
      expect(screen.getByText('Falha ao criar usuário, tente novamente!')).toBeInTheDocument();
    });
  });

  it('should show required message when submit the form with empty inputs', async () => {
    render(
      <SnackbarProvider>
        <Router>
          <NewUserPage />
        </Router>
      </SnackbarProvider>
    );

    fireEvent.click(screen.getByTestId('submit-form'));

    await waitFor(() => {
      expect(screen.getByTestId('error-text-field-name')).toHaveTextContent('Nome é obrigatório');
      expect(screen.getByTestId('error-text-field-email')).toHaveTextContent('Email é obrigatório');
      expect(screen.getByTestId('error-text-field-cpf')).toHaveTextContent('CPF é obrigatório');
      expect(screen.getByTestId('error-text-field-admissionDate')).toHaveTextContent('Data de admissão é obrigatório');
    });
  });

  it('should show error message when submitting form with Nome starting with numbers', async () => {
    render(
      <SnackbarProvider>
        <Router>
          <NewUserPage />
        </Router>
      </SnackbarProvider>
    );
    fireEvent.change(screen.getByTestId('text-field-name'), { target: { value: '123Teste Usuário' } });
    fireEvent.click(screen.getByTestId('submit-form'));

    await waitFor(() => {
      expect(screen.getByTestId('error-text-field-name')).toHaveTextContent('O Nome não deve começar com números');
    });
  });

  it('should show error message when submitting form with Nome having less than two letters', async () => {
    render(
      <SnackbarProvider>
        <Router>
          <NewUserPage />
        </Router>
      </SnackbarProvider>
    );
    fireEvent.change(screen.getByTestId('text-field-name'), { target: { value: 'd' } });
    fireEvent.click(screen.getByTestId('submit-form'));

    await waitFor(() => {
      expect(screen.getByTestId('error-text-field-name')).toHaveTextContent('O Nome deve conter ao menos duas letras');
    });
  });

  it('should show error message when submitting form with Nome having single word', async () => {
    render(
      <SnackbarProvider>
        <Router>
          <NewUserPage />
        </Router>
      </SnackbarProvider>
    );
    fireEvent.change(screen.getByTestId('text-field-name'), { target: { value: 'igor' } });
    fireEvent.click(screen.getByTestId('submit-form'));

    await waitFor(() => {
      expect(screen.getByTestId('error-text-field-name')).toHaveTextContent('O Nome deve ser composto');
    });
  });

  it('should show error message when submitting form with invalid Email', async () => {
    render(
      <SnackbarProvider>
        <Router>
          <NewUserPage />
        </Router>
      </SnackbarProvider>
    );
    fireEvent.change(screen.getByTestId('text-field-email'), { target: { value: 'igordd@c' } });
    fireEvent.click(screen.getByTestId('submit-form'));

    await waitFor(() => {
      expect(screen.getByTestId('error-text-field-email')).toHaveTextContent('Email inválido');
    });
  });
});
