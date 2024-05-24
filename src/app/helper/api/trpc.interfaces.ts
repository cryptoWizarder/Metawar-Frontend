
export type Arg<T extends (...args: any) => any> = Parameters<T>[0];

export type tRPCError = {
  message: string;
  code: number;
  data: {
    code: string;
    httpStatus: number;
    path: string;
  };
};

export type Trpc = {
  me: {
    get: { query: <T>() => Promise<T> };
    update: { mutate: <T>(input: { firstname: string; lastname: string }) => Promise<T> };
    balance: { mutate: <T>() => Promise<T> };
    sessions: { query: <T>() => Promise<T> };
    disconnect: { mutate: <T>(input: { sid?: string | undefined }) => Promise<T> };
    changePassword: {
      mutate: <T>(input: {
        oldPassword: string;
        newPassword: string;
        disconnect?: boolean;
      }) => Promise<T>;
    };
    disconnectWallet: { mutate: <T>() => Promise<T> };
  };
  eos: {
    link: { mutate: <T>(input: { token: string }) => Promise<T> };
    login: { mutate: <T>(input: { token: string }) => Promise<T> };
    unlink: { mutate: <T>() => Promise<T> };
  };
  auth: {
    login: { mutate: <T>(input: { email: string; password: string }) => Promise<T> };
    logout: { mutate: <T>() => Promise<T> };
    register: {
      mutate: <T>(input: {
        email: string;
        password: string;
        firstname: string;
        lastname: string;
      }) => Promise<T>;
    };
    verifyCode: { mutate: <T>(input: { email: string; code: string }) => Promise<T> };
    resendCode: {
      mutate: <T>(input: {
        email: string;
        type: 'forgot-password' | 'validate-email';
      }) => Promise<T>;
    };
    changePassword: {
      mutate: <T>(input: { email: string; code: string; password: string }) => Promise<T>;
    };
  };
  nonce: {
    generate: {
      mutate: <T>(input: {
        wallet: string;
        provider?: 'metamask' | 'gamestop' | 'other';
        network?: string | undefined;
      }) => Promise<T>;
    };
    validate: { mutate: <T>(input: { signature: string; id: string }) => Promise<T> };
  };
  asset: {
    list: {
      query: <T>(input: {
        top?: number | null;
        skip?: number | null;
        collection?: ((string | null) | null) | undefined;
      }) => Promise<T>;
    };
    tokens: { query: <T>() => Promise<T> };
    collections: { query: <T>() => Promise<T> };
  };
  agenda: { run: { mutate: <T>(input: { name: 'nfts:fetch' }) => Promise<T> } };
};
