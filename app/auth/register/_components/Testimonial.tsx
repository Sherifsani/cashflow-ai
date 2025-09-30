"use client"

import React from 'react';

export const Testimonial: React.FC = () => (
  <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl p-6">
    <p className="text-blue-100 italic mb-3">
      "Setup was so easy! Within 5 minutes I could see my cash flow predictions. Game changer for my restaurant!"
    </p>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
        A
      </div>
      <div>
        <div className="font-semibold text-white">Adaora Okeke</div>
        <div className="text-blue-200 text-xs">Restaurant Owner, Lagos</div>
      </div>
    </div>
  </div>
);

export default Testimonial;
