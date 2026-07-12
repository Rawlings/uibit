import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

export default function Security() {
  useHead({
    title: 'Security Policy – UIBit',
    description: 'Security policies, supported versions, and vulnerability reporting procedures.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="security" className="hidden md:block" />

        <div className="flex-1 min-w-0">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Security Policy
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              We take the security of UIBit seriously. This document outlines our supported versions and how to report vulnerabilities.
            </p>
          </header>

          <section className="py-10 scroll-mt-20 border-t border-gray-100 dark:border-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Supported Versions</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              We actively support and patch the latest major release of UIBit.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-gray-800">Version</th>
                    <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-gray-800">Supported</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  <tr>
                    <td className="px-6 py-4 font-medium">0.1.x</td>
                    <td className="px-6 py-4 text-green-600 dark:text-green-400">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="py-10 scroll-mt-20 border-t border-gray-100 dark:border-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reporting a Vulnerability</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              If you discover a security vulnerability in this project, please report it to the maintainers directly.
            </p>
            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r-lg mb-6">
              <p className="text-sm text-orange-800 dark:text-orange-200 font-medium">
                Do NOT open a public GitHub issue for security vulnerabilities.
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Instead, please outline the issue in detail, including steps to reproduce, and contact the maintainer directly. We will acknowledge receipt of your report within 48 hours and provide a timeline for coordination and resolution.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
