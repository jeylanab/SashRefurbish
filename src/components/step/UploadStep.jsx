import { motion } from "framer-motion";
import { FaUpload, FaTimes } from "react-icons/fa";

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

export default function UploadStep({ formData, upd, handleFiles, removePhoto, fileRef, next, back }) {
  return (
    <Card>
      <h3 className="text-2xl font-semibold text-cyan-800 mb-3">Upload Photos (optional)</h3>
      <p className="text-sm text-cyan-600 mb-4">
        Upload clear photos of the window to help us check the condition. Max 6 files.
      </p>

      <div className="flex gap-3 items-center">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <motion.button
          onClick={() => fileRef.current?.click()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 flex items-center gap-2 rounded-xl border border-cyan-300 text-cyan-700 bg-cyan-50 hover:bg-cyan-100 transition"
        >
          <FaUpload /> Choose files
        </motion.button>
        <div className="text-sm text-cyan-600">{formData.photos.length} selected</div>
      </div>

      {formData.photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {formData.photos.map((p, i) => (
            <div key={i} className="relative group">
              <img
                src={p.url}
                alt={p.name || `photo-${i}`}
                className="w-full h-28 object-cover rounded-lg border border-cyan-200"
              />
              <motion.button
                onClick={() => removePhoto(i)}
                whileHover={{ scale: 1.2 }}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow opacity-80 hover:opacity-100 transition"
              >
                <FaTimes className="text-red-500" />
              </motion.button>
            </div>
          ))}
        </div>
      )}

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
