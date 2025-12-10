import { useState, useRef } from "react";
import Progress from "./Progress";

// Steps
import WindowStyleStep from "./step/WindowStyleStep";
import SizeStep from "./step/SizeStep";
import GlazingStep from "./step/GlazingStep";
import HeightStep from "./step/HeightStep";
import ConditionStep from "./step/ConditionStep";
import UploadStep from "./step/UploadStep";
import ReviewStep from "./step/ReviewStep";

// CONFIG
export const PRICING = {
  base: 75,
  sizeBands: [
    { label: "Small (<0.6 m²)", max: 0.6, add: 0 },
    { label: "Medium (0.6 - 1.2 m²)", max: 1.2, add: 25 },
    { label: "Large (>1.2 m²)", max: Infinity, add: 55 },
  ],
  glazing: { single: 0, double: 40, triple: 90 },
  height: { ground: 0, first: 30, second: 60, scaffold: 120 },
  condition: { good: 0, fair: 35, poor: 80 },
  perWindowMultiplier: 1,
};

export default function MultiStepForm() {
  const TOTAL_STEPS = 7;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    windowStyle: "",
    widthM: "",
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

  const upd = (patch) => setFormData((s) => ({ ...s, ...patch }));

  const getArea = () => {
    const w = parseFloat(formData.widthM) || 0;
    const h = parseFloat(formData.heightM) || 0;
    return +(w * h).toFixed(3);
  };

  const getSizeBand = (area) => {
    const band = PRICING.sizeBands.find((b) => area <= b.max);
    return band ? band.label : PRICING.sizeBands[0].label;
  };

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
    const arr = Array.from(files).slice(0, 6);
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
    const payload = new FormData();
    payload.append("data", JSON.stringify(formData));
    formData.photos.forEach((p, i) => payload.append("photo_" + i, p.file));
    console.log("Submitting form (mock):", { formData, total: calcTotal() });
    alert("Quote request sent. Total estimate: £" + calcTotal());
  };

  // DYNAMIC STEPS ARRAY
  const steps = [
    WindowStyleStep,
    SizeStep,
    GlazingStep,
    HeightStep,
    ConditionStep,
    UploadStep,
    ReviewStep,
  ];

  const StepComponent = steps[step - 1];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Progress step={step} total={TOTAL_STEPS} />
      <StepComponent
        formData={formData}
        upd={upd}
        next={next}
        back={back}
        getArea={getArea}
        getSizeBand={getSizeBand}
        calcPerWindow={calcPerWindow}
        calcTotal={calcTotal}
        handleFiles={handleFiles}
        removePhoto={removePhoto}
        fileRef={fileRef}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
