export default function ScopeOfWork({ formData, setFormData }) {
  const toggle = (field) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Scope of Work</h2>

      <label>
        <input type="checkbox" checked={formData.inspection || false} onChange={() => toggle("inspection")} />
        Inspection Required
      </label>

      <label>
        <input type="checkbox" checked={formData.sashRemoval || false} onChange={() => toggle("sashRemoval")} />
        Removal of Sashes
      </label>

      <h3 className="mt-4 font-semibold">Repairs Required:</h3>

      {["timberRepair", "glazingRepair", "draughtProof", "hardware"].map(
        (key) => (
          <label key={key} className="block">
            <input
              type="checkbox"
              checked={formData[key] || false}
              onChange={() => toggle(key)}
            />
            {key.replace(/([A-Z])/g, " $1")}
          </label>
        )
      )}

      <textarea
        placeholder="Painting / Finishing Details"
        className="input"
        value={formData.paintDetails || ""}
        onChange={(e) =>
          setFormData({ ...formData, paintDetails: e.target.value })
        }
      />
    </div>
  );
}
