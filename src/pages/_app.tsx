import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { TasksProvider } from "../components/TasksContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TasksProvider>
      <Component {...pageProps} />
    </TasksProvider>
  );
}
