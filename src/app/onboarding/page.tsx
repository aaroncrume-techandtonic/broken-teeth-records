'use client';

import { useEffect, useState } from 'react';
import logo from '../../../public/logo.jpg';

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

  // Format date for display
  const formatDate = (isoDate: string) => {
    if (!isoDate) return '';
    const dateObj = new Date(isoDate);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#f2efe9] text-[#111111] font-special relative print:bg-white">
      {/* Control Panel - not printed */}
      <div id="print-controls" className="fixed top-0 left-0 w-full bg-[#f2efe9] z-50 print:hidden border-b border-black shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center gap-4 py-4 px-6">
          <input
            type="text"
            placeholder="Contractor Name"
            value={formData.name}
            onChange={handleChange}
            id="inputName"
            className="border border-black rounded px-3 py-2 text-lg font-special focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            placeholder="Role/Job Title"
            value={formData.role}
            onChange={handleChange}
            id="inputRole"
            className="border border-black rounded px-3 py-2 text-lg font-special focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="date"
            value={formData.date}
            onChange={handleChange}
            id="inputDate"
            className="border border-black rounded px-3 py-2 text-lg font-special focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={() => window.print()}
            className="bg-black text-white px-6 py-2 rounded font-bold text-lg shadow hover:bg-[#222] transition print:hidden"
          >
            Print Packet
          </button>
        </div>
      </div>
      {/* End Control Panel */}
      {/* Printable Documents Container */}
      <div id="printable-docs" className="max-w-2xl mx-auto py-24 px-6 print:p-0">
        {/* Welcome Letter */}
        <div className="doc-page mb-24 print:mb-0 print:break-after-page print:text-[14px] print:leading-[1.35]">
          <div className="text-center mb-10">
            <img src={logo.src} alt="Broken Teeth Records Logo" className="w-32 h-32 mx-auto mb-4 object-contain bg-white/40 border border-black/20 print:w-24 print:h-24" loading="eager" />
            <h1 className="text-5xl font-black uppercase tracking-widest border-b-4 border-black pb-4 inline-block">
              Welcome to the family
            </h1>
          </div>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>To:</strong>{' '}
              <span className="inline-block min-w-[150px] border-b-2 border-dashed border-[#111111] font-bold text-center px-2">
                {formData.name || '__________________'}
              </span>
            </p>
            <p>
              <strong>Date:</strong>{' '}
              <span className="inline-block min-w-[150px] border-b-2 border-dashed border-[#111111] font-bold text-center px-2">
                {formatDate(formData.date) || '__________________'}
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
                {formData.role || '__________________'}
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
        {/* Contractor Agreement */}
        <div className="doc-page mb-24 print:mb-0 print:break-after-page print:text-[13px] print:leading-[1.3]">
          <div className="flex items-center justify-between border-b-4 border-black pb-6 mb-8">
            <h1 className="text-4xl font-black uppercase tracking-widest w-3/4">Contractor Agreement</h1>
            <img src={logo.src} alt="Broken Teeth Records Logo" className="w-16 h-16 object-contain bg-white/40 border border-black/20 print:w-12 print:h-12" loading="eager" />
          </div>
          <div className="space-y-6 text-sm md:text-base text-justify">
            <p>
              This Independent Contractor Agreement ("Agreement") is made and entered into as of{' '}
              <span className="inline-block min-w-[100px] border-b-2 border-dashed border-[#111111] font-bold text-center px-1">
                {formatDate(formData.date) || '__________________'}
              </span>
              , by and between <strong>Broken Teeth Records</strong> ("Label") and{' '}
              <span className="inline-block min-w-[100px] border-b-2 border-dashed border-[#111111] font-bold text-center px-1">
                {formData.name || '__________________'}
              </span>{' '}
              ("Contractor").
            </p>
            <h2 className="text-2xl font-black uppercase tracking-widest mt-8">1. Engagement of Services</h2>
            <p>
              The Label hereby engages the Contractor to perform services in the capacity of <strong>{formData.role || '__________________'}</strong>. The Contractor agrees to provide these services with the raw intensity and professional standard expected by Broken Teeth Records.
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
                <p className="font-bold uppercase text-xs">Contractor: {formData.name || '__________________'}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Certificate of Initiation */}
        <div className="doc-page print:mb-0 print:break-after-auto print:text-[13px] print:leading-[1.25]">
          <div className="border-6 border-double border-[#111111] p-8 flex flex-col items-center justify-center text-center py-16 print:py-8 print:px-6">
            <img src={logo.src} alt="Broken Teeth Records Logo" className="w-40 h-40 mx-auto mb-8 object-contain bg-white/40 border border-black/20 print:w-28 print:h-28 print:mb-5" loading="eager" />
            <h3 className="text-2xl tracking-widest mb-2 font-black uppercase">Official Induction</h3>
            <h1 className="text-6xl md:text-7xl print:text-5xl font-black uppercase mb-8 print:mb-5 border-y-4 border-black py-4 print:py-3 w-full">
              Certificate of Initiation
            </h1>
            <p className="text-xl mb-4">This document certifies that</p>
            <h2 className="text-4xl md:text-5xl print:text-3xl border-b-2 border-dashed border-black pb-2 mb-4 px-8 min-w-[50%] font-black uppercase">
              {formData.name || '__________________'}
            </h2>
            <p className="text-lg max-w-lg mx-auto mb-12">
              has officially signed on as an independent contractor in the role of <strong>{formData.role || '__________________'}</strong>. You are now officially recognized as part of the underground machinery that drives this label.
            </p>
            <h3 className="text-3xl print:text-2xl font-bold mb-16 print:mb-8 uppercase">Keep it loud. Keep it raw.</h3>
            <div className="flex w-full justify-between px-8 md:px-16 print:px-8 mt-auto">
              <div className="text-center w-1/3">
                <div className="border-b-2 border-black h-12 mb-2"></div>
                <p className="uppercase text-sm tracking-widest font-bold">Label Head</p>
              </div>
              <div className="text-center w-1/3">
                <div className="border-b-2 border-black h-12 mb-2 flex items-end justify-center pb-1 text-lg font-bold">
                  {formatDate(formData.date) || '__________________'}
                </div>
                <p className="uppercase text-sm tracking-widest font-bold">Date of Induction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



