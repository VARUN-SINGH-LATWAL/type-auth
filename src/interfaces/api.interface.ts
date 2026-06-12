export interface ApiResponse {
  message: string;
  success: boolean;
}

export interface ApiResponseLogin {
  message: string;
  success: boolean;
  accessToken? : string;
}