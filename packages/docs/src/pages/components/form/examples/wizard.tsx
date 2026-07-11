import '@uibit/form';
import { UsageExample } from '../../../../types/docs';

function Demo() {
  return (
    <uibit-form class="block bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
      <form action="https://httpbin.org/post" method="POST" className="space-y-6">
        {/* Step 1 */}
        <fieldset class="space-y-4">
          <legend class="sr-only">Step 1: Contact Details</legend>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" htmlFor="first-name">
              First Name *
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              required
              value="Alexander"
              class="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" htmlFor="last-name">
              Last Name *
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              required
              value="Rawlings"
              class="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value="alexander@example.com"
              class="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 cursor-pointer"
            >
              Next Step
            </button>
          </div>
        </fieldset>

        {/* Step 2 */}
        <fieldset class="space-y-4">
          <legend class="sr-only">Step 2: Profile Settings</legend>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
              Username *
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value="arawlings"
              class="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" htmlFor="bio">
              Short Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              class="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >Creative developer and designer.</textarea>
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              data-uibit-form-prev
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 cursor-pointer"
            >
              Next Step
            </button>
          </div>
        </fieldset>

        {/* Step 3 */}
        <fieldset class="space-y-4">
          <legend class="sr-only">Step 3: Location Details</legend>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">
              City *
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              value="Copenhagen"
              class="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" htmlFor="country">
              Country *
            </label>
            <input
              id="country"
              name="country"
              type="text"
              required
              value="Denmark"
              class="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              data-uibit-form-prev
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 cursor-pointer"
            >
              Next Step
            </button>
          </div>
        </fieldset>

        {/* Step 4 */}
        <fieldset class="space-y-4">
          <legend class="sr-only">Step 4: Confirmation</legend>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="newsletter"
                name="newsletter"
                type="checkbox"
                checked
                class="focus:ring-black h-4 w-4 text-black border-gray-300 rounded bg-white"
              />
            </div>
            <div class="ml-3 text-sm">
              <label htmlFor="newsletter" class="font-medium text-gray-700">Subscribe to updates</label>
              <p class="text-gray-500">Get monthly announcements about features.</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                checked
                class="focus:ring-black h-4 w-4 text-black border-gray-300 rounded bg-white"
              />
            </div>
            <div class="ml-3 text-sm">
              <label htmlFor="terms" class="font-medium text-gray-700">Accept Terms & Conditions *</label>
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              data-uibit-form-prev
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </fieldset>
      </form>

      {/* Slotted feedback */}
      <div slot="loading" className="bg-gray-50 p-8">
        <p className="text-sm text-gray-600">Creating account...</p>
      </div>

      <div slot="success" className="bg-gray-50 p-8">
        <h4 className="text-md font-semibold text-gray-900 mb-1">Registration complete</h4>
        <p className="text-sm text-gray-600">Your account has been successfully created.</p>
      </div>

      <div slot="error" className="text-sm text-gray-900 bg-gray-50 p-8">
        <p className="font-semibold">Registration failed</p>
        <p className="text-gray-600">Please check your inputs and try again.</p>
      </div>
    </uibit-form>
  );
}

const wizard: UsageExample = {
  title: 'Multi-step Wizard',
  description:
    'Grouping fields into fieldset tags inside the slotted form element automatically turns it into a multi-step wizard. Each step is validated before allowing navigation to the next.',
  Demo,
};

export default wizard;
