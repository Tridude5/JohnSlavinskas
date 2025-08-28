import React from "react";

export default function SkillsCard() {
  return (
    <aside className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur p-5 shadow-xl">
      <h3 className="font-semibold">Skills at a glance</h3>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-gray-500">Materials</div>
          <ul className="mt-1 space-y-1">
            <li>Lignin · Biopolymers</li>
            <li>Pulp &amp; Paper</li>
            <li>DOE/SPC · Rheology</li>
          </ul>
        </div>
        <div>
          <div className="text-gray-500">Programming</div>
          <ul className="mt-1 space-y-1">
            <li>Python · JS/TS · Java</li>
            <li>TensorFlow · Keras</li>
            <li>SQL / NoSQL</li>
          </ul>
        </div>
        <div>
          <div className="text-gray-500">Quant</div>
          <ul className="mt-1 space-y-1">
            <li>Option Pricing</li>
            <li>Efficient Frontier</li>
            <li>Backtesting</li>
          </ul>
        </div>
        <div>
          <div className="text-gray-500">Lab &amp; Tools</div>
          <ul className="mt-1 space-y-1">
            <li>FTIR · NMR · GC/VOC</li>
            <li>MATLAB · VBA</li>
            <li>Firebase</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
