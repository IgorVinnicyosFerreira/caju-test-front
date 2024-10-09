import AdmissionStatus from '~/constants/admissionStatus';
import { VITE_API_ADMISSIONS_BASE_URL } from '~/constants/env';
import { Admission } from '~/types/admission';
import { IAPIDefinnitions } from "~/types/api";

type ListParams = {
  filters?: {
    cpf?: string;
  };
};

type UpdateStatusParams = {
  status: AdmissionStatus;
  id: string;
}

type DeleteAdmissionParams = {
  id: string;
}

type CreateAdmissionParams = {
  name: string;
  email: string;
  cpf: string;
  admissionDate: string;
}

class AdmissionsService {
  private api: IAPIDefinnitions;

  constructor(api: IAPIDefinnitions) {
    this.api = api;
  }

  async list({ filters }: ListParams = {}): Promise<Admission[]> {
    let url = `${VITE_API_ADMISSIONS_BASE_URL}/registrations`;

    if (filters?.cpf) {
      url = `${url}?cpf=${filters.cpf}`; 
    }

    const response = await this.api.get(url);
    const data = await response.json() as Admission[];

    return data;
  }

  async create({ name, email, cpf, admissionDate }: CreateAdmissionParams): Promise<boolean> {
    const url = `${VITE_API_ADMISSIONS_BASE_URL}/registrations`;

    const response = await this.api.post(url, {
      body: JSON.stringify({
        employeeName: name,
        email,
        cpf,
        admissionDate,
        status: AdmissionStatus.REVIEW
      })
    });

    if (response.status !== 201) {
      throw new Error('Failed to create admission');
    }

    return response.status === 201;
  }

  async updateStatus({ id, status }: UpdateStatusParams): Promise<boolean> {
    const url = `${VITE_API_ADMISSIONS_BASE_URL}/registrations/${id}`;
    const response = await this.api.patch(
      url,
      {
        body: JSON.stringify({
          status
        })
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to update status');
    }

    return response.status === 200;
  }

  async delete({ id }: DeleteAdmissionParams): Promise<boolean> {
    const url = `${VITE_API_ADMISSIONS_BASE_URL}/registrations/${id}`;
    const response = await this.api.delete(url);

    if (response.status !== 200) {
      throw new Error('Failed to delete admission');
    }

    return response.status === 200;
  }
}

export default AdmissionsService;
