const loading = () => {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center text-orange-500 space-y-4">
      <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
      <p className="text-lg font-medium animate-pulse">Please wait...</p>
    </div>
  );
};
export default loading;
