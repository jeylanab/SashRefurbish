import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MultiStep from "./MultiStep";

export default function QuoteTool() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10">
      
      {/* PAGE HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-cyan-800">Get a Custom Quote</h1>
        <p className="text-cyan-600 mt-2 max-w-xl">
          Fill out the form below and we’ll prepare a personalized estimate tailored to your project.
        </p>
      </motion.div>

      {/* BACK BUTTON */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => navigate("/")}
        className="mb-8 bg-cyan-600 text-white px-6 py-2 rounded-xl hover:bg-cyan-700 transition shadow-md"
      >
        ← Back to Home
      </motion.button>

      {/* MULTISTEP FORM */}
      <div className="w-full max-w-2xl">
        <MultiStep />
      </div>
    </div>
  );
}
