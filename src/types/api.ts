export type RequestConfig = {
  body?: string;
  headers?: Headers;
}

export interface IAPIDefinnitions {
   get(url: string, config?: RequestConfig): Promise<Response>;
   post(url: string, config?: RequestConfig): Promise<Response>;
   patch(url: string, config?: RequestConfig): Promise<Response>;
   put(url: string, config?: RequestConfig): Promise<Response>;
   delete(url: string, config?: RequestConfig): Promise<Response>;
}
