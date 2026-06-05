import { Info } from "lucide-react";

export default function DiagnosticoPneus({ selectedRisk = "baixo", truckName = "CAT 793-07" }: { selectedRisk?: string, truckName?: string }) {
  // Config cores baseadas no risco
  let colors = {
    1: "bg-emerald-500", 2: "bg-emerald-500",
    3: "bg-emerald-500", 4: "bg-emerald-500",
    5: "bg-emerald-500", 6: "bg-emerald-500"
  };

  if (selectedRisk === "medio") {
    colors = {
      1: "bg-teal-500", 2: "bg-emerald-500",
      3: "bg-yellow-500", 4: "bg-emerald-500",
      5: "bg-emerald-500", 6: "bg-emerald-500"
    };
  } else if (selectedRisk === "alto") {
    colors = {
      1: "bg-teal-500", 2: "bg-emerald-500",
      3: "bg-orange-500", 4: "bg-emerald-500",
      5: "bg-emerald-500", 6: "bg-red-500"
    };
  } else if (selectedRisk === "critico") {
    colors = {
      1: "bg-yellow-500", 2: "bg-orange-500",
      3: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse", 4: "bg-orange-500",
      5: "bg-red-500", 6: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"
    };
  }

  return (
    <div className="bg-slate-100 border-2 border-slate-300 rounded-xl overflow-hidden relative mb-4 shadow-sm">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '0.5rem 0.5rem' }}></div>
      
      <div className="p-4 border-b-2 border-slate-200 flex justify-between items-center bg-white relative z-10">
        <div className="flex items-center gap-2">
          <Info size={18} className="text-indigo-600 stroke-[2.5]" />
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider font-mono">
            Diagnóstico Array OTR
          </h3>
        </div>
        <span className="text-xs font-black bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-300 font-mono tracking-wide">
          {truckName}
        </span>
      </div>
      
      <div className="py-3.5 px-4 flex flex-col items-center relative z-10">
        {/* Compact Highly Legible Truck Diagram */}
        <div className="relative w-[134px] h-[174px] border-2 border-slate-300 rounded-xl bg-white/60 p-2.5 flex flex-col justify-between items-center shadow-md overflow-hidden">
          
          {/* Beautiful SVG Haul Truck Chassis Drawing (rendered behind the tires) */}
          <svg className="absolute inset-0 w-full h-full p-2 pointer-events-none z-0" viewBox="0 0 112 144" fill="none">
            {/* Main grid pattern background for technical blueprint feeling */}
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="112" height="144" fill="url(#grid)" rx="8" className="opacity-40" />

            {/* Rear Dump Bed (Caçamba) Body */}
            <rect x="24" y="44" width="64" height="72" rx="4" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" />
            
            {/* Ribs / Ridges on the dump body */}
            <line x1="28" y1="54" x2="84" y2="54" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="67" x2="84" y2="67" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="80" x2="84" y2="80" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="93" x2="84" y2="93" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="106" x2="84" y2="106" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />

            {/* Hydraulic Pistons (Dampers/Telescopics at the front of caçamba) */}
            <rect x="40" y="38" width="6" height="8" rx="1" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
            <rect x="66" y="38" width="6" height="8" rx="1" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />

            {/* Main Chassis rails from front to rear */}
            <rect x="44" y="24" width="24" height="92" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.2" />

            {/* Front Bumper & Grill */}
            <rect x="24" y="14" width="64" height="10" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
            {/* Grille lines */}
            <line x1="32" y1="19" x2="80" y2="19" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />

            {/* Operator's Cab (Top-left, near tire 1, characteristic of CAT 793) */}
            <rect x="22" y="20" width="16" height="16" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="1" />
            <rect x="24" y="22" width="10" height="6" rx="1" fill="#bae6fd" stroke="#38bdf8" strokeWidth="0.8" /> {/* Windshield */}
            <rect x="33" y="22" width="3" height="8" rx="0.5" fill="#bae6fd" opacity="0.7" /> {/* Side window */}

            {/* Front Axle */}
            <line x1="18" y1="28" x2="94" y2="28" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />

            {/* Rear Axle */}
            <line x1="14" y1="102" x2="98" y2="102" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

            {/* Exhaust Muffler on the opposite front-right platform */}
            <circle cx="82" cy="24" r="2.5" fill="#64748b" stroke="#334155" strokeWidth="0.8" />
            <rect x="74" y="21" width="3" height="6" rx="0.5" fill="#94a3b8" />
          </svg>
          
          {/* Front Axle Tires */}
          <div className="w-full flex justify-between items-center z-10 mt-0.5 relative px-1">
             <Tire num={1} colorClass={colors[1]} />
             <Tire num={2} colorClass={colors[2]} />
          </div>

          {/* Rear Axle Tires */}
          <div className="w-full flex justify-between items-center z-10 mb-0.5 relative px-0.5">
             <div className="flex gap-0.5">
               <Tire num={3} colorClass={colors[3]} />
               <Tire num={4} colorClass={colors[4]} />
             </div>
             <div className="flex gap-0.5">
               <Tire num={5} colorClass={colors[5]} />
               <Tire num={6} colorClass={colors[6]} />
             </div>
          </div>
        </div>
        <div className="mt-2.5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center font-mono">
          STATUS 6 POSIÇÕES (PNEUS OTR)
        </div>
      </div>
    </div>
  );
}

function Tire({ num, colorClass }: { num: number, colorClass: string }) {
  return (
    <div className={`w-[22px] h-[38px] rounded-md shrink-0 ${colorClass} flex items-center justify-center text-xs font-black text-white cursor-pointer hover:brightness-110 active:scale-95 transition-all border border-black/20 z-10 shadow-md`}>
      {num}
    </div>
  );
}

