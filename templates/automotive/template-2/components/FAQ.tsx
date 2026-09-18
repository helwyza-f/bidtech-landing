"use client";

import React, { useState } from 'react';
import { FAQS } from '@/lib/constants';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    if (openIdx === idx) {
      setOpenIdx(null);
    } else {
      setOpenIdx(idx);
    }
  };

  return (
    <section id="faq" className="py-20 bg-surface overflow-hidden w-full max-w-[100vw]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-primary text-xs font-bold tracking-widest uppercase mb-4 rounded-sm">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border border-border rounded-xl overflow-hidden transition-colors ${openIdx === idx ? 'bg-white' : 'bg-transparent'}`}
            >
              <button 
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                onClick={() => toggleFaq(idx)}
              >
                <span className="font-bold text-lg pr-8">{faq.question}</span>
                <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 text-sm text-gray-500">
          Punya pertanyaan lain? <a href="#kontak" className="text-foreground font-bold hover:text-primary transition-colors">Hubungi CS Kami</a>
        </div>
        
      </div>
    </section>
  );
}
