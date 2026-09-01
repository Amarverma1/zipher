"use client";

import React, { useState } from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

interface RadioOptionProps {
  label: string;
  name: string;
  value: string;
  selected: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Home() {
  const initialForm = {
    fullName: "",
    username: "",
    email: "",
    zipCode: "",
    city: "",
    country: "",
    gender: "",
    age: "",
    subsidyBenefit: "",
    eligibility: "",
    healthMedicare: "",
    query: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Cancel Form
  const handleCancel = () => {
    setForm(initialForm);
    setResult("");
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        setForm(initialForm);
      } else {
        setResult(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setResult("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#020617] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,116,144,0.15),rgba(255,255,255,0))] text-white flex items-center justify-center p-4 md:p-6 font-sans">
      <div className="max-w-2xl w-full mx-auto">
        
        {/* Form Card */}
        <div className="bg-[#090d16]/90 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_rgba(3,105,161,0.15)] border border-[#1e293b] p-6 md:p-10 relative overflow-hidden">
          
          {/* Decorative Cyber Glow Lines */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent" />

          {/* Header */}
          <div className="flex items-center gap-5 mb-8 pb-6 border-b border-[#1e293b]">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-[#0ea5e9] blur-xl opacity-30 rounded-full" />
              <img 
                src="/z-logo.png" 
                alt="Zipher Logo" 
                className="w-16 h-16 md:w-20 md:h-20 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]" 
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-[#bae6fd] to-[#38bdf8] bg-clip-text text-transparent">
                Zipher Data Policy
              </h1>
              <p className="text-[#94a3b8] text-xs md:text-sm mt-1 font-medium tracking-wide">
                Your Data <span className="text-[#0ea5e9] font-bold mx-1">|</span> Our Responsibility
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Information */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#38bdf8] mb-4 pb-1.5 border-b border-[#1e293b]/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" /> Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Full Name" name="fullName" placeholder="Enter your full name" value={form.fullName} onChange={handleChange} required />
                <Input label="Username" name="username" placeholder="Enter your username" value={form.username} onChange={handleChange} required />
                <Input label="Email Address" name="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
                <Input label="Age" name="age" type="number" placeholder="Enter your age" value={form.age} onChange={handleChange} />
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#38bdf8] mb-4 pb-1.5 border-b border-[#1e293b]/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" /> Location Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Zip Code" name="zipCode" placeholder="Enter zip code" value={form.zipCode} onChange={handleChange} />
                <Input label="City" name="city" placeholder="Enter city name" value={form.city} onChange={handleChange} />
                <div className="md:col-span-2">
                  <Input label="Country" name="country" placeholder="Enter country name" value={form.country} onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* Gender */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#38bdf8] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" /> Gender
              </h2>
              <div className="grid md:grid-cols-3 gap-3">
                <RadioOption label="Male" name="gender" value="Male" selected={form.gender} onChange={handleChange} />
                <RadioOption label="Female" name="gender" value="Female" selected={form.gender} onChange={handleChange} />
                <RadioOption label="Prefer not to say" name="gender" value="Prefer not to say" selected={form.gender} onChange={handleChange} />
              </div>
            </section>

            {/* Subsidy Benefits */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#38bdf8] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" /> Subsidy Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                <RadioOption label="SSDI" name="subsidyBenefit" value="SSDI" selected={form.subsidyBenefit} onChange={handleChange} />
                <RadioOption label="SSI" name="subsidyBenefit" value="SSI" selected={form.subsidyBenefit} onChange={handleChange} />
              </div>
            </section>

            {/* Health Medicare */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#38bdf8] mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" /> Health Medicare
              </h2>
              <p className="text-xs text-[#94a3b8] mb-3">
                Select your coverage type
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <RadioOption label="Premium" name="healthMedicare" value="Premium" selected={form.healthMedicare} onChange={handleChange} />
                <RadioOption label="Standard" name="healthMedicare" value="Standard" selected={form.healthMedicare} onChange={handleChange} />
                <RadioOption label="Basic" name="healthMedicare" value="Basic" selected={form.healthMedicare} onChange={handleChange} />
              </div>
            </section>

            {/* Eligibility (With descriptive text and radio buttons below, positioned last) */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#38bdf8] mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" /> Eligibility
              </h2>
              <p className="text-xs text-[#94a3b8] mb-3">
                Please confirm if you meet the age requirement to proceed with your data policy submission.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <RadioOption label="I am 18 +" name="eligibility" value="I am 18 +" selected={form.eligibility} onChange={handleChange} />
                <RadioOption label="Under 18" name="eligibility" value="Under 18" selected={form.eligibility} onChange={handleChange} />
              </div>
            </section>

            {/* Query Box */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#38bdf8] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" /> Query
              </h2>
              <textarea
                name="query"
                value={form.query}
                onChange={handleChange}
                placeholder="Write your query here..."
                rows={4}
                className="w-full rounded-sm border border-[#1e293b] bg-[#020617]/60 p-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20"
              />
            </section>

            {/* Result */}
            {result && (
              <div className={`p-4 rounded-sm text-sm font-medium border ${result.includes("successfully") ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300" : "bg-rose-950/40 border-rose-500/30 text-rose-300"}`}>
                {result}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="w-1/2 py-3.5 rounded-sm border border-[#1e293b] bg-[#020617]/40 hover:bg-[#1e293b]/40 text-slate-300 font-semibold text-sm transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 py-3.5 rounded-sm font-semibold text-sm transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#2563eb] text-white hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

            {/* TRUSTED PARTNERS & SERVICES INTEGRATION */}
            <div className="pt-6 border-t border-[#1e293b]">
              <h3 className="text-[11px] font-bold tracking-widest mb-4 text-center uppercase text-slate-500">
                Trusted Partners & Services
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-6">
                <img src="/logo1.png" alt="Logo 1" className="h-6 object-contain hover:opacity-100 transition-opacity duration-300 filter drop-shadow" />
                <img src="/logo2.png" alt="Logo 2" className="h-6 object-contain hover:opacity-100 transition-opacity duration-300 filter drop-shadow" />
                <img src="/logo3.png" alt="Logo 3" className="h-6 object-contain hover:opacity-100 transition-opacity duration-300 filter drop-shadow" />
                <img src="/logo4.png" alt="Logo 4" className="h-6 object-contain hover:opacity-100 transition-opacity duration-300 filter drop-shadow" />
              </div>
            </div>

          </form>
        </div>

      </div>
    </main>
  );
}

/* Reusable Input Component matching the clean UI style */
function Input({ label, name, value, onChange, type = "text", placeholder = "", required = false }: InputProps) {
  return (
    <div>
      <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-sm border border-[#1e293b] bg-[#020617]/60 p-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20"
      />
    </div>
  );
}

/* Reusable Radio Component */
function RadioOption({ label, name, value, selected, onChange }: RadioOptionProps) {
  const isSelected = selected === value;
  return (
    <label
      className={`flex items-center gap-3 p-3.5 rounded-sm border cursor-pointer text-sm transition-all ${
        isSelected
          ? "border-[#0ea5e9] bg-[#0ea5e9]/10 shadow-[0_0_15px_rgba(14,165,233,0.15)] text-white"
          : "border-[#1e293b] bg-[#020617]/40 hover:bg-[#1e293b]/40 text-slate-300"
      }`}
    >
      <input type="radio" name={name} value={value} checked={isSelected} onChange={onChange} className="accent-[#0ea5e9]" />
      <span className="font-medium">{label}</span>
    </label>
  );


  
}