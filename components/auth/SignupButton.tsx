"use client";

const SignupButton = () => {
  const handleSignup = () => {
    // Signup logic here
  };

  return (
    <button
      onClick={handleSignup}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
    >
      Sign Up
    </button>
  );
};

export default SignupButton;