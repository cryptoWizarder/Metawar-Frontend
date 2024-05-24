'use client'
import { useMutation } from "@tanstack/react-query";
import React, { createContext, ReactNode } from "react";
import { trpc } from "@/app/helper/trpc";
import { useTrpcQuery } from "@/app/hooks/useTrpcQuery";


export interface Session {
    sub?: string;
    uid?: string;
    email?: string;
    // roles?: Role[];
    last_attempted_login?: string;
    nb_attempts?: number;
    email_verified?: boolean;
    nickname?: string;
    name?: string;
    picture?: string;
}

type PublicSession = Pick<
    Session,
    "uid" | "email" | "nickname" | "picture" | "name"
> | null;

interface AuthContextProps {
    isLoading: boolean;
    user?: PublicSession;
    signOut: () => void;
    // hasOneOfRoles: (...roles: Role[]) => boolean;
    isAuthenticated: () => boolean;
    getToken: () => string | null;
    getUser: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    isLoading: true,
    signOut() {
        // Do nothing
    },
    // hasOneOfRoles() {
    //   return false;
    // },
    isAuthenticated() {
        return false;
    },
    getToken() {
        return null;
    },
    getUser() {
        // Do nothing
    },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const {
        data: user,
        refetch,
        isLoading,
    } = useTrpcQuery<any, PublicSession>("auth.me", {});

    const { mutate } = useMutation({
        mutationFn() {
            return trpc.mutation("auth.signout");
        },
        onSuccess() {
            refetch();
        },
    });

    function signOut() {
        mutate();
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    function getToken() {
        return localStorage.getItem("token");
    }

    // function hasOneOfRoles(...roles: Role[]): boolean {
    //   if (!user?.roles?.length) return false;
    //   return !!roles.find((role) => user.roles?.includes(role));
    // }

    function isAuthenticated(): boolean {
        return !!user?.uid;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                signOut,
                getToken,
                //   hasOneOfRoles,
                isAuthenticated,
                getUser: refetch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};