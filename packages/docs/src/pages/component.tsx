import { useParams, Link } from 'react-router-dom';
import { ApiDocs } from '../components/ApiDocs';
import { componentRegistry } from './components';

export default function ComponentDocs() {
  const { componentId } = useParams<{ componentId: string }>();

  if (!componentId || !componentRegistry[componentId]) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center bg-white">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Component Not Found</h1>
        <p className="text-gray-600 mb-6">The requested component documentation does not exist.</p>
        <Link to="/" className="text-gray-900 underline font-medium hover:text-gray-600">
          Return Home
        </Link>
      </div>
    );
  }

  const { title, description, packageName, tagName, manifest, Demo, usages, features } =
    componentRegistry[componentId];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{title}</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          {title}
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">{description}</p>
        <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
          pnpm add {packageName}
        </code>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <Demo />
        </div>
      </section>

      {/* API Reference */}
      <ApiDocs manifest={manifest} tagName={tagName} />

      {/* Usage Examples */}
      {usages.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">Usage</h2>

          <div className="space-y-8">
            {usages.map((usage, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  {usage.title}
                </h3>
                {usage.description && (
                  <p className="text-sm text-gray-600 mb-3">{usage.description}</p>
                )}
                <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                  <code>{usage.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Features */}
      {features && features.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-gray-900 font-semibold mt-0.5">—</span>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
