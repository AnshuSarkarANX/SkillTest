import { useEffect, useState } from 'react'
import { topBar } from './state/store';
function App() {
  const [count, setCount] = useState(0)
  const useTopBar = topBar((state) => state);
   useEffect(() => {
      useTopBar.setHasBackButton(false);
    }, []);

  return (
    <div className="font-body">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs text-xl">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App
