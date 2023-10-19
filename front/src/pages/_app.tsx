import { apolloClient } from "@/lib/apollo";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.className
      )}
    >
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </div>
  );
};

export default App;
