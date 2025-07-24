'use client';

import { useRouter } from 'next/navigation';

const ForgotPasswordForm = () => {
  const router = useRouter();

  const handleClick = (action) => {
    if (action === 'home') {
      router.push('/');
    }
    if (action === 'login') {
      router.push('/auth/login');
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12 md:-mt-10">
      <div className="animate-fade-in w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-montserrat text-3xl font-bold text-white">
            Forgot Password?
          </h2>
          <p className="font-inter mt-2 text-gray-400">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="font-inter mb-2 block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="font-inter w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-white focus:outline-none"
              placeholder="Enter your email address"
            />
          </div>

          <button
            type="submit"
            className="font-poppins w-full cursor-pointer rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
          >
            Send Reset Link
          </button>

          <div className="text-center">
            <button
              onClick={() => handleClick('login')}
              type="button"
              className="font-inter cursor-pointer text-blue-400 transition-colors duration-200 hover:text-blue-300"
            >
              ← Back to Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
