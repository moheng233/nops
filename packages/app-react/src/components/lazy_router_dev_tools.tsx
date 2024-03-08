import { lazy } from "react";

export const TanStackRouterDevtools = import.meta.env.DEV
    ? lazy(() =>
          import("@tanstack/router-devtools").then((res) => ({
              default: res.TanStackRouterDevtools,
          })),
      )
    : () => null;
