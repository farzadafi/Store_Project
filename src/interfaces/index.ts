export interface LoginFormValue {
  username: string,
  password: string
}

export interface LoginErrors {
  username?: string;
  password?: string;
}

export interface ResultMessage {
  message: string,
  code: number
}