'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CalendlyFormPrefillProps {
  calendarUrl?: string
}
export default function CalendlyFormPrefill( {calendarUrl} : CalendlyFormPrefillProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the URL using form values
    // Note 'a1' is the first custom question in this Calendly form
    const url = `${calendarUrl}?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&a1=${encodeURIComponent(formData.phoneNumber)}`;

    router.push(url);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <label className="flex-1">
            
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 form-input w-full text-gray-900"
              placeholder="e.g. Peter Jones"
            />
          </label>
          <label className="">
           
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 form-input w-full text-gray-900"
              placeholder="e.g. name@domain.com"
            />
          </label>
          <label className="flex-1">
            
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-2 form-input w-full text-gray-900"
              placeholder="e.g. 447961543221"
            />
          </label>
          <button type="submit" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-2">
            Schedule Call
          </button>
        </div>
        
        
      </form>
    </div>
  );
}
