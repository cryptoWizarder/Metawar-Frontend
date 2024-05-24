export type AuthContext = {
    user: any;
    isAuthenticated: () => boolean;
    // hasRole: (role: string) => boolean;
    signOut: () => void;
    getToken: () => string;
    getUser: () => any;
};