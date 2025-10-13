import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter - PatchLore',
  description: 'Join the PatchLore community and stay updated with new features, styles, and updates!',
};

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join the PatchLore Community
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto">
            Stay in the loop with the latest features, new patch note styles, and exciting updates from our AI-powered patch notes generator.
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Get notified about new features, styles, and updates delivered straight to your inbox.
          </p>
          <div className="newsletter-form-container">
            <script async data-uid="8a6cec5287" src="https://patchlore.kit.com/8a6cec5287/index.js"></script>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Early Access</h3>
            <p className="text-sm text-gray-600">Be the first to try new features and styles</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Updates & Tips</h3>
            <p className="text-sm text-gray-600">Learn about new features and get usage tips</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-sm text-gray-600">Join our growing community of creators</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 sm:mt-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 hover:underline font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Patch Notes Generator
          </a>
        </div>
      </div>
    </main>
  );
}



