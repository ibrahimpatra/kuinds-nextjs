// components/LoadingScreen.js
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-5 h-5 rounded-full bg-red-600" />
        <div className="w-5 h-5 rounded-full bg-yellow-400" />
        <div className="w-5 h-5 rounded-full bg-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Kuwait India Driving School</h1>
      <p className="text-gray-500 mb-8">Professional Driving Lessons in Kuwait</p>
      <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 rounded-full animate-pulse" style={{ width: '70%' }} />
      </div>
    </div>
  );
}
