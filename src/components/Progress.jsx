export default function Progress({ step, total }) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between mb-8 px-4 sm:px-0">
      {steps.map((s, index) => (
        <div key={s} className="flex items-center flex-1">
          {/* Circle */}
          <div
            className={`flex items-center justify-center rounded-full font-semibold transition-colors duration-300
              ${s <= step ? "bg-cyan-600 text-white" : "bg-cyan-200 text-cyan-800"}
              w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base`}
          >
            {s}
          </div>

          {/* Connecting line with arrow */}
          {index < total - 1 && (
            <div className="flex-1 flex items-center relative">
              <div
                className={`h-1 bg-gray-300 flex-1 transition-colors duration-300
                  ${s < step ? "bg-cyan-600" : "bg-cyan-300"}`}
              />
              <div
                className={`absolute right-0 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px]
                  border-t-transparent border-b-transparent
                  ${s < step ? "border-l-cyan-600" : "border-l-cyan-300"}`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
