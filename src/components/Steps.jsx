import React from "react";
import { motion } from "framer-motion";
import { FaMousePointer, FaPencilRuler, FaCheckCircle } from "react-icons/fa"; // React Icons

// Data for steps
const stepsData = [
  {
    icon: <FaMousePointer className="w-10 h-10 text-cyan-500" />,
    title: "Select Window Type",
    description: "Choose your window style to help us understand your needs.",
  },
  {
    icon: <FaPencilRuler className="w-10 h-10 text-cyan-500" />,
    title: "Enter Window Details",
    description: "Input size, glazing, condition, and quantity for an accurate quote.",
  },
  {
    icon: <FaCheckCircle className="w-10 h-10 text-cyan-500" />,
    title: "Get Instant Quote",
    description: "Receive your quote instantly and book online with ease.",
  },
];

// Single Step Card
function StepsCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex flex-col items-center text-center p-8 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition-transform duration-300"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

// Steps Section
export default function Steps() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-16">How It Works</h2>
        <div className="relative grid sm:grid-cols-1 md:grid-cols-3 gap-12">
          {stepsData.map((step, index) => (
            <StepsCard key={index} {...step} />
          ))}

          {/* Optional connecting lines */}
        </div>
      </div>
    </section>
  );
}
