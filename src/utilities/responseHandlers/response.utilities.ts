import { Response } from "express";


export interface ResponseDetails {
  message: string;
  statusCode: number;
  data?: any
  details?: any
  info?: any
}

const responseHandler = (
  response: Response,
  message: string,
  statusCode: number,
  data?: any,
  details?: any,
  info?: any
) => {

  return response.status(statusCode).json({
    status: statusCode === 201 || statusCode === 200 ? "success" : "error",
    message: message,
    data: data || null,
    details,
    info
  });
};



const handleServicesResponse = (statusCode: number, message: string, data?: any) => {
  const responseHandler: ResponseDetails = {
    statusCode: 0,
    message: "",
    data: {},
  };
  responseHandler.message = message;
  responseHandler.statusCode = statusCode;
  responseHandler.data = data
  return responseHandler
};

export default {
  responseHandler,
  handleServicesResponse
};
