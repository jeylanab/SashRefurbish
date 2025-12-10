export default function Labour({ formData, setFormData }) {
  const total = (formData.labourHours || 0) * (formData.hourlyRate || 0);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Labour Breakdown</h2>

      <textarea
        placeholder="Labour Tasks"
        className="input"
        value={formData.labourTasks || ""}
        onChange={(e) =>
          setFormData({ ...formData, labourTasks: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Estimated Hours"
        className="input"
        value={formData.labourHours || ""}
        onChange={(e) =>
          setFormData({ ...formData, labourHours: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Hourly Rate"
        className="input"
        value={formData.hourlyRate || ""}
        onChange={(e) =>
          setFormData({ ...formData, hourlyRate: e.target.value })
        }
      />

      <p className="mt-4 text-gray-600">
        <strong>Total Labour Cost:</strong> £{total}
      </p>
    </div>
  );
}
