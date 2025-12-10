export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 py-16 h-screen">
      <div className="text-center">
        <p className="text-4xl font-extrabold text-gray-800 mb-4 animate-pulse">
          404
        </p>
        <p className="text-xl text-gray-500 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
