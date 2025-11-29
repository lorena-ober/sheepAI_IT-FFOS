// frontend/src/components/FilterForm.jsx
export default function FilterForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Za sada šaljemo mock preferences samo da radi
    const mockPreferences = {
      interests: [],
      contentType: "all",
      strictness: "balanced",
      useHeatmap: false,
      personalization: "risk",
    };

    onSubmit(mockPreferences);
  };

  return (
    <div className="filter-form-wrapper">
      <h1>Personalize Your Tech News Feed</h1>
      <p>Select your interests and preferences.</p>

      <form onSubmit={handleSubmit}>
        {/* Kasnije ćemo ovdje dodati checkboxes i radio buttons */}

        <button type="submit">Generate My Feed</button>
      </form>
    </div>
  );
}
