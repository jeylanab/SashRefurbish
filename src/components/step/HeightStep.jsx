import { PRICING } from "../MultiStep";
import { motion } from "framer-motion";
import { FaArrowUp, FaBuilding, FaHardHat, FaRulerVertical } from "react-icons/fa"; // example icons

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

export default function HeightStep({ formData, upd, next, back }) {
  const options = [
    { key: "ground", label: "Ground level", icon: <FaArrowUp size={24} /> },
    { key: "first", label: "First floor", icon: <FaBuilding size={24} /> },
    { key: "second", label: "Second floor", icon: <FaRulerVertical size={24} /> },
    { key: "scaffold", label: "Scaffold / Specialist", icon: <FaHardHat size={24} /> },
  ];

  return (
    <Card>
      <h3 className="text-2xl font-semibold text-cyan-800 mb-3">Access & Height</h3>
      <p className="text-sm text-cyan-600 mb-4">
        Tell us how easy it is to reach the window.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {options.map((h) => (
          <motion.button
            key={h.key}
            onClick={() => upd({ heightAccess: h.key })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-xl border flex items-center gap-3 transition-all duration-300
              ${formData.heightAccess === h.key
                ? "border-cyan-600 shadow-xl bg-cyan-50"
                : "border-cyan-200 hover:border-cyan-400 bg-white"}`}
          >
            <div className="text-cyan-600">{h.icon}</div>
            <div>
              <div className="font-medium text-cyan-800">{h.label}</div>
              <div className="text-xs text-cyan-600">£{PRICING.height[h.key]}</div>
            </div>
          </motion.button>
        ))}
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
