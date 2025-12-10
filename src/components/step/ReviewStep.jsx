import { motion } from "framer-motion";
import { FaWindowMaximize, FaRulerCombined, FaLayerGroup, FaArrowUp, FaStar, FaUser, FaEnvelope, FaStickyNote } from "react-icons/fa";

function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="bg-white p-6 rounded-2xl shadow-xl border border-cyan-200 hover:shadow-2xl transition-shadow duration-300"
    >
      {children}
    </motion.div>
  );
}

export default function ReviewStep({
  formData,
  upd,
  next,
  back,
  calcPerWindow,
  calcTotal,
  getArea,
  getSizeBand,
  handleSubmit,
}) {
  const summaryItems = [
    { label: "Style", value: formData.windowStyle || "—", icon: <FaWindowMaximize className="text-cyan-600" /> },
    { label: "Size", value: `${getArea()} m² (${getSizeBand(getArea())})`, icon: <FaRulerCombined className="text-cyan-600" /> },
    { label: "Glazing", value: formData.glazing, icon: <FaLayerGroup className="text-cyan-600" /> },
    { label: "Access", value: formData.heightAccess, icon: <FaArrowUp className="text-cyan-600" /> },
    { label: "Condition", value: formData.condition, icon: <FaStar className="text-cyan-600" /> },
    { label: "Quantity", value: formData.quantity, icon: <FaWindowMaximize className="text-cyan-600" /> },
  ];

  return (
    <Card>
      <h3 className="text-2xl font-semibold text-cyan-800 mb-4">Review & Estimate</h3>

      <div className="space-y-3 text-cyan-800 mb-4">
        {summaryItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm">
            <div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
            <strong className="w-24">{item.label}:</strong> {item.value}
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100 mb-4">
        <div className="flex justify-between text-sm text-cyan-600 mb-2">
          <span>Per window</span>
          <strong>£{calcPerWindow()}</strong>
        </div>
        <div className="flex justify-between font-semibold text-lg text-cyan-800">
          <span>Total estimate</span>
          <strong>£{calcTotal()}</strong>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="block text-sm text-cyan-600 mb-1 flex items-center gap-1"><FaUser className="text-cyan-600"/> Your name</label>
          <input
            className="w-full p-3 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={formData.clientName}
            onChange={(e) => upd({ clientName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-cyan-600 mb-1 flex items-center gap-1"><FaEnvelope className="text-cyan-600"/> Email</label>
          <input
            className="w-full p-3 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={formData.clientEmail}
            onChange={(e) => upd({ clientEmail: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-cyan-600 mb-1 flex items-center gap-1"><FaStickyNote className="text-cyan-600"/> Notes (optional)</label>
          <textarea
            className="w-full p-3 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={formData.notes}
            onChange={(e) => upd({ notes: e.target.value })}
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <motion.button
          onClick={back}
          whileHover={{ scale: 1.03 }}
          className="flex-1 py-2 rounded-xl bg-cyan-100 text-cyan-800 transition-colors duration-300 hover:bg-cyan-200"
        >
          Back
        </motion.button>
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.03 }}
          className="flex-1 py-2 rounded-xl bg-cyan-600 text-white transition-colors duration-300 hover:bg-cyan-700"
        >
          Send request
        </motion.button>
      </div>
    </Card>
  );
}
