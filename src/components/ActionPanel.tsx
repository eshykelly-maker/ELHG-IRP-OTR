import { AlertTriangle, CheckCircle2, ShieldAlert, Compass, Disc, ShieldCheck } from "lucide-react";
import { RiskLevel } from "../App";

export default function ActionPanel({ selectedRisk }: { selectedRisk: RiskLevel }) {
  const config = {
    alto: {
      action: "Reduzir velocidade, inspecionar pneus e corrigir superfícies.",
      Icon: AlertTriangle,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      badgeBorder: "border-red-200",
      badgeBg: "bg-red-50",
      title: "Intervenção Imediata",
      urgent: true,
      steps: [
        "Limitação de velocidade no trecho (Max 15km/h)",
        "Acionar equipe de manutenção de vias",
        "Medição de temperatura (TKPH real local)"
      ]
    },
    medio: {
      action: "Manter monitoramento, programar inspeção preventiva e corrigir irregularidades.",
      Icon: ShieldAlert,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      badgeBorder: "border-yellow-200",
      badgeBg: "bg-yellow-50",
      title: "Controle Preventivo",
      urgent: false,
      steps: [
        "Inspeção visual na próxima parada",
        "Acompanhar evolução de cortes",
        "Programar nivelamento parcial"
      ]
    },
    baixo: {
      action: "Manter inspeção e monitoramento padrão.",
      Icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      badgeBorder: "border-emerald-200",
      badgeBg: "bg-emerald-50",
      title: "Operação Padrão",
      urgent: false,
      steps: [
        "Seguir plano de manutenção regular",
        "Calibragem normal",
        "Velocidade de cruzeiro liberada"
      ]
    }
  };

  const current = config[selectedRisk || "alto"];
  const Icon = current.Icon;

  return (
    <div className="bg-white border-2 w-full border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col h-auto min-h-[170px] hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '1rem 1rem' }}></div>
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
            <ShieldCheck size={18} />
          </div>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
            Plano de Ação Recomendado
          </h3>
        </div>
      </div>
      
      <div className={`flex-1 flex flex-col rounded-xl border-2 ${current.border} bg-slate-50 overflow-hidden relative z-10 shadow-inner`}>
        {/* Inner Content Split */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Header Alert Column */}
          <div className={`p-4 flex items-center gap-4 ${current.bg} lg:w-5/12 shrink-0 border-b-2 lg:border-b-0 lg:border-r-2 ${current.border}`}>
            <div className={`p-3 rounded-xl bg-white shadow-sm border ${current.badgeBorder} ${current.color} shrink-0`}>
              <Icon size={26} />
            </div>
            <div>
              <div className={`text-xs font-black tracking-widest uppercase ${current.color} mb-1 flex items-center gap-1.5`}>
                {current.urgent && <span className="animate-pulse w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>}
                {current.title}
              </div>
              <div className="text-sm font-black text-slate-900 leading-tight">
                {current.action}
              </div>
            </div>
          </div>

          {/* Steps Column */}
          <div className="p-5 flex-1 flex flex-col justify-center bg-white/40">
            <div className="text-[10px] font-black text-slate-700 uppercase tracking-wider mb-2.5 font-mono">
              Passos Recomendados para Resolução
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {current.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 ${current.badgeBorder} ${current.badgeBg}`}>
                    <span className={`text-xs font-black ${current.color}`}>{idx + 1}</span>
                  </div>
                  <span className="text-slate-700 font-bold leading-tight">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="bg-slate-100/50 p-2.5 border-t border-slate-200/50 flex justify-between items-center text-[10px] text-slate-700 font-mono font-bold">
          <span className="flex items-center gap-1.5"><Compass size={13}/> AI OTR Analytics</span>
          <span className="flex items-center gap-1.5"><Disc size={13}/> Emitido em Tempo Real</span>
        </div>
      </div>
    </div>
  );
}
