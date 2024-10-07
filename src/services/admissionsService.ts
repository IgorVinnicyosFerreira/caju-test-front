import AdmissionStatus from '~/constants/admissionStatus';
import { Admission } from '~/types/admission';
import { IAPIDefinnitions } from "~/types/api";

type ListAdmissionsParams = {
  filters?: {
    cpf?: string;
  };
};

type UpdateAdmissionStatusParams = {
  status: AdmissionStatus;
  id: string;
}

type deleteAdmissionParams = {
  id: string;
}

class AdmissionsService {
  private api: IAPIDefinnitions;

  constructor(api: IAPIDefinnitions) {
    this.api = api;
  }

  async listAdmissions({ filters }: ListAdmissionsParams = {}): Promise<Admission[]> {
    let url = `${import.meta.env.VITE_API_ADMISSIONS_BASE_URL}/registrations`;

    if (filters?.cpf) {
      url = `${url}?cpf=${filters.cpf}`; 
    }

    const response = await this.api.get(url);
    const data = await response.json() as Admission[];

    return data;
  }

  async updateAdmissionStatus({ id, status }: UpdateAdmissionStatusParams): Promise<boolean> {
    let url = `${import.meta.env.VITE_API_ADMISSIONS_BASE_URL}/registrations/${id}`;
    const response = await this.api.patch(
      url,
      {
        body: JSON.stringify({
          status
        })
      }
    );

    return response.status === 200;
  }

  async delete({ id }: deleteAdmissionParams): Promise<boolean> {
    const url = `${import.meta.env.VITE_API_ADMISSIONS_BASE_URL}/registrations/${id}`;
    const response = await this.api.delete(url);

    return response.status === 200;
  }
}

export default AdmissionsService;
