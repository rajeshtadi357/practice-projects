const Loader = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
      
      {/* Status text */}
      <p className="text-gray-300 text-sm tracking-wide">{text}</p>
    </div>
  );
};

export default Loader;
