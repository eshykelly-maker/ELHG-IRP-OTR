import { Activity, Thermometer, Zap, Gauge, AlertTriangle, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { RiskLevel } from "../App";

// High-tech OTR Tire Icon (Static and Technical)
function TireIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Outer tread boundaries */}
      <circle cx="12" cy="12" r="9.5" strokeDasharray="3 2" />
      {/* Heavy core tyre shape */}
      <circle cx="12" cy="12" r="8" strokeWidth="2.5" />
      {/* Master steel rim */}
      <circle cx="12" cy="12" r="5" strokeWidth="1.5" strokeDasharray="4 2" />
      {/* Center hub and axle bolt */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      
      {/* Hardcore industrial tread ribs around the tire */}
      <path d="M12 2.5 L12 4.5" />
      <path d="M12 19.5 L12 21.5" />
      <path d="M2.5 12 L4.5 12" />
      <path d="M19.5 12 L21.5 12" />
      <path d="M5.3 5.3 L6.7 6.7" />
      <path d="M17.3 17.3 L18.7 18.7" />
      <path d="M18.7 5.3 L17.3 6.7" />
      <path d="M6.7 17.3 L5.3 18.7" />
    </svg>
  );
}

export default function Header({ 
  selectedRisk = "baixo",
}: { 
  selectedRisk?: RiskLevel;
}) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR', { hour12: false }) + " BRT");
      const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
      const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
      setDate(`${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  let severityScore = "7.8";
  let severityLabel = "Crítico";
  let severityColorText = "text-red-400";
  let severityColorBg = "bg-red-950/40";
  let severityBorder = "border-red-700";
  let severityBadgeBg = "bg-red-900 border border-red-700";
  let severityBadgeText = "text-white";
  let alertsCount = "4";

  switch (selectedRisk) {
    case "baixo":
      severityScore = "2.1";
      severityLabel = "Baixa";
      severityColorText = "text-emerald-400";
      severityColorBg = "bg-emerald-950/40";
      severityBorder = "border-emerald-700";
      severityBadgeBg = "bg-emerald-900 border border-emerald-700";
      severityBadgeText = "text-white";
      alertsCount = "0";
      break;
    case "medio":
      severityScore = "4.5";
      severityLabel = "Moderad.";
      severityColorText = "text-yellow-400";
      severityColorBg = "bg-yellow-950/40";
      severityBorder = "border-yellow-700";
      severityBadgeBg = "bg-yellow-900 border border-yellow-700";
      severityBadgeText = "text-white";
      alertsCount = "1";
      break;
    case "alto":
      severityScore = "6.2";
      severityLabel = "Alta";
      severityColorText = "text-orange-400";
      severityColorBg = "bg-orange-950/40";
      severityBorder = "border-orange-700";
      severityBadgeBg = "bg-orange-900/80 border border-orange-700";
      severityBadgeText = "text-white";
      alertsCount = "2";
      break;
  }

  return (
    <header className="h-20 flex items-center justify-between bg-[#0b1121] border-b-2 border-slate-700 px-5 shrink-0 relative z-20 w-full overflow-hidden select-none">
      
      {/* Logos and system info */}
      <div className="flex items-center gap-4 shrink-0 pr-4">
        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shrink-0 shadow-md">
          <TireIcon className="text-black" />
        </div>
        
        <div className="flex flex-col justify-center gap-0.5">
          <div className="flex items-center mb-0.5">
            <span className="text-[11px] font-black text-amber-400 bg-amber-500/15 border border-amber-500/45 px-2.5 py-0.5 rounded-lg uppercase tracking-wider leading-none font-mono">
              COI OPERAÇÕES
            </span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl leading-none font-black text-white uppercase tracking-tight">
              IRP - OTR
            </h1>
            <span className="text-slate-600 font-bold text-lg leading-none">|</span>
            <span className="text-sm leading-none font-extrabold text-slate-300 tracking-tight">
              Dashboard de Integridade
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards - Absolutely Centered on md and up for perfect symmetry */}
      <div className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-in fade-in duration-300">
        
        {/* Card 2: TKPH Global */}
        <div className="flex flex-col bg-slate-900/80 border-2 border-slate-700 rounded-xl py-1.5 px-5 min-w-[145px] hover:border-slate-500 transition-all shadow-md">
          <span className="text-xs font-black text-slate-300 uppercase tracking-wider mb-1 font-mono text-center">TKPH Global</span>
          <div className="flex items-baseline gap-1 justify-center">
            <span className="text-xl font-black text-white leading-none">395</span>
            <span className="text-xs font-black text-slate-300">km·t/h</span>
          </div>
        </div>

        {/* Card 3: Severidade Estrada (Dynamic) */}
        <div className={`flex flex-col border-2 rounded-xl py-1.5 px-5 min-w-[200px] transition-all hover:brightness-110 shadow-md ${severityColorBg} ${severityBorder}`}>
          <span className="text-xs font-black text-slate-300 uppercase tracking-wider mb-1 leading-tight font-mono text-center">Severidade Estrada</span>
          <div className="flex items-center gap-2.5 justify-center">
            <span className={`text-xl font-black leading-none ${severityColorText}`}>{severityScore}</span>
            <span className={`text-xs font-black px-2.5 py-[2px] rounded uppercase leading-none font-mono ${severityBadgeText} ${severityBadgeBg}`}>
              {severityLabel}
            </span>
          </div>
        </div>

        {/* Card 4: Alertas OTR */}
        <div className="flex flex-col bg-slate-900/80 border-2 border-slate-700 rounded-xl py-1.5 px-5 min-w-[145px] hover:border-slate-500 transition-all shadow-md">
          <span className="text-xs font-black text-amber-500 uppercase tracking-wider mb-1 font-mono text-center">Alertas OTR</span>
          <div className="flex items-baseline gap-1 justify-center">
            <span className="text-xl font-black text-amber-500 leading-none">{alertsCount}</span>
            <span className="text-xs font-black text-slate-300">{alertsCount === "0" ? 'Nenhum' : 'Críticos'}</span>
          </div>
        </div>

      </div>

      {/* Fallback layout for very small mobile screens below md */}
      <div className="flex md:hidden items-center gap-4 shrink-0 flex-1 justify-center px-4 animate-in fade-in duration-300">
        <div className={`flex items-center gap-2 border-2 rounded-lg py-1 px-3 ${severityColorBg} ${severityBorder}`}>
          <span className="text-sm font-black text-white leading-none">{severityScore}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 font-mono">{severityLabel}</span>
        </div>
      </div>

      {/* Date Time & Status Info */}
      <div className="flex items-center gap-4 shrink-0 pl-1">
        <div className="flex flex-col items-end justify-center">
          <span className="text-xs font-black text-slate-300 uppercase tracking-wider font-mono">{date}</span>
          <span className="text-sm font-black font-mono tracking-tight text-white">{time}</span>
        </div>
      </div>

    </header>
  );
}
