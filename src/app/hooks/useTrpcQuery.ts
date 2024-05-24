import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { trpc } from "../helper/trpc";

export const useTrpcQuery = <T, G = any>(
  method: string,
  input: T,
  options?: UseQueryOptions<G>
) =>
  useQuery({
    queryKey: ["trpc", method],
    queryFn: async () => {
      let result;
      try {
        result = await trpc.query(method, input);
      } catch (e) {
        if ((e as any)?.message === "INVALID_ACCESS_TOKEN") {
          localStorage.removeItem("token");
          result = (await trpc.query(method, input)) as G;
        } else {
          throw e;
        }
      }
      return result as G;
    },
    ...(options || {}),
  });