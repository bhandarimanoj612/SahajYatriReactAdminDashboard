import React from "react";

const Login = ({
  handleLogin,
  handleToggle,
  email,
  password,
  setEmail,
  setPassword,
}) => {
  const [showPassword, setShowPassword] = React.useState(false); // State to track whether to show password

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="relative p-6">
        <a className="font-semibold">Username</a>
        <input
          type="text" // Changed type to "text" for the username field
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="appearance-none mt-6 block w-full px-8 py-2 border border-gray-300 rounded-md shadow-sm pl-10 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="relative p-6">
        <a className="font-semibold">Password</a>
        <div className="flex items-center">
          <input
            type={showPassword ? "text" : "password"} // Toggle between "password" and "text"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-6 appearance-none block w-full px-8 py-2 border border-gray-300 rounded-md shadow-sm pl-10 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="ml-2 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"} {/* Toggle button text */}
          </button>
        </div>
        {/* <a href="#" className="text-grey-bg-dark-200 ml-44 ">
          Forget Password
        </a> */}
      </div>
      <button
        type="submit"
        className="pl-36 pr-36 inline-flex justify-center mb-4 ml-8 mr-8 p-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#CB0A31] hover:bg-red-500 focus:outline-none focus:ring-offset-2 "
      >
        Login
      </button>
      <div className="mb-10">
        {/* <a href="#" className="text-black m-8">
          You need to sinup with sahajYatri-Admin in
        </a> */}
        {/* <a href="#" className="text-[#CB0A31] ml-8" onClick={handleToggle}>
          Signup
        </a> */}
        <div className="p-4"></div>
      </div>
    </form>
  );
};

export default Login;
