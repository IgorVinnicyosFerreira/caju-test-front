export interface IAPIDefinnitions {
   get(config: Request | string): Promise<Response>;
   post(config: Request | string): Promise<Response>;
   put(config: Request | string): Promise<Response>;
   delete(config: Request | string): Promise<Response>;
}
