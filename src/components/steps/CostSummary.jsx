export default function CostSummary({ formData, setFormData }) {
  const labourTotal =
    (formData.labourHours || 0) * (formData.hourlyRate || 0);

  const subtotal =
    Number(formData.materialCost || 0) + Number(labourTotal);

  const vat = (subtotal * Number(formData.vat || 0)) / 100;

  const grandTotal =
    subtotal + vat + Number(formData.additional || 0);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Cost Summary</h2>

      <input
        type="number"
        placeholder="Material Cost"
        className="input"
        value={formData.materialCost || ""}
        onChange={(e) =>
          setFormData({ ...formData, materialCost: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Additional Charges"
        className="input"
        value={formData.additional || ""}
        onChange={(e) =>
          setFormData({ ...formData, additional: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="VAT (%)"
        className="input"
        value={formData.vat || ""}
        onChange={(e) => setFormData({ ...formData, vat: e.target.value })}
      />

      <div className="mt-4 text-gray-700">
        <p>Labour Cost: £{labourTotal}</p>
        <p>Subtotal: £{subtotal}</p>
        <p>VAT: £{vat}</p>
        <p className="font-bold">Grand Total: £{grandTotal}</p>
      </div>
    </div>
  );
}
