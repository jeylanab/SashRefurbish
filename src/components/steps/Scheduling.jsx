export default function Scheduling({ formData, setFormData }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lead Time & Scheduling</h2>

      <input
        type="date"
        className="input"
        value={formData.startDate || ""}
        onChange={(e) =>
          setFormData({ ...formData, startDate: e.target.value })
        }
      />

      <input
        type="date"
        className="input"
        value={formData.endDate || ""}
        onChange={(e) =>
          setFormData({ ...formData, endDate: e.target.value })
        }
      />

      <textarea
        placeholder="Site Access Requirements"
        className="input"
        value={formData.access || ""}
        onChange={(e) =>
          setFormData({ ...formData, access: e.target.value })
        }
      />
    </div>
  );
}
