export default function Features() {
  const features = [
    { title: 'Feature 1', description: 'Description for feature 1' },
    { title: 'Feature 2', description: 'Description for feature 2' },
    { title: 'Feature 3', description: 'Description for feature 3' },
    { title: 'Feature 4', description: 'Description for feature 4' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
