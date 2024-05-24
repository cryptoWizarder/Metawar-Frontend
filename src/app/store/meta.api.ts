import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { 
    ApiError,
    LoginRequest,
    LoginResponse,
    LogoutResponse,
    RegisterRequest,
    RegisterResponse,
    VerifyEmailRequest,
    VerifyEmailResponse,
    ResendCodeRequest,
    ResendCodeResponse,
    ChangePasswordRequest,
    ChangePasswordResponse,
    ChangeBirthdayRequest,
    ChangeBirthdayResponse,
    ChangeEmailRequest,
    ChangeEmailResponse,
 } from '../interfaces/api.interfaces';

import { setToken, setUser, resetUser } from './user.reducer';

const API_PREFIX = 'http://localhost:3001/api/v1';

export const displayError = (
    err: ApiError | undefined,
    defaultMessage = 'Error while sending the request',
  ) => {
    if (err?.errors?.length) {
      toast(err.errors[0].message, {
        type: 'error',
      });
    } else if (err?.message) {
      toast(err.message, {
        type: 'error',
      });
    } else if ((err as any)?.error?.message) {
      toast((err as any).error.message, {
        type: 'error',
      });
    } else {
      toast(defaultMessage, {
        type: 'error',
      });
    }
};

function getHeadersFromToken(token: string, json?: boolean) {
    const headers: Record<string, string> = {};
    if (json) headers['Content-Type'] = 'application/json';
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_PREFIX }),
    tagTypes: ['auth'],
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (creds) => ({
              body: creds,
              method: 'POST',
              url: '/auth/login',
              headers: getHeadersFromToken('', true),
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
              try {
                const {
                  data: { token, user },
                } = await queryFulfilled;
                dispatch(setToken(token));
                dispatch(setUser(user));
                toast('Logged in successfully', {
                  position: 'top-right',
                  closeButton: false,
                });
              } catch (e: any) {
                displayError(e as ApiError, 'Error while logging in');
              }
            },
            transformErrorResponse(err) {
              return err.data;
            },
          }),
        register: builder.mutation<boolean, RegisterRequest>({
            query: (payload) => ({
                body: payload,
                method: 'POST',
                url: '/auth/register',
                headers: getHeadersFromToken('', true),
            }),
            transformResponse(data: RegisterResponse) {
                return data.success;
            },
            transformErrorResponse(err) {
                return err.data as RegisterResponse;
            },
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                await queryFulfilled;
                toast('Registered successfully');
                } catch (e: any) {
                displayError(e as ApiError, 'Error while logging out');
                }
            },
        }),
        logout: builder.mutation<
          boolean,
          {
            token: string;
          }
        >({
          query: ({ token }) => ({
            method: 'POST',
            url: '/auth/logout',
            headers: getHeadersFromToken(token),
          }),
          transformResponse(response: LogoutResponse) {
            return response.success;
          },
          async onQueryStarted(_, { queryFulfilled, dispatch }) {
            try {
              await queryFulfilled;
              dispatch(resetUser());
              toast('Logged out successfully', {
                position: 'top-right',
                closeButton: false,
              });
            } catch (e: any) {
              displayError(e as ApiError, 'Error while logging out');
            }
          },
        }),
        verifyCode: builder.mutation<boolean, VerifyEmailRequest>({
            query: (payload) => ({
              body: payload,
              method: 'POST',
              url: '/auth/verifyCode',
              headers: getHeadersFromToken('', true),
            }),
            transformResponse(response: VerifyEmailResponse) {
              return response.success;
            },
            async onQueryStarted(_, { queryFulfilled }) {
              try {
                await queryFulfilled;
                toast('Account verified');
              } catch (e: any) {
                displayError(e as ApiError, 'Error while sending the verificatin code');
              }
            },
        }),
        resendCode: builder.mutation<boolean, ResendCodeRequest>({
            query: (payload) => ({
              body: payload,
              method: 'POST',
              url: '/auth/resendVerifyCode',
              headers: getHeadersFromToken('', true),
            }),
            transformResponse(response: ResendCodeResponse) {
              return response.success;
            },
            transformErrorResponse(err) {
              return err.data;
            },
            async onQueryStarted(_, { queryFulfilled }) {
              try {
                await queryFulfilled;
                toast('Verification code sent!');
              } catch (e: any) {
                displayError(e as ApiError, 'Error while sending the code');
              }
            },
          }),
        changePassword: builder.mutation<
          boolean,
          {
            payload: ChangePasswordRequest;
            token: string;
          }
        >({
          query: ({ payload, token }) => ({
            body: payload,
            method: 'POST',
            url: '/auth/changePassword',
            headers: getHeadersFromToken(token, true),
          }),
          transformResponse(response: ChangePasswordResponse) {
            return response.success;
          },
          async onQueryStarted(_, { queryFulfilled }) {
            try {
              await queryFulfilled;
              toast('Password changed!');
            } catch (e: any) {
              displayError(e as ApiError, 'Error while changing the password');
            }
          },
        }),
        changeBirthday: builder.mutation<
          ChangeBirthdayResponse,
          {
            payload: ChangeBirthdayRequest;
            token: string;
          }
        >({
          query: ({ payload, token }) => ({
            body: payload,
            method: 'POST',
            url: '/user/changeBirthday',
            headers: getHeadersFromToken(token, true),
          }),
          async onQueryStarted(_, { queryFulfilled, dispatch }) {
            try {
              const {
                data: { user },
              } = await queryFulfilled;
              dispatch(setUser(user));
              toast('Profile updated!');
            } catch (e: any) {
              displayError(e as ApiError, 'Error while changing the profile');
            }
          },
        }),
        changeEmail: builder.mutation<
          ChangeEmailResponse,
          {
            payload: ChangeEmailRequest;
            token: string;
          }
        >({
          query: ({ payload, token }) => ({
            body: payload,
            method: 'POST',
            url: '/user/changeEmail',
            headers: getHeadersFromToken(token, true),
          }),
          async onQueryStarted(_, { queryFulfilled, dispatch }) {
            try {
              const {
                data: { user, token },
              } = await queryFulfilled;
              dispatch(setUser(user));
              dispatch(setToken(token));
              toast('Profile updated!');
            } catch (e: any) {
              displayError(e as ApiError, 'Error while changing the profile');
            }
          },
        }),
    })
});  
  