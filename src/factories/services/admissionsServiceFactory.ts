import AdmissionsService from '../../services/admissionsService';
import APIFetch from '../../services/apiFetchService';


class AdmissionsServiceFactory {
  private static _instance: AdmissionsService;

  static make(): AdmissionsService {
    if (!this._instance) {
      const api = new APIFetch();
      this._instance = new AdmissionsService(api);
    }

    return this._instance;
  }
}

export default AdmissionsServiceFactory;