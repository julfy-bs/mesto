export type CustomError = ErrorResponseType | ValidationErrorResponseType;


export type ErrorResponseType = {
  statusCode: number;
  name: string;
  message: string;
  body: string;
}

type ValidationRules = {
  rules: string[];
  keys: string[];
}

export type ValidationErrorResponseType = {
  statusCode: number;
  name: string;
  message: string;
  body?: ValidationRules;
  params?: ValidationRules;
  cookies?: ValidationRules;
  headers?: ValidationRules;
};
