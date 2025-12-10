export default function Progress({ step, total }) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((s, index) => (
        <div key={s} className="flex items-center">
          {/* Circle */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold transition-colors duration-300
              ${s <= step ? "bg-cyan-600" : "bg-cyan-200 text-cyan-800"}`}
          >
            {s}
          </div>

          {/* Connecting line with arrow */}
          {index < total - 1 && (
            <div className="flex items-center">
              <div
                className={`h-1 w-16 transition-all duration-300
                  ${s < step ? "bg-cyan-600" : "bg-cyan-300"}`}
              />
              <div
                className={`w-0 h-0 border-t-4 border-b-4 border-l-6 ml-[-2px] transition-colors duration-300
                  ${s < step ? "border-l-cyan-600 border-t-transparent border-b-transparent" : "border-l-cyan-300 border-t-transparent border-b-transparent"}`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
