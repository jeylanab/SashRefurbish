export default function WindowSchedule({ formData, setFormData }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Window Schedule</h2>

      <input
        type="text"
        placeholder="Window Location"
        className="input"
        value={formData.windowLocation || ""}
        onChange={(e) =>
          setFormData({ ...formData, windowLocation: e.target.value })
        }
      />

      <select
        className="input"
        value={formData.windowType || ""}
        onChange={(e) =>
          setFormData({ ...formData, windowType: e.target.value })
        }
      >
        <option>Select Window Type</option>
        <option>Sash</option>
        <option>Casement</option>
        <option>Tilt & Turn</option>
        <option>Sliding</option>
      </select>

      <input
        type="number"
        placeholder="Quantity"
        className="input"
        value={formData.windowQty || ""}
        onChange={(e) =>
          setFormData({ ...formData, windowQty: e.target.value })
        }
      />

      <textarea
        placeholder="Existing Condition Notes"
        className="input"
        value={formData.windowCondition || ""}
        onChange={(e) =>
          setFormData({ ...formData, windowCondition: e.target.value })
        }
      />
    </div>
  );
}
