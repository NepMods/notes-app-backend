/* 
 Model Definaltion for Response, Strictly to be used

*/
export interface BasicResponse {
    status: number;
    message: string;
    error: boolean;
    data: any | [];
}