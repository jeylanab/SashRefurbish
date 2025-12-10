export default function Approval({ formData, setFormData }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Client Approval</h2>

      <input
        type="text"
        placeholder="Client Name"
        className="input"
        value={formData.approvalName || ""}
        onChange={(e) =>
          setFormData({ ...formData, approvalName: e.target.value })
        }
      />

      <input
        type="date"
        className="input"
        value={formData.approvalDate || ""}
        onChange={(e) =>
          setFormData({ ...formData, approvalDate: e.target.value })
        }
      />
    </div>
  );
}
