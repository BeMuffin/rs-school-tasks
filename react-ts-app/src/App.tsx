import Connector from './components/Connector';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div>
        <h1>Pokemon Search</h1>
        <Connector />
      </div>
    </ErrorBoundary>
  );
}

export default App;
