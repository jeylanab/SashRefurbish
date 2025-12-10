import React from "react";

export default function StepsCard({ stepNumber, title, description, image }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
      <img
        src={image}
        alt={title}
        className="w-24 h-24 mb-4 object-cover rounded"
      />
      <h3 className="text-xl font-semibold mb-2">
        Step {stepNumber}: {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
