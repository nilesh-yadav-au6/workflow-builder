import "./index.css";
import HomePage from "./pages/HomePage";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    </>
  );
}

export default App;
