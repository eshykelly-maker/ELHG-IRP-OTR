import React from "react";
import { Truck, ChevronLeft } from "lucide-react";
import { RiskLevel } from "../App";

export default function LeftPanel({
  selectedRisk,
  width,
  onCollapse,
}: {
  selectedRisk: RiskLevel;
  width?: number;
  onCollapse?: () => void;
}) {
  let equipmentData = {
    carga: "55.0",
    velocidade: "14.5",
    tkph: "800.0",
    sg: 7.0,
    cp: 6.5,
    ie: 7.5,
    sa: 4.0,
    pa: 2.0,
    sgDesc: "Fragmentação, umidade e irregularidades severas na pista de rolamento.",
    cpDesc: "Incidência elevada de fragmentos rochosos cortantes na via.",
    ieDesc: "Suscetibilidade a impactos bruscos em desníveis acentuados.",
    saDesc: "Acúmulo térmico além da dissipação (fator complementar de fadiga).",
    paDesc: "Perda de tração pontual na rampa por giro indesejado."
  };

  if (selectedRisk === "medio") {
    equipmentData = {
      carga: "55.0",
      velocidade: "18.0",
      tkph: "550.0",
      sg: 4.5,
      cp: 3.0,
      ie: 3.5,
      sa: 3.5,
      pa: 2.5,
      sgDesc: "Abrasividade intermediária com alguma presença de poeira e poças.",
      cpDesc: "Tráfego em pista com poucas pedras e fragmentos soltos.",
      ieDesc: "Irregularidades e ondulações leves no leito da via.",
      saDesc: "Incremento térmico estável por rolagem em rampa média.",
      paDesc: "Microescorregamentos contidos pela geometria do trecho."
    };
  } else if (selectedRisk === "baixo") {
    equipmentData = {
      carga: "55.0",
      velocidade: "22.5",
      tkph: "350.0",
      sg: 2.0,
      cp: 1.5,
      ie: 1.5,
      sa: 2.0,
      pa: 1.0,
      sgDesc: "Pista perfeitamente plana, regularizada com ótima aderência.",
      cpDesc: "Via altamente limpa, sem ameaça iminente de cortes.",
      ieDesc: "Superfície regular, bem compactada e em perfeito nível.",
      saDesc: "Status térmico excelente com ótima dissipação natural.",
      paDesc: "Excelente aderência e coeficiente de atrito (grip ideal)."
    };
  }

  return (
    <aside 
      style={{ width: width ? `${width}px` : "300px" }}
      className="shrink-0 bg-white border-r border-slate-300 flex flex-col h-full overflow-y-auto font-sans select-none"
    >
      {/* HEADER - MATCHES PAGE 4 AESTHETICS */}
      <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-2 text-slate-800 bg-slate-150 font-sans">
        <div className="flex items-center gap-2">
          <Truck size={20} className="text-indigo-600 stroke-[2.5]" />
          <h2 className="text-sm font-black uppercase tracking-wider">
            Ficha do Equipamento
          </h2>
        </div>
        {onCollapse && (
          <button
            onClick={onCollapse}
            className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors shrink-0"
            title="Minimizar Coluna"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* SPECS BOARD - MATCHES PAGE 4 bg-slate-50/50 etc */}
      <div className="p-5 space-y-5 border-b border-slate-200 bg-slate-50/50">
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider font-mono">
            Identificação
          </label>
          <input
            type="text"
            value="CAT 793-07"
            readOnly
            className="w-full bg-slate-100 border-2 border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-black text-slate-800 focus:outline-none"
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider font-mono">
            Pneu & Posição
          </label>
          <input
            type="text"
            value="MICHELIN 40.00R57 • TD"
            readOnly
            className="w-full bg-slate-100 border-2 border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-black text-slate-800 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider font-mono flex justify-between">
              <span>Carga</span>
              <span className="text-slate-600 font-bold">ton</span>
            </label>
            <input
              type="text"
              value={equipmentData.carga}
              readOnly
              className="w-full bg-slate-100 border-2 border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-black text-slate-800 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider font-mono flex justify-between">
              <span>Velocidade</span>
              <span className="text-slate-600 font-sans tracking-normal font-bold lowercase">km/h</span>
            </label>
            <input
              type="text"
              value={equipmentData.velocidade}
              readOnly
              className="w-full bg-slate-100 border-2 border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-black text-slate-800 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* TKPH CONTROLLER BOX */}
      <div className="p-5 bg-indigo-50 border-b-2 border-indigo-200 text-center">
        <div className="text-xs font-black text-indigo-950 uppercase tracking-wider mb-1 font-mono">TKPH ATUAL</div>
        <div className="text-4xl font-black text-indigo-700 font-mono mb-1 tracking-tight">
          {equipmentData.tkph}
        </div>
        <div className="text-[11px] font-bold text-indigo-600 font-mono uppercase bg-white/70 border border-indigo-200 inline-block px-3 py-1 rounded-md">
          Limite teórico OTR: 960 TKPH
        </div>
      </div>

      {/* VARIABLES - BEAUTIFUL REPLICAS OF PAGE 4 SLIDERS, BUT STATIC */}
      <div className="p-5 flex-1 space-y-6">
        <StaticSliderControl 
          title="Severidade Geotécnica (SG)" 
          val={equipmentData.sg} 
          desc={equipmentData.sgDesc} 
        />
        <StaticSliderControl 
          title="Cortes e Perfurações (CP)" 
          val={equipmentData.cp} 
          desc={equipmentData.cpDesc} 
        />
        <StaticSliderControl 
          title="Impactos e Separação (IE)" 
          val={equipmentData.ie} 
          desc={equipmentData.ieDesc} 
        />
        <StaticSliderControl 
          title="Superaquecimento (SA)" 
          val={equipmentData.sa} 
          desc={equipmentData.saDesc} 
        />
        <StaticSliderControl 
          title="Patinagem (PA)" 
          val={equipmentData.pa} 
          desc={equipmentData.paDesc} 
        />
      </div>
    </aside>
  );
}

function StaticSliderControl({ title, val, desc }: { title: string; val: number; desc: string }) {
  const percent = (val / 10) * 100;
  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-slate-700">{title}</label>
        <span className="text-base font-mono font-bold text-indigo-600">{val.toFixed(1)}</span>
      </div>
      <div className="relative w-full h-2 bg-slate-200 rounded-full flex items-center">
        {/* Progress bar filled part */}
        <div 
          className="h-2 bg-indigo-600 rounded-full absolute left-0 top-0 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
        {/* Simulated range thumb */}
        <div 
          className="w-4 h-4 bg-white border-2 border-indigo-600 rounded-full absolute -ml-2 shadow-sm transition-all duration-300"
          style={{ left: `${percent}%` }}
        />
      </div>
      <p className="text-xs leading-tight text-slate-600 font-medium transition-colors">
        {desc}
      </p>
    </div>
  );
}
