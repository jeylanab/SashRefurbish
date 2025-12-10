import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import sash from "../../assets/sash.png";
import casement from "../../assets/case.png";
import sliding from "../../assets/window.png";

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

export default function WindowStyleStep({ formData, upd, next, back }) {
  // Use imported images instead of URLs
  const styles = [
    { id: "A", label: "Sash & Case", src: sash },
    { id: "B", label: "Casement", src: casement },
    { id: "C", label: "Sliding", src: sliding },
  ];

  return (
    <Card>
      <h3 className="text-2xl font-semibold text-cyan-800 mb-3">Pick a window style</h3>
      <p className="text-sm text-cyan-600 mb-4">Click a sketch to select the style.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {styles.map((w) => (
          <button
            key={w.id}
            onClick={() => upd({ windowStyle: w.id })}
            className={`relative group border rounded-xl p-3 flex flex-col items-center gap-2 transition shadow-sm
              ${formData.windowStyle === w.id ? "border-cyan-600 shadow-xl" : "border-cyan-200 hover:shadow-md"}`}
          >
            <div className="w-full h-32 flex items-center justify-center">
              <img src={w.src} alt={w.label} className="max-h-full object-contain" />
            </div>
            <div className="text-sm font-medium text-cyan-800">{w.label}</div>

            {/* Selected check mark */}
            {formData.windowStyle === w.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 bg-cyan-600 rounded-full p-1 text-white"
              >
                <FaCheck size={12} />
              </motion.div>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <motion.button
          onClick={back}
          whileHover={{ scale: 1.03 }}
          className="flex-1 py-2 rounded-xl bg-cyan-100 text-cyan-800 hover:bg-cyan-200 transition-colors duration-300"
        >
          Back
        </motion.button>
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.03 }}
          className="flex-1 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition-colors duration-300"
        >
          Next
        </motion.button>
      </div>
    </Card>
  );
}
