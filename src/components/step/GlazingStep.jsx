import { PRICING } from "../MultiStep";
import { motion } from "framer-motion";
import { FaWindowMaximize, FaWindowRestore, FaWindowMinimize } from "react-icons/fa"; // icons for glazing

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

export default function GlazingStep({ formData, upd, next, back }) {
  const options = [
    { key: "single", label: "Single", icon: <FaWindowMinimize size={24} /> },
    { key: "double", label: "Double", icon: <FaWindowRestore size={24} /> },
    { key: "triple", label: "Triple", icon: <FaWindowMaximize size={24} /> },
  ];

  return (
    <Card>
      <h3 className="text-2xl font-semibold text-cyan-800 mb-3">Choose Glazing</h3>
      <p className="text-sm text-cyan-600 mb-4">
        Different glazing options affect price and performance.
      </p>

      <div className="grid grid-cols-3 gap-3">
        {options.map((g) => (
          <motion.button
            key={g.key}
            onClick={() => upd({ glazing: g.key })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-xl border flex flex-col items-center transition-all duration-300
              ${formData.glazing === g.key
                ? "border-cyan-600 shadow-xl bg-cyan-50"
                : "border-cyan-200 hover:border-cyan-400 bg-white"}`}
          >
            <div className="text-cyan-600 mb-2">{g.icon}</div>
            <div className="text-sm font-medium text-cyan-800">{g.label}</div>
            <div className="text-xs text-cyan-600 mt-1">£{PRICING.glazing[g.key]}</div>
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
