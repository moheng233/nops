import { type Router } from "@nops/server/rpc";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<Router>();