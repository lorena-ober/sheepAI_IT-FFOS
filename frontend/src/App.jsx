import { useState } from "react";
import FilterForm from "./components/FilterForm";
import Feed from "./components/Feed";

function App() {
  const [preferences, setPreferences] = useState(null);

  return (
    <div className="app-root">
      {!preferences ? (
        <FilterForm onSubmit={setPreferences} />
      ) : (
        <Feed preferences={preferences} onBack={() => setPreferences(null)} />
      )}
    </div>
  );
}

export default App;

