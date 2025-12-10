export default function Terms({ formData, setFormData }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Warranty & Terms</h2>

      <textarea
        placeholder="Warranty Coverage"
        className="input"
        value={formData.warranty || ""}
        onChange={(e) =>
          setFormData({ ...formData, warranty: e.target.value })
        }
      />

      <textarea
        placeholder="Payment Terms"
        className="input"
        value={formData.paymentTerms || ""}
        onChange={(e) =>
          setFormData({ ...formData, paymentTerms: e.target.value })
        }
      />
    </div>
  );
}
