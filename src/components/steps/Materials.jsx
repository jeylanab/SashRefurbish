export default function Materials({ formData, setFormData }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Materials Required</h2>

      <input
        type="text"
        placeholder="Glass Type"
        className="input"
        value={formData.glassType || ""}
        onChange={(e) =>
          setFormData({ ...formData, glassType: e.target.value })
        }
      />

      <textarea
        placeholder="Timber Components"
        className="input"
        value={formData.timber || ""}
        onChange={(e) =>
          setFormData({ ...formData, timber: e.target.value })
        }
      />

      <textarea
        placeholder="Hardware Items"
        className="input"
        value={formData.hardware || ""}
        onChange={(e) =>
          setFormData({ ...formData, hardware: e.target.value })
        }
      />

      <textarea
        placeholder="Paint & Finishes"
        className="input"
        value={formData.paint || ""}
        onChange={(e) =>
          setFormData({ ...formData, paint: e.target.value })
        }
      />
    </div>
  );
}
