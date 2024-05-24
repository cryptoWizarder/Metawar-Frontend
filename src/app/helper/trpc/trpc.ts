import { httpLink, createTRPCUntypedClient } from "@trpc/client";
export const apiPrefix = "http://localhost:3001/api/v1";

const trpcLink = httpLink({
  url: `${apiPrefix}`,
  headers() {
    const token = localStorage.getItem("token");
    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  },
});

export const trpc = createTRPCUntypedClient({
  links: [trpcLink],
});