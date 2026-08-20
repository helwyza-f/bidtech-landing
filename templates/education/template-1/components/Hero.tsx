export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Our Template
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A clean and modern template for your business website.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg">
            Get Started
          </button>
        </div>
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Image Placeholder</p>
        </div>
      </div>
    </section>
  );
}
