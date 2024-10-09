import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { HashRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from '~/contexts/snackbarContext';
import DashboardPage from '../index';
import AdmissionsServiceFactory from '~/factories/services/admissionsServiceFactory';

jest.mock('../../../constants/env', () => ({
  VITE_API_ADMISSIONS_BASE_URL: 'http://mock-api.test',
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    }
  }
});

const MOCK_ADMISSIONS = [
  {
    id: "1",
    admissionDate: "2023-10-22",
    email: "filipe@caju.com.br",
    employeeName: "Filipe Marins",
    status: "APPROVED",
    cpf: "97141405011",
  },
  {
    id: "2",
    admissionDate: "2023-10-22",
    email: "luiz@caju.com.br",
    employeeName: "Luiz Filho",
    status: "REPROVED",
    cpf: "78502270001",
  },
  {
    id: "3",
    admissionDate: "2023-10-22",
    email: "igor@caju.com.br",
    employeeName: "Igor Ferreira",
    status: "REPROVED",
    cpf: "89995877031",
  },
];

describe('DashboardPage Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AdmissionsServiceFactory.make = jest.fn().mockReturnValue({
      listAdmissions: jest.fn().mockResolvedValue(MOCK_ADMISSIONS),
    });
  });

  it('should render admissions', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <Router>
            <DashboardPage />
          </Router>
        </SnackbarProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Filipe Marins')).toBeInTheDocument();
      expect(screen.getByText('Luiz Filho')).toBeInTheDocument();
      expect(screen.getByText('Igor Ferreira')).toBeInTheDocument();
    });
  });

  it("should show error snackbar on admissions fetch failure", async () => {
    AdmissionsServiceFactory.make = jest.fn().mockReturnValue({
      listAdmissions: jest.fn().mockRejectedValue(new Error('Failed to fetch admissions')),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <Router>
            <DashboardPage />
          </Router>
        </SnackbarProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "Falha ao tentar carregar as admissões, tente novamente!"
        )
      ).toBeInTheDocument();
    });
  });

  it("should show an error message when entering an invalid CPF", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <Router>
            <DashboardPage />
          </Router>
        </SnackbarProvider>
      </QueryClientProvider>
    );

    const cpfInput = screen.getByTestId('text-field-cpf');
    fireEvent.change(cpfInput, { target: { value: '123.456.789-12' }});
    
    await waitFor(() => {
      expect(screen.getByTestId('error-text-field-cpf')).toHaveTextContent('CPF inválido');
    });
  });

  it("should call listAdmissions function when entering an valid CPF", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <Router>
            <DashboardPage />
          </Router>
        </SnackbarProvider>
      </QueryClientProvider>
    );

    const mockListFn = jest.fn().mockResolvedValue([]);
    AdmissionsServiceFactory.make = jest.fn().mockReturnValue({
      listAdmissions: mockListFn,
    });

    const cpfInput = screen.getByTestId('text-field-cpf');
    fireEvent.change(cpfInput, { target: { value: '123.456.789-09' }});
    
    expect(mockListFn).toHaveBeenCalled();
  });
});
