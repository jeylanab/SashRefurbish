import { PRICING } from "../MultiStep";
import { motion } from "framer-motion";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa"; // icons for Good, Fair, Poor


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

export default function ConditionStep({ formData, upd, next, back }) {
  const options = [
    { key: "good", label: "Good", icon: <FaSmile size={24} /> },
    { key: "fair", label: "Fair", icon: <FaMeh size={24} /> },
    { key: "poor", label: "Poor", icon: <FaFrown size={24} /> },
  ];

  return (
    <Card>
      <div className="flex items-center mb-4">

        <h3 className="text-2xl font-semibold text-cyan-800">Window Condition</h3>
      </div>
      <p className="text-sm text-cyan-600 mb-4">
        Be honest — the condition affects repair complexity.
      </p>

      <div className="flex gap-3">
        {options.map((c) => (
          <motion.button
            key={c.key}
            onClick={() => upd({ condition: c.key })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 p-3 rounded-xl border flex flex-col items-center transition-all duration-300
              ${formData.condition === c.key
                ? "border-cyan-600 shadow-xl bg-cyan-50"
                : "border-cyan-200 hover:border-cyan-400 bg-white"}`}
          >
            <div className="mb-2 text-cyan-600">{c.icon}</div>
            <div className="font-medium text-cyan-800">{c.label}</div>
            <div className="text-xs text-cyan-600 mt-1">£{PRICING.condition[c.key]}</div>
          </motion.button>
        ))}
      </div>

      <div className="mt-6">
        <label className="block text-sm text-cyan-600 mb-2">Quantity</label>
        <input
          type="number"
          min={1}
          className="p-3 border border-cyan-200 rounded-xl w-36 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={formData.quantity}
          onChange={(e) => upd({ quantity: e.target.value })}
        />
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
          onClick={next}
          whileHover={{ scale: 1.03 }}
          className="flex-1 py-2 rounded-xl bg-cyan-600 text-white transition-colors duration-300 hover:bg-cyan-700"
        >
          Next
        </motion.button>
      </div>
    </Card>
  );
}
