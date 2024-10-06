import { IAPIDefinnitions } from "../types/api";
import isString from "../utils/isString";

class APIFetch implements IAPIDefinnitions {
  get(configOrUrl: Request | string) {
    return fetch(configOrUrl);
  }

  post(configOrUrl: Request | string) {
    const isStringURL = isString(configOrUrl);

    const requestConfig = (
      isStringURL
        ? {
            method: "PUT",
            url: configOrUrl,
          }
        : configOrUrl
    ) as Request;

    return fetch(requestConfig);
  }

  put(configOrUrl: Request | string) {
    const isStringURL = isString(configOrUrl);

    const requestConfig = (
      isStringURL
        ? {
            method: "PUT",
            url: configOrUrl,
          }
        : configOrUrl
    ) as Request;

    return fetch(requestConfig);
  }

  delete(configOrUrl: Request | string) {
    const isStringURL = isString(configOrUrl);

    const requestConfig = (
      isStringURL
        ? {
            method: "DELETE",
            url: configOrUrl,
          }
        : configOrUrl
    ) as Request;

    return fetch(requestConfig);
  }
}

export default APIFetch;
