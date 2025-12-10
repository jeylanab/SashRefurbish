export default function ClientInfo({ formData, setFormData }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Client Information</h2>

      <input
        type="text"
        placeholder="Client Name"
        className="input"
        value={formData.clientName || ""}
        onChange={(e) =>
          setFormData({ ...formData, clientName: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Address"
        className="input"
        value={formData.clientAddress || ""}
        onChange={(e) =>
          setFormData({ ...formData, clientAddress: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Contact Number"
        className="input"
        value={formData.contact || ""}
        onChange={(e) =>
          setFormData({ ...formData, contact: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Property Address"
        className="input"
        value={formData.propertyAddress || ""}
        onChange={(e) =>
          setFormData({ ...formData, propertyAddress: e.target.value })
        }
      />

      {/* Auto-fill fields */}
      <p className="text-gray-500 mt-4">
        Quote Date: <strong>{new Date().toLocaleDateString()}</strong>
      </p>

      <p className="text-gray-500">
        Quote Reference:{" "}
        <strong>
          {formData.reference ||
            `QTN-${Date.now().toString().slice(-5)}`}
        </strong>
      </p>
    </div>
  );
}
