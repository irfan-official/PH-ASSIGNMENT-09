import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FaHeart, FaPaypal, FaCoffee, FaHandHoldingUsd } from "react-icons/fa";

export default function SupportUs() {
  return (
    <>
      <Nav />

      <div
        className="
        w-full min-h-screen 
        bg-gradient-to-b 
        from-[#0F0F1A] via-[#3B1B79] to-[#7C3AED] 
        text-white 
        px-6 py-12 
        flex flex-col items-center border-t border-t-purple-500
      "
      >
        {/* Header Section */}
        <section className="text-center max-w-3xl mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Support Our Work ❤️
          </h1>
          <p className="text-lg md:text-xl text-purple-100">
            We create helpful content and tools for the community. Your support
            helps us grow, improve, and keep everything running smoothly.
          </p>
        </section>

        {/* Support Options */}
        <section className="mt-14 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {/* Donate */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition duration-300 ">
            <FaHeart className="text-4xl mx-auto mb-4 text-red-300" />
            <h2 className="text-2xl font-semibold mb-2">Donate</h2>
            <p className="text-purple-100 mb-4">
              Help us improve features, create new ideas, and keep the project
              alive.
            </p>
            <button className="px-6 py-2 bg-white text-purple-700 rounded-lg font-bold hover:bg-purple-200 transition">
              Donate Now
            </button>
          </div>

          {/* Buy Coffee */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition duration-300">
            <FaCoffee className="text-4xl mx-auto mb-4 text-yellow-300" />
            <h2 className="text-2xl font-semibold mb-2">Buy Us a Coffee</h2>
            <p className="text-purple-100 mb-4">
              Fuel our work with a coffee! Your small contribution makes a big
              difference.
            </p>
            <button className="px-6 py-2 bg-white text-purple-700 rounded-lg font-bold hover:bg-purple-200 transition">
              Buy Coffee
            </button>
          </div>

          {/* PayPal */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition duration-300">
            <FaPaypal className="text-4xl mx-auto mb-4 text-blue-300" />
            <h2 className="text-2xl font-semibold mb-2">Support via PayPal</h2>
            <p className="text-purple-100 mb-4">
              Prefer PayPal? You can support us securely with one click.
            </p>
            <button className="px-6 py-2 bg-white text-purple-700 rounded-lg font-bold hover:bg-purple-200 transition">
              PayPal Support
            </button>
          </div>

          {/* Sponsor */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition duration-300 md:col-span-2 lg:col-span-1">
            <FaHandHoldingUsd className="text-4xl mx-auto mb-4 text-green-300" />
            <h2 className="text-2xl font-semibold mb-2">Become a Sponsor</h2>
            <p className="text-purple-100 mb-4">
              Want long-term partnership? Become an official sponsor of our
              work.
            </p>
            <button className="px-6 py-2 bg-white text-purple-700 rounded-lg font-bold hover:bg-purple-200 transition">
              Sponsor Us
            </button>
          </div>
        </section>

        {/* Footer Message */}
        <section className="text-center mt-16 max-w-2xl text-purple-200 text-lg pb-10">
          <p>
            Thank you for supporting our mission. Every contribution helps us
            build something meaningful for everyone. ❤️
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
}
