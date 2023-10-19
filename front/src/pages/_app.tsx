import { apolloClient } from "@/lib/apollo";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font",
  subsets: ["latin"],
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}
    >
      <ApolloProvider client={apolloClient}>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </ApolloProvider>
    </main>
  );
};

export default App;
