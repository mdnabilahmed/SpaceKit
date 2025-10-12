import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://api-spacekit.onrender.com/api/contactus/submitcontact",
        { name, email, message }
      );

      toast.success(response.data.message, { icon: false });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);

      const errMsg =
        error.response?.data?.error ||
        "❌ Something went wrong while sending the message";
      toast.error(errMsg);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-tight">
              Have questions or <br />
              need support?
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-10">
            {/* Name */}
            <div>
              <label className="block text-lg lg:text-xl font-medium text-gray-900 mb-3 lg:mb-4">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-0 py-4 lg:py-5 text-base lg:text-lg text-gray-900 placeholder-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-900 focus:outline-none focus:ring-0 transition-colors duration-300"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg lg:text-xl font-medium text-gray-900 mb-3 lg:mb-4">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your e-mail"
                className="w-full px-0 py-4 lg:py-5 text-base lg:text-lg text-gray-900 placeholder-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-900 focus:outline-none focus:ring-0 transition-colors duration-300"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-lg lg:text-xl font-medium text-gray-900 mb-3 lg:mb-4">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                rows={4}
                className="w-full px-0 py-4 lg:py-5 text-base lg:text-lg text-gray-900 placeholder-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-900 focus:outline-none focus:ring-0 resize-none transition-colors duration-300"
                required
              />
            </div>

            {/* Submit */}
            <div className="pt-8 lg:pt-12 text-center">
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center justify-center px-12 lg:px-16 py-4 lg:py-5 bg-white text-gray-900 text-base lg:text-lg font-medium tracking-wide border-2 border-gray-900 rounded-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 active:scale-95 ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-900 hover:text-white"
                }`}
              >
                {loading ? "Sending..." : "CONTACT US"}
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ContactUs;
