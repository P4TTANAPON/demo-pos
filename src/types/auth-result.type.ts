export interface LoginResult {
    result:string,
    token:string,
    refreshToken:string,
    error?:string
}

export interface RegisterResult {
    result: string;
    error?: string;
  }