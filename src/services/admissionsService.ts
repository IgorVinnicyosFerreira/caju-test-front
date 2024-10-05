import { IAPIDefinnitions } from "../types/api";

type ListAdmissionsParams = {
  filters?: {
    cpf?: string;
  };
};

class AdmissionsService {
  private api: IAPIDefinnitions;

  constructor(api: IAPIDefinnitions) {
    this.api = api;
  }

  async listAdmissions({ filters }: ListAdmissionsParams = {}) {
    let url = `${import.meta.env.VITE_API_ADMISSIONS_BASE_URL}/registrations`;

    if (filters?.cpf) {
      url = `${url}?cpf=${filters.cpf}`; 
    }

    const response = await this.api.get(url);
    const data = await response.json();

    return data;
  }
}

export default AdmissionsService;
