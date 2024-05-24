export type Nullable<T> = T | null;

export type ApiError = {
    success: false;
    message?: string;
    errors?: {
      message: string;
    }[];
};

export interface ITRPCResponse<T = unknown> {
  result: {
    data: T;
  };
}

export type ApiSuccess = {
    success: true;
};

export type ApiResponse<TPayload = unknown, TAttrName extends string = 'data'> = Record<
  TAttrName,
  TPayload
> &
  ApiSuccess;

export interface IUser {
    id: number;
    username: string;
    email: string;
    birthday: string;
    active: boolean;
}
export type LoginRequest = {
    email: string;
    password: string;
};
  
export type LoginResponse = ApiResponse<IUser, 'user'> & {
    token: string;
};

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
};

export type RegisterResponse = ApiResponse;

/**
 * Logout Api
 */
export type LogoutResponse = ApiResponse;

/**
 * Resend verification code
 */
export type ResendCodeType = 'forgot-password' | 'validate-email';

export type ResendCodeRequest = {
  email: string;
  type: ResendCodeType;
};

export type ResendCodeResponse = ApiResponse;

/**
 * Verify Email using verification code
 */
export type VerifyEmailRequest = {
    email: string;
    code: number;
};
  
export type VerifyEmailResponse = ApiResponse;

/**
 * Verify Reset Password
 */
export type VerifyResetPasswordRequest = {
email: string;
password: string;
code: number;
};

export type VerifyResetPasswordResponse = ApiResponse;

/**
 * Change current user password
 */
export type ChangePasswordRequest = {
  old_password: string;
  new_password: string;
};

export type ChangePasswordResponse = ApiResponse;

/**
 * Change current user birthday
 */
export type ChangeBirthdayRequest = {
  birthday: Date;
};

export type ChangeBirthdayResponse = ApiResponse<IUser, 'user'>;

/**
 * Change current user email
 */
export type ChangeEmailRequest = {
  code: number;
  email: string;
  new_email: string;
};

export type ChangeEmailResponse = ApiResponse<IUser, 'user'> & {
  token: string;
};