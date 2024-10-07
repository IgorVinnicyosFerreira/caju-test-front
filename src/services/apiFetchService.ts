import { IAPIDefinnitions, RequestConfig } from "../types/api";

class APIFetch implements IAPIDefinnitions {
  get(url: string, config?: RequestConfig) {
    return fetch(url, config);
  }

  post(url: string, config?: RequestConfig) {
    return fetch(url, {
      method: 'POST',
      ...(config ? config : {})
    });
  }

  patch(url: string, config?: RequestConfig) {
    return fetch(url, {
      method: 'PATCH',
      ...(config ? config : {})
    });
  }

  put(url: string, config?: RequestConfig) {
    return fetch(url, {
      method: 'PUT',
      ...(config ? config : {})
    });
  }

  delete(url: string, config?: RequestConfig) {
    return fetch(url, {
      method: 'DELETE',
      ...(config ? config : {})
    });
  }
}

export default APIFetch;
