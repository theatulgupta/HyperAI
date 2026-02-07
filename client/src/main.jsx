import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));

if (!PUBLISHABLE_KEY) {
  root.render(
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-lg w-full rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
        <h1 className="text-xl font-semibold">Missing Clerk Key</h1>
        <p className="mt-2 text-sm text-slate-500">
          Add your Clerk publishable key to
          <span className="font-medium"> client/.env</span> as
          <span className="font-medium"> VITE_CLERK_PUBLISHABLE_KEY</span>.
        </p>
      </div>
    </div>,
  );
} else {
  root.render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </ClerkProvider>,
  );
}
