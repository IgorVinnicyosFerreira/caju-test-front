import { IAPIDefinnitions } from '~/types/api';
import AdmissionsService from '../admissionsService';
import AdmissionStatus from '~/constants/admissionStatus';
import APIFetch from '../apiFetchService';

const MOCK_BASE_URL = 'http://mock-api.test';

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
];

jest.mock('../../constants/env', () => ({
  VITE_API_ADMISSIONS_BASE_URL: 'http://mock-api.test',
}));

describe('AdmissionsService', () => {
  let admissionsService: AdmissionsService;
  let mockApi: IAPIDefinnitions;

  beforeEach(() => {
    mockApi = new APIFetch();
    admissionsService = new AdmissionsService(mockApi);
    jest.clearAllMocks();
  });

  describe('list method', () => {
    it('should call get with correct URL when no filters are provided', async () => {
      const url = `${MOCK_BASE_URL}/registrations`;

      mockApi.get = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(MOCK_ADMISSIONS),
      } as Response));

      const result = await admissionsService.list();

      expect(mockApi.get).toHaveBeenCalledWith(url);
      expect(result).toEqual(MOCK_ADMISSIONS);
    });

    it('should call get with correct URL when filters are provided', async () => {
      const url = `${MOCK_BASE_URL}/registrations?cpf=97141405011`;
      const filters = { cpf: '97141405011' };

      mockApi.get = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(MOCK_ADMISSIONS.filter(item => item.cpf === filters.cpf)),
      } as Response));

      const result = await admissionsService.list({ filters });

      expect(mockApi.get).toHaveBeenCalledWith(url);
      expect(result).toEqual([MOCK_ADMISSIONS[0]]);
    });
  });

  describe('create method', () => {
    it('should call post with correct URL and body', async () => {
      const url = `${MOCK_BASE_URL}/registrations`;
      const employeeData = {
        name: 'Igor Ferreira',
        email: 'igor_ferreira@teste.com',
        cpf: '23718621002',
        admissionDate: '2024-10-07',
      };

      mockApi.post = jest.fn(() => Promise.resolve({ status: 200 } as Response));

      const result = await admissionsService.create(employeeData);

      expect(mockApi.post).toHaveBeenCalledWith(url, {
        body: JSON.stringify({
          employeeName: employeeData.name,
          email: employeeData.email,
          cpf: employeeData.cpf,
          admissionDate: employeeData.admissionDate,
          status: AdmissionStatus.REVIEW,
        }),
      });
      expect(result).toBe(true);
    });

    it('should return false if response status is not 200', async () => {
      const employeeData = {
        name: 'Igor Ferreira',
        email: 'igor_ferreira@teste.com',
        cpf: '23718621002',
        admissionDate: '2024-10-07',
      };

      mockApi.post = jest.fn(() => Promise.resolve({ status: 400 } as Response));

      const result = await admissionsService.create(employeeData);

      expect(result).toBe(false);
    });
  });

  describe('update admission status', () => {
    it('should call patch with correct URL and body', async () => {
      const id = 'admissionId';
      const status = AdmissionStatus.REPROVED;

      mockApi.patch = jest.fn(() => Promise.resolve({ status: 200 } as Response));

      const result = await admissionsService.updateStatus({ id, status });

      expect(mockApi.patch).toHaveBeenCalledWith(
        `${MOCK_BASE_URL}/registrations/${id}`,
        {
          body: JSON.stringify({ status }),
        }
      );
      expect(result).toBe(true);
    });

    it('should return false if response status is not 200', async () => {
      const id = 'admissionId';
      const status = AdmissionStatus.REPROVED;

      mockApi.patch = jest.fn(() => Promise.resolve({ status: 400 } as Response));

      const result = await admissionsService.updateStatus({ id, status });

      expect(result).toBe(false);
    });
  });

  describe('delete method', () => {
    it('should call delete with correct URL', async () => {
      const id = 'admissionId';

      mockApi.delete = jest.fn(() => Promise.resolve({ status: 200 } as Response));

      const result = await admissionsService.delete({ id });

      expect(mockApi.delete).toHaveBeenCalledWith(`${MOCK_BASE_URL}/registrations/${id}`);
      expect(result).toBe(true);
    });

    it('should return false if response status is not 200', async () => {
      const id = 'admissionId';

      mockApi.delete = jest.fn(() => Promise.resolve({ status: 400 } as Response));

      const result = await admissionsService.delete({ id });

      expect(result).toBe(false);
    });
  });
});
