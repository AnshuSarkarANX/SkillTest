export default function Loading({ size = "md", fullscreen = false }) {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`flex items-center justify-center ${fullscreen ? "fixed inset-0 bg-white/60 backdrop-blur-sm z-50" : "p-4"}`}
    >
      <div
        className={`${sizes[size]} rounded-full border-gray-200 border-t-teal-600 animate-spin`}
      />
    </div>
  );
}
