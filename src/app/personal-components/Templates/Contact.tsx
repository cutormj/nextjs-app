import React from "react";

interface ContactProps {
  heading: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
  };
}

const Contact: React.FC<ContactProps> = ({ heading, description, colors }) => {
  return (
    <section className="contact bg-gray-50 py-16" style={{ color: colors.textPrimary }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>
        <p className="text-center text-gray-600 mb-12">{description}</p>
        <form className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Your Message"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            style={{ backgroundColor: colors.primary }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;