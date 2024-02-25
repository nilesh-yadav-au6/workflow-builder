import { useState, useEffect, ReactNode, ErrorInfo, FC } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => {
  const [error, setError] = useState<ErrorBoundaryState>({ hasError: false });

  useEffect(() => {
    const handleError = (error: Error, errorInfo: ErrorInfo) => {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
      setError({ hasError: true });
      // You can log the error or send it to an error reporting service
    };

    const handleWindowError = (event: Event) => {
      event.preventDefault();
      handleError(new Error("Uncaught error"), { componentStack: "" });
    };

    window.addEventListener("error", handleWindowError);

    return () => {
      window.removeEventListener("error", handleWindowError);
    };
  }, []);

  if (error.hasError) {
    return (
      <h5 className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen flex justify-center items-center text-bold font-bold text-indigo-50">
        Something went wrong.
      </h5>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
