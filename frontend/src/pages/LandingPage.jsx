import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="mx-4 sm:mx-12 relative">
      <div
        className="flex flex-col items-center justify-center h-[80vh] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&w=600)",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-80"></div>

        <h1 className="text-5xl font-bold text-center text-white mb-4 relative">
          Welcome to Expense Tracker
        </h1>
        <p className="text-lg text-center text-white mb-8 relative">
          Track your expenses easily and stay within your budget!
        </p>

        <div className="flex space-x-6 mb-8 relative">
          <Link to="/signup">
            <button className="px-6 py-2 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600 transition duration-300">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-2 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition duration-300">
              Log In
            </button>
          </Link>
        </div>
      </div>
      {/* Newsletter Section */}
      <div className="bg-gray-100 w-full py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Get the latest updates, tips, and tricks to manage your expenses and
            stay on top of your budget.
          </p>

          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-64 sm:w-80 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 w-full py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://cdn.pixabay.com/photo/2018/02/16/14/38/portrait-3157821_640.jpg"
                alt="User 1"
                className="w-20 h-20 rounded-full mx-auto border-2 border-gray-300 shadow-lg"
              />
              <p className="text-gray-700 italic mt-4">
                "Expense Tracker has helped me take control of my finances. I
                love how easy it is to track my spending!"
              </p>
              <h3 className="text-lg font-semibold mt-4">- Rahul Sharma</h3>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_640.jpg"
                alt="User 2"
                className="w-20 h-20 rounded-full mx-auto border-2 border-gray-300 shadow-lg"
              />
              <p className="text-gray-700 italic mt-4">
                "A game-changer for managing expenses. Highly recommended for
                anyone looking to budget better."
              </p>
              <h3 className="text-lg font-semibold mt-4">- Priya Singh</h3>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://cdn.pixabay.com/photo/2018/05/04/12/21/man-3373868_640.jpg"
                alt="User 3"
                className="w-20 h-20 rounded-full mx-auto border-2 border-gray-300 shadow-lg"
              />
              <p className="text-gray-700 italic mt-4">
                "I love the clean interface and useful insights. It's the best
                app I've used for expense tracking."
              </p>
              <h3 className="text-lg font-semibold mt-4">- Aman Verma</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-gray-100 w-full py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Have questions or need support? Reach out to us, and we will get
            back to you as soon as possible.
          </p>

          <form className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 w-full sm:w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 w-full sm:w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:mt-0 mt-4"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows="4"
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      {/* <div className="bg-gray-800 text-white py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-4">
            © 2025 Expense Tracker. All Rights Reserved.
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            <Link
              to="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <i className="fab fa-facebook-f text-2xl"></i>
            </Link>
            <Link
              to="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </Link>
            <Link
              to="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </Link>
            <Link
              to="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <i className="fab fa-linkedin-in text-2xl"></i>
            </Link>
          </div>
          <div className="flex justify-center space-x-6">
            <Link
              to="/about"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/privacy"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div> */}

      <div className="bg-gray-800 text-white py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-start space-x-8">
          {/* Left Side: Logo, App Description, Social Media Links */}
          <div className="w-1/2">
            {/* Logo */}
            <img
              src="https://example.com/logo.png" // Replace with your logo URL
              alt="Expense Tracker Logo"
              className="h-10 mb-4"
            />

            {/* App Description */}
            <p className="text-gray-300 text-sm mb-4">
              Expense Tracker helps you manage your spending, stay within your
              budget, and save money. Track your expenses in an easy-to-use and
              organized way.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-6 mb-4">
              <Link
                to="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <i className="fab fa-facebook-f text-2xl"></i>
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </Link>
              <Link
                to="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <i className="fab fa-linkedin-in text-2xl"></i>
              </Link>
            </div>
          </div>

          {/* Right Side: About Us, Privacy Policy, Terms of Service */}
          <div className="w-1/2 text-right">
            <div className="flex flex-col space-y-4">
              <Link
                to="/about"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                About Us
              </Link>
              <Link
                to="/privacy"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-lg">
            © 2025 Expense Tracker. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
