import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

export default function CodeOfConduct() {
  useHead({
    title: 'Code of Conduct – UIBit',
    description: 'Community standards and contributor covenant code of conduct.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="coc" className="hidden md:block" />

        <div className="flex-1 min-w-0">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Code of Conduct
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              We pledge to make participation in our community a harassment-free experience for everyone.
            </p>
          </header>

          <section className="py-10 scroll-mt-20 border-t border-gray-100 dark:border-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Our Pledge</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, caste, color, religion, or sexual identity and orientation.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.
            </p>
          </section>

          <section className="py-10 scroll-mt-20 border-t border-gray-100 dark:border-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Our Standards</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Examples of behavior that contributes to a positive environment for our community include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <li>Demonstrating empathy and kindness toward other people</li>
              <li>Being respectful of differing opinions, viewpoints, and experiences</li>
              <li>Giving and gracefully accepting constructive feedback</li>
              <li>Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience</li>
              <li>Focusing on what is best for the overall community, and not just for ourselves</li>
            </ul>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Examples of unacceptable behavior include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>The use of sexualized language or imagery, and unwelcome sexual attention or advances</li>
              <li>Trolling, insulting or derogatory comments, and personal or political attacks</li>
              <li>Public or private harassment</li>
              <li>Publishing others' private information without their explicit permission</li>
              <li>Other conduct which could reasonably be considered inappropriate in a professional setting</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
