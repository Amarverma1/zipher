"use client";

import { useState } from "react";

export default function Home() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setResult("");

    try {

      const response = await fetch("/api/submit-form", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {

        setResult("Form submitted successfully!");

        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

      } else {

        setResult(data.message);

      }

    } catch (error) {

      setResult("Something went wrong!");

    }

    setLoading(false);
  };

  return (

    <main className="min-h-screen flex items-center justify-center p-5">

      <div className="w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Contact Us
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            rows={4}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded"
          >

            {loading
              ? "Submitting..."
              : "Submit"}

          </button>

        </form>

        {result && (

          <p className="mt-4">
            {result}
          </p>

        )}

      </div>

    </main>
  );
}