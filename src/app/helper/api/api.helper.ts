import axios from 'axios';

import { Trpc, tRPCError } from './trpc.interfaces';
import { ITRPCResponse } from './api.interfaces';
import { Store } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { API_URL } from '../contsants.helper';
import { resetUser } from '@/app/store/user.reducer';
import { toast } from 'react-toastify';

export const TRPC_URL = `${API_URL}/trpc`;

export const defaultHttp = axios.create();
const http = axios.create();

let store: Store;

export const injectStore = (_store: Store) => {
  store = _store;
};

export const displayError = (
  err: tRPCError | undefined,
  defaultMessage = 'Error while sending the request',
) => {
  if ((err as any)?.errors?.length) {
    toast((err as any).errors[0].message, {
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

http.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const apiToken = state.user?.token;

    if (apiToken) {
      config.headers.Authorization = `Bearer ${apiToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      store.dispatch(resetUser());
    }
    return Promise.reject(error);
  },
);

export const trpc = new Proxy<Trpc>({} as Trpc, {
  get(_, module) {
    return new Proxy(
      {},
      {
        get(_, method) {
          return {
            query(arg: unknown) {
              return http
                .get<ITRPCResponse>(`${TRPC_URL}/${String(module)}.${String(method)}`, {
                  params:
                    typeof arg !== 'undefined'
                      ? {
                          input: JSON.stringify(arg),
                        }
                      : {},
                })
                .then((response) => {
                  return response.data?.result?.data;
                })
                .catch((error) => {
                  return Promise.reject(error?.response?.data?.error);
                });
            },
            mutate(arg: unknown) {
              return http
                .post(`${TRPC_URL}/${String(module)}.${String(method)}`, arg)
                .then((response) => {
                  return response.data?.result?.data;
                })
                .catch((error) => {
                  return Promise.reject(error?.response?.data?.error);
                });
            },
          };
        },
      },
    );
  },
});

export default http;
