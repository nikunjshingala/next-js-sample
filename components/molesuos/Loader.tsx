const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white/70 z-50">
      <div className="w-10 h-10 border-4 border-gray-300 rounded-full animate-spin"></div>
      <div className="ml-4">Loading...</div>
    </div>
  );
};

export default Loader;
