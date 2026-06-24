import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
});

export const QueryProvider = ({
  children,
}: PropsWithChildren): React.JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
