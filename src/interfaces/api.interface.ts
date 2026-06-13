export interface ApiResponse {
  message: string;
  success: boolean;
}

export interface ApiResponseLogin extends ApiResponse {
  accessToken? : string;
}