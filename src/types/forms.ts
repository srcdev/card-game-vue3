export type Options = { headers?: Record<string, any>; code?: number };

export type localesList = {
  id: String;
  label: String;
  value: String;
};

export interface IFormErrorFields {
  [key: string]: boolean;
}

export type errorFields = {
  [key: string]: boolean;
};

export type formFieldValues = {
  [key: string]: any;
};

export type sampleFormFields = {
  emailaddress: String;
  password: String;
  postcode: String;
  telephone: String;
  appointmentDate: String;
  dob: String;
  dateYear: String;
  comments: String;
  selection: String;
  acceptCheckbox: String;
  acceptRadioGroup: String;
};

export type loginFormFields = {
  emailaddress: String;
  password: String;
};

export interface User {
  id: String;
  firstName: String;
  lastName: String;
}

export interface LoginData {
  password: String;
  username: String;
}
