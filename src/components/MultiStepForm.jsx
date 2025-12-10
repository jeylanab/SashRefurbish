import { useState, useRef } from "react";
import { motion } from "framer-motion";

// CONFIG: change these numbers to update pricing rules without touching component logic
const PRICING = {
  base: 75, // base price per window
  sizeBands: [
    { label: "Small (<0.6 m²)", max: 0.6, add: 0 },
    { label: "Medium (0.6 - 1.2 m²)", max: 1.2, add: 25 },
    { label: "Large (>1.2 m²)", max: Infinity, add: 55 },
  ],
  glazing: {
    single: 0,
    double: 40,
    triple: 90,
  },
  height: {
    ground: 0,
    first: 30,
    second: 60,
    scaffold: 120,
  },
  condition: {
    good: 0,
    fair: 35,
    poor: 80,
  },
  perWindowMultiplier: 1, // overall multiplier if needed
};

function Progress({ step, total }) {
  return (
    <div className="mb-6">
      <div className="text-sm text-gray-600 mb-1">Step {step} of {total}</div>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-green-600 h-2 rounded"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="bg-white p-6 rounded-2xl shadow-lg border"
    >
      {children}
    </motion.div>
  );
}

export default function MultiStepForm() {
  const TOTAL_STEPS = 8;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    windowStyle: "",
    widthM: "", // meters
    heightM: "",
    sizeBand: "",
    glazing: "single",
    heightAccess: "ground",
    condition: "good",
    quantity: 1,
    photos: [],
    clientName: "",
    clientEmail: "",
    notes: "",
  });

  const fileRef = useRef(null);

  // helper to update nested state
  const upd = (patch) => setFormData((s) => ({ ...s, ...patch }));

  // calculate area in square meters
  const getArea = () => {
    const w = parseFloat(formData.widthM) || 0;
    const h = parseFloat(formData.heightM) || 0;
    return +(w * h).toFixed(3);
  };

  // determine size band based on area
  const getSizeBand = (area) => {
    const band = PRICING.sizeBands.find((b) => area <= b.max);
    return band ? band.label : PRICING.sizeBands[0].label;
  };

  // main price calculation per window
  const calcPerWindow = () => {
    const area = getArea();
    const sizeBandObj = PRICING.sizeBands.find((b) => area <= b.max) || PRICING.sizeBands[1];
    const glazingExtra = PRICING.glazing[formData.glazing] || 0;
    const heightExtra = PRICING.height[formData.heightAccess] || 0;
    const conditionExtra = PRICING.condition[formData.condition] || 0;

    const price = PRICING.base + sizeBandObj.add + glazingExtra + heightExtra + conditionExtra;
    return Math.round(price * PRICING.perWindowMultiplier);
  };

  const calcTotal = () => {
    const per = calcPerWindow();
    const qty = Number(formData.quantity) || 1;
    return per * qty;
  };

  const handleFiles = (files) => {
    const arr = Array.from(files).slice(0, 6); // max 6
    const mapped = arr.map((f) => ({ name: f.name, file: f, url: URL.createObjectURL(f) }));
    upd({ photos: mapped });
  };

  const removePhoto = (index) => {
    const copy = [...formData.photos];
    copy.splice(index, 1);
    upd({ photos: copy });
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    // here you would call your API
    // build FormData for file upload
    const payload = new FormData();
    payload.append("data", JSON.stringify(formData));
    formData.photos.forEach((p, i) => payload.append("photo_" + i, p.file));

    console.log("Submitting form (mock):", { formData, total: calcTotal() });
    alert("Quote request sent. Total estimate: £" + calcTotal());

    // reset or redirect after submission
  };

  // small components for steps
  const WindowStyleStep = (
    <Card>
      <h3 className="text-2xl font-semibold mb-3">Pick a window style</h3>
      <p className="text-sm text-gray-500 mb-4">Click a sketch to select the style.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[{ id: "A", label: "Sash & Case", src: "/assets/window1.png" }, { id: "B", label: "Casement", src: "/assets/window2.png" }, { id: "C", label: "Sliding", src: "/assets/window3.png" }].map((w) => (
          <button
            key={w.id}
            onClick={() => upd({ windowStyle: w.id })}
            className={`group border rounded-xl p-3 flex flex-col items-center gap-2 hover:shadow-lg transition ${formData.windowStyle === w.id ? "border-green-600 shadow-xl" : "border-gray-200"}`}
          >
            <div className="w-full h-32 flex items-center justify-center">
              <img src={w.src} alt={w.label} className="max-h-full object-contain" />
            </div>
            <div className="text-sm font-medium text-gray-700">{w.label}</div>
          </button>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={back} className="flex-1 py-2 rounded-xl bg-gray-100">Back</button>
        <button onClick={next} className="flex-1 py-2 rounded-xl bg-green-600 text-white">Next</button>
      </div>
    </Card>
  );

  const SizeStep = (
    <Card>
      <h3 className="text-2xl font-semibold mb-3">Measure the window</h3>
      <p className="text-sm text-gray-500 mb-4">Enter width & height in meters (e.g. 0.9, 1.2). We calculate area automatically.</p>

      <div className="grid grid-cols-2 gap-3">
        <input
          inputMode="decimal"
          placeholder="Width (m)"
          className="p-3 border rounded-xl"
          value={formData.widthM}
          onChange={(e) => upd({ widthM: e.target.value })}
        />
        <input
          inputMode="decimal"
          placeholder="Height (m)"
          className="p-3 border rounded-xl"
          value={formData.heightM}
          onChange={(e) => upd({ heightM: e.target.value })}
        />
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <div>Calculated area: <strong>{getArea()} m²</strong></div>
        <div>Detected size band: <strong>{getSizeBand(getArea())}</strong></div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={back} className="flex-1 py-2 rounded-xl bg-gray-100">Back</button>
        <button onClick={next} className="flex-1 py-2 rounded-xl bg-green-600 text-white">Next</button>
      </div>
    </Card>
  );

  const GlazingStep = (
    <Card>
      <h3 className="text-2xl font-semibold mb-3">Choose glazing</h3>
      <p className="text-sm text-gray-500 mb-4">Different glazing options affect price and performance.</p>

      <div className="grid grid-cols-3 gap-3">
        {[
          { key: "single", label: "Single" },
          { key: "double", label: "Double" },
          { key: "triple", label: "Triple" },
        ].map((g) => (
          <button
            key={g.key}
            onClick={() => upd({ glazing: g.key })}
            className={`p-4 rounded-xl border text-center ${formData.glazing === g.key ? "border-green-600 shadow-xl" : "border-gray-200"}`}
          >
            <div className="text-sm font-medium">{g.label}</div>
            <div className="text-xs text-gray-500">£{PRICING.glazing[g.key]}</div>
          </button>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={back} className="flex-1 py-2 rounded-xl bg-gray-100">Back</button>
        <button onClick={next} className="flex-1 py-2 rounded-xl bg-green-600 text-white">Next</button>
      </div>
    </Card>
  );

  const HeightStep = (
    <Card>
      <h3 className="text-2xl font-semibold mb-3">Access & Height</h3>
      <p className="text-sm text-gray-500 mb-4">Tell us how easy it is to reach the window.</p>

      <div className="grid grid-cols-2 gap-3">
        {[
          { key: "ground", label: "Ground level" },
          { key: "first", label: "First floor" },
          { key: "second", label: "Second floor" },
          { key: "scaffold", label: "Scaffold / Specialist" },
        ].map((h) => (
          <button
            key={h.key}
            onClick={() => upd({ heightAccess: h.key })}
            className={`p-3 rounded-xl border text-left ${formData.heightAccess === h.key ? "border-green-600 shadow-xl" : "border-gray-200"}`}
          >
            <div className="font-medium">{h.label}</div>
            <div className="text-xs text-gray-500">£{PRICING.height[h.key]}</div>
          </button>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={back} className="flex-1 py-2 rounded-xl bg-gray-100">Back</button>
        <button onClick={next} className="flex-1 py-2 rounded-xl bg-green-600 text-white">Next</button>
      </div>
    </Card>
  );

  const ConditionStep = (
    <Card>
      <h3 className="text-2xl font-semibold mb-3">Window Condition</h3>
      <p className="text-sm text-gray-500 mb-4">Be honest — the condition affects repair complexity.</p>

      <div className="flex gap-3">
        {[
          { key: "good", label: "Good" },
          { key: "fair", label: "Fair" },
          { key: "poor", label: "Poor" },
        ].map((c) => (
          <button
            key={c.key}
            onClick={() => upd({ condition: c.key })}
            className={`flex-1 p-3 rounded-xl border text-center ${formData.condition === c.key ? "border-green-600 shadow-xl" : "border-gray-200"}`}
          >
            <div className="font-medium">{c.label}</div>
            <div className="text-xs text-gray-500">£{PRICING.condition[c.key]}</div>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <label className="block text-sm text-gray-600 mb-2">Quantity</label>
        <input
          type="number"
          min={1}
          className="p-3 border rounded-xl w-36"
          value={formData.quantity}
          onChange={(e) => upd({ quantity: e.target.value })}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={back} className="flex-1 py-2 rounded-xl bg-gray-100">Back</button>
        <button onClick={next} className="flex-1 py-2 rounded-xl bg-green-600 text-white">Next</button>
      </div>
    </Card>
  );

  const UploadStep = (
    <Card>
      <h3 className="text-2xl font-semibold mb-3">Upload Photos (optional)</h3>
      <p className="text-sm text-gray-500 mb-4">Upload clear photos of the window to help us check condition. Max 6 files.</p>

      <div className="flex gap-3 items-center">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <button onClick={() => fileRef.current?.click()} className="py-2 px-4 rounded-xl border">Choose files</button>

        <div className="text-sm text-gray-500">{formData.photos.length} selected</div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {formData.photos.map((p, i) => (
          <div key={i} className="relative">
            <img src={p.url} alt={p.name} className="w-full h-28 object-cover rounded-lg border" />
            <button onClick={() => removePhoto(i)} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">✕</button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={back} className="flex-1 py-2 rounded-xl bg-gray-100">Back</button>
        <button onClick={next} className="flex-1 py-2 rounded-xl bg-green-600 text-white">Next</button>
      </div>
    </Card>
  );

  const ReviewStep = (
    <Card>
      <h3 className="text-2xl font-semibold mb-3">Review & Estimate</h3>

      <div className="space-y-3 text-sm text-gray-700">
        <div><strong>Style:</strong> {formData.windowStyle || "—"}</div>
        <div><strong>Size:</strong> {getArea()} m² ({getSizeBand(getArea())})</div>
        <div><strong>Glazing:</strong> {formData.glazing}</div>
        <div><strong>Access:</strong> {formData.heightAccess}</div>
        <div><strong>Condition:</strong> {formData.condition}</div>
        <div><strong>Quantity:</strong> {formData.quantity}</div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-xl">
        <div className="flex justify-between text-sm text-gray-600 mb-2"><span>Per window</span><strong>£{calcPerWindow()}</strong></div>
        <div className="flex justify-between font-semibold text-lg"><span>Total estimate</span><strong>£{calcTotal()}</strong></div>
      </div>

      <div className="mt-4">
        <label className="block text-sm text-gray-600 mb-2">Your name</label>
        <input className="w-full p-3 border rounded-xl mb-3" value={formData.clientName} onChange={(e) => upd({ clientName: e.target.value })} />
        <label className="block text-sm text-gray-600 mb-2">Email</label>
        <input className="w-full p-3 border rounded-xl mb-3" value={formData.clientEmail} onChange={(e) => upd({ clientEmail: e.target.value })} />
        <label className="block text-sm text-gray-600 mb-2">Notes (optional)</label>
        <textarea className="w-full p-3 border rounded-xl" value={formData.notes} onChange={(e) => upd({ notes: e.target.value })} />
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={back} className="flex-1 py-2 rounded-xl bg-gray-100">Back</button>
        <button onClick={handleSubmit} className="flex-1 py-2 rounded-xl bg-green-600 text-white">Send request</button>
      </div>
    </Card>
  );

  return (
    <div className="w-full">
      <Progress step={step} total={TOTAL_STEPS} />

      <div className="space-y-6">
        {step === 1 && WindowStyleStep}
        {step === 2 && SizeStep}
        {step === 3 && GlazingStep}
        {step === 4 && HeightStep}
        {step === 5 && ConditionStep}
        {step === 6 && UploadStep}
        {step === 7 && ReviewStep}

        {/* quick controls for dev/testing */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div>Tip: Hints & sketches help users measure correctly.</div>
          <div>Per window: £{calcPerWindow()} • Total: £{calcTotal()}</div>
        </div>
      </div>
    </div>
  );
}
