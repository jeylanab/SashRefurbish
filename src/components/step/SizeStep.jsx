import { motion } from "framer-motion";
import { FaRulerHorizontal, FaRulerVertical } from "react-icons/fa";

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

export default function SizeStep({ formData, upd, next, back, getArea, getSizeBand }) {
  return (
    <Card>
      <h3 className="text-2xl font-semibold text-cyan-800 mb-3">Measure the window</h3>
      <p className="text-sm text-cyan-600 mb-4">
        Enter width & height in meters (e.g. 0.9, 1.2). We calculate area automatically.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <FaRulerHorizontal className="absolute top-1/2 left-3 -translate-y-1/2 text-cyan-600" />
          <input
            inputMode="decimal"
            placeholder="Width (m)"
            className="p-3 pl-10 border border-cyan-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={formData.widthM}
            onChange={(e) => upd({ widthM: e.target.value })}
          />
        </div>
        <div className="relative">
          <FaRulerVertical className="absolute top-1/2 left-3 -translate-y-1/2 text-cyan-600" />
          <input
            inputMode="decimal"
            placeholder="Height (m)"
            className="p-3 pl-10 border border-cyan-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={formData.heightM}
            onChange={(e) => upd({ heightM: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-4 text-cyan-800 text-sm">
        <div>Calculated area: <strong>{getArea()} m²</strong></div>
        <div>Detected size band: <strong>{getSizeBand(getArea())}</strong></div>
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
