'use client';

import { useEffect, useState } from 'react';

export default function OnboardingPacket() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('input', '').toLowerCase();
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '[DATE]';
    const dateObj = new Date(dateString);
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const displayName = formData.name || '[CONTRACTOR NAME]';
  const displayRole = formData.role || '[ROLE]';
  const displayDate = formatDate(formData.date);

  return (
    <div className="bg-[#f2efe9] text-[#111111] font-serif min-h-screen selection:bg-black selection:text-white">
      {/* Paper Texture Background */}
      <style>{`
        body {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        
        @media print {
          .control-panel { display: none !important; }
          .doc-page {
            page-break-after: always;
          }
        }
      `}</style>

      {/* Control Panel */}
      <div className="bg-[#111111] text-[#f2efe9] sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="text-xs uppercase tracking-widest opacity-70 block mb-2">
                Contractor Name
              </label>
              <input
                type="text"
                id="inputName"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-[#f2efe9] text-[#f2efe9] placeholder-opacity-50 focus:outline-none focus:border-[#ff3333] font-serif"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest opacity-70 block mb-2">
                Contractor Role
              </label>
              <input
                type="text"
                id="inputRole"
                placeholder="e.g. Session Drummer"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-[#f2efe9] text-[#f2efe9] placeholder-opacity-50 focus:outline-none focus:border-[#ff3333] font-serif"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest opacity-70 block mb-2">
                Date
              </label>
              <input
                type="date"
                id="inputDate"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-[#f2efe9] text-[#f2efe9] focus:outline-none focus:border-[#ff3333] font-serif"
              />
            </div>
            <button
              onClick={() => window.print()}
              className="bg-[#f2efe9] text-black px-6 py-2 font-bold uppercase tracking-widest hover:bg-gray-300 transition-colors border-2 border-transparent hover:border-black"
            >
              Print Packet
            </button>
          </div>
        </div>
      </div>

      {/* DOCUMENT 1: WELCOME LETTER */}
      <div className="doc-page max-w-4xl mx-auto bg-[#f2efe9] my-8 p-12 border-4 border-[#111111] shadow-lg">
        <div className="text-center mb-10">
          <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
            [Logo Placeholder]
          </div>
          <h1 className="text-5xl font-black uppercase tracking-widest border-b-4 border-black pb-4 inline-block">
            Welcome to the family
          </h1>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            <strong>To:</strong>{' '}
            <span className="inline-block min-w-[150px] border-b-2 border-dashed border-[#111111] font-bold text-center px-2">
              {displayName}
            </span>
          </p>
          <p>
            <strong>Date:</strong>{' '}
            <span className="inline-block min-w-[150px] border-b-2 border-dashed border-[#111111] font-bold text-center px-2">
              {displayDate}
            </span>
          </p>

          <p>
            You aren't here because you play it safe. You're here because you make noise, you push boundaries, and you understand what we do. Welcome to <strong>Broken Teeth Records</strong>.
          </p>

          <p>
            We built this label on the ideology that raw talent doesn't need a corporate filter. It needs a megaphone. We expect grit, we expect dedication, and we expect you to leave it all on the track (or the canvas, or the stage).
          </p>

          <p>
            As our newest{' '}
            <span className="inline-block min-w-[150px] border-b-2 border-dashed border-[#111111] font-bold text-center px-2">
              {displayRole}
            </span>
            , you are now part of an independent machine. Attached to this letter is your contractor agreement and your official initiation certificate.
          </p>

          <p>Read the contract. Sign it. Then let's get to work.</p>

          <div className="mt-16 pt-8 border-t-2 border-black w-1/2">
            <p className="font-bold text-xl uppercase tracking-widest">Management</p>
            <p className="text-sm">Broken Teeth Records</p>
          </div>
        </div>
      </div>

      {/* DOCUMENT 2: INDEPENDENT CONTRACTOR AGREEMENT */}
      <div className="doc-page max-w-4xl mx-auto bg-[#f2efe9] my-8 p-12 border-4 border-[#111111] shadow-lg">
        <div className="flex items-center justify-between border-b-4 border-black pb-6 mb-8">
          <h1 className="text-4xl font-black uppercase tracking-widest w-3/4">Contractor Agreement</h1>
          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
            [Logo]
          </div>
        </div>

        <div className="space-y-6 text-sm md:text-base text-justify">
          <p>
            This Independent Contractor Agreement ("Agreement") is made and entered into as of{' '}
            <span className="inline-block min-w-[100px] border-b-2 border-dashed border-[#111111] font-bold text-center px-1">
              {displayDate}
            </span>
            , by and between <strong>Broken Teeth Records</strong> ("Label") and{' '}
            <span className="inline-block min-w-[100px] border-b-2 border-dashed border-[#111111] font-bold text-center px-1">
              {displayName}
            </span>{' '}
            ("Contractor").
          </p>

          <h2 className="text-2xl font-black uppercase tracking-widest mt-8">1. Engagement of Services</h2>
          <p>
            The Label hereby engages the Contractor to perform services in the capacity of <strong>{displayRole}</strong>. The Contractor agrees to provide these services with the raw intensity and professional standard expected by Broken Teeth Records.
          </p>

          <h2 className="text-2xl font-black uppercase tracking-widest mt-6">2. Independent Contractor Status</h2>
          <p>
            The Contractor is an independent entity. This Agreement does not create an employer-employee relationship, partnership, or joint venture. The Contractor is responsible for their own taxes, gear, and insurance. We pay you for the gig; you handle the rest.
          </p>

          <h2 className="text-2xl font-black uppercase tracking-widest mt-6">3. Compensation</h2>
          <p>
            Compensation for services rendered will be paid out as agreed upon in a separate Work Order or email agreement per project. The Label agrees to pay the Contractor within 30 days of receipt of an approved invoice.
          </p>

          <h2 className="text-2xl font-black uppercase tracking-widest mt-6">4. Intellectual Property & Confidentiality</h2>
          <p>
            All masters, stems, artwork, and marketing materials created under this agreement are the sole property of Broken Teeth Records unless strictly negotiated otherwise in writing. Unreleased tracks, demos, and internal label communications are strictly confidential. Do not leak the noise.
          </p>

          <h2 className="text-2xl font-black uppercase tracking-widest mt-6">5. Term & Termination</h2>
          <p>
            This Agreement remains in effect until terminated by either party with a 14-day written notice. The Label reserves the right to terminate immediately for breach of confidentiality or failure to deliver agreed-upon services.
          </p>

          <div className="flex justify-between mt-16 pt-16 border-t-2 border-black gap-8">
            <div className="w-1/2">
              <div className="border-b-2 border-black h-8 mb-2"></div>
              <p className="font-bold uppercase text-xs">Broken Teeth Records (Authorized Signatory)</p>
            </div>
            <div className="w-1/2">
              <div className="border-b-2 border-black h-8 mb-2"></div>
              <p className="font-bold uppercase text-xs">Contractor: {displayName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* DOCUMENT 3: CONGRATULATIONS CERTIFICATE */}
      <div className="doc-page max-w-4xl mx-auto bg-[#f2efe9] my-8 p-12 border-4 border-[#111111] shadow-lg">
        <div className="border-6 border-double border-[#111111] p-8 flex flex-col items-center justify-center text-center py-16">
          <div className="w-40 h-40 mx-auto mb-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
            [Logo Placeholder]
          </div>

          <h3 className="text-2xl tracking-widest mb-2 font-black uppercase">Official Induction</h3>
          <h1 className="text-6xl md:text-7xl font-black uppercase mb-8 border-y-4 border-black py-4 w-full">
            Certificate of Initiation
          </h1>

          <p className="text-xl mb-4">This document certifies that</p>
          <h2 className="text-4xl md:text-5xl border-b-2 border-dashed border-black pb-2 mb-4 px-8 min-w-[50%] font-black uppercase">
            {displayName}
          </h2>

          <p className="text-lg max-w-lg mx-auto mb-12">
            has officially signed on as an independent contractor in the role of <strong>{displayRole}</strong>. You are now officially recognized as part of the underground machinery that drives this label.
          </p>

          <h3 className="text-3xl font-bold mb-16 uppercase">Keep it loud. Keep it raw.</h3>

          <div className="flex w-full justify-between px-8 md:px-16 mt-auto">
            <div className="text-center w-1/3">
              <div className="border-b-2 border-black h-12 mb-2"></div>
              <p className="uppercase text-sm tracking-widest font-bold">Label Head</p>
            </div>
            <div className="text-center w-1/3">
              <div className="border-b-2 border-black h-12 mb-2 flex items-end justify-center pb-1 text-lg font-bold">
                {displayDate}
              </div>
              <p className="uppercase text-sm tracking-widest font-bold">Date of Induction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
