function NotFoundPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
        <p className="text-gray-600 mt-4">
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="border-cyan-900 border-2 text-cyan-900 px-4 py-2 rounded hover:bg-cyan-900 hover:text-white text-sm mt-10"
        >
        HomePage
        </a>
      </div>
    );
  }
  
  export default NotFoundPage;
  