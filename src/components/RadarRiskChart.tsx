import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { Activity, Maximize2, Minimize2 } from "lucide-react";
import { RiskLevel } from "../App";
import { useMemo, useState } from "react";

export default function RadarRiskChart({ 
  selectedRisk, 
  dynamicData
}: { 
  selectedRisk?: RiskLevel | "critico",
  dynamicData?: { cp: number, ie: number, st: number, pt: number, as: number }
}) {
  const [isMaximized, setIsMaximized] = useState(false);

  const data = useMemo(() => {
    let cp = 2, ie = 2, as = 2, pt = 1, st = 2;

    if (dynamicData) {
      cp = dynamicData.cp;
      ie = dynamicData.ie;
      st = dynamicData.st;
      pt = dynamicData.pt;
      as = dynamicData.as;
    } else {
      // Different varying profiles depending on risk, 
      // making it more irregular and characteristic of radar charts
      const risk = selectedRisk || "alto";
      if (risk === "baixo") {
        cp = 2.5; ie = 1.0; as = 3.5; pt = 1.5; st = 2.0;
      } else if (risk === "medio") {
        cp = 6.0; ie = 3.5; as = 5.0; pt = 2.5; st = 4.5;
      } else if (risk === "alto") {
        cp = 5.5; ie = 8.5; as = 6.0; pt = 3.0; st = 7.5;
      } else if (risk === "critico") {
        cp = 9.5; ie = 9.0; as = 7.5; pt = 8.0; st = 10.0;
      }
    }

    return [
      { subject: "Cortes (CP)", A: Number(cp.toFixed(1)), fullMark: 10 },
      { subject: "Impactos (IE)", A: Number(ie.toFixed(1)), fullMark: 10 },
      { subject: "Superaq. (ST)", A: Number(st.toFixed(1)), fullMark: 10 },
      { subject: "Patinagem (PT)", A: Number(pt.toFixed(1)), fullMark: 10 },
      { subject: "Abrasão (AS)", A: Number(as.toFixed(1)), fullMark: 10 },
    ];
  }, [selectedRisk, dynamicData]);

  return (
    <>
      <div className="bg-white border w-full border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col h-[320px] hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '1rem 1rem' }}></div>
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100">
              <Activity size={16} />
            </div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              Radar de Criticidade OTR
            </h3>
          </div>
          <div className="flex items-center gap-2 relative z-20">
            <span className="text-[9px] bg-indigo-50 border border-indigo-200 text-indigo-605 px-2.5 py-0.5 rounded-md font-extrabold tracking-widest font-mono">
              MULTIVARIÁVEL
            </span>
            <button
              onClick={() => setIsMaximized(true)}
              className="p-1.5 text-slate-400 hover:text-indigo-650 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors shrink-0"
              title="Maximizar Gráfico"
            >
              <Maximize2 size={15} />
            </button>
          </div>
        </div>
        <div className="w-full flex-1 flex items-center justify-center min-h-[200px] relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="72%" data={data} margin={{ top: 10, right: 35, bottom: 10, left: 35 }}>
              <PolarGrid stroke="#cbd5e1" strokeWidth={1.2} />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#0f172a', fontSize: 13, fontWeight: 800 }} 
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 10]} 
                tick={{ fill: '#334155', fontSize: 11, fontWeight: 700 }}
                tickCount={6}
              />
              <Tooltip 
                 contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  backdropFilter: "blur(4px)"
                }}
              />
              <Radar
                name="Nível de Criticidade"
                dataKey="A"
                stroke="#4f46e5"
                strokeWidth={3}
                fill="#6366f1"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {isMaximized && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200 z-[9999]">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl flex flex-col w-full max-w-5xl h-[85vh] hover:shadow-2xl transition-shadow relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '1rem 1rem' }}></div>
            
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100 shadow-sm">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                    Radar Multivariável de Criticidade OTR
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5 font-medium">
                    Visão integrada de severidade operacional e estressores térmico-mecânicos do pneu
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMaximized(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl border border-slate-200 hover:border-rose-200 text-xs font-black font-mono tracking-wide cursor-pointer transition-colors"
                title="Voltar ao Normal"
              >
                <Minimize2 size={15} />
                <span>VOLTAR AO NORMAL</span>
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden relative z-10">
              {/* Chart Side */}
              <div className="flex-1 min-h-[300px] flex items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-150 p-4 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data} margin={{ top: 15, right: 40, bottom: 15, left: 40 }}>
                    <PolarGrid stroke="#cbd5e1" strokeWidth={1.5} />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#0f172a', fontSize: 14, fontWeight: 900 }} 
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 10]} 
                      tick={{ fill: '#1e293b', fontSize: 12, fontWeight: 800 }}
                      tickCount={6}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.98)",
                        border: "2px solid #cbd5e1",
                        borderRadius: "12px",
                        fontSize: "13px",
                        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                      }}
                    />
                    <Radar
                      name="Nível de Criticidade"
                      dataKey="A"
                      stroke="#4f46e5"
                      strokeWidth={4.5}
                      fill="#6366f1"
                      fillOpacity={0.45}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Data and details side */}
              <div className="w-full md:w-85 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200/80 pt-4 md:pt-0 md:pl-6 overflow-y-auto">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-indigo-750 uppercase tracking-widest font-mono font-bold">
                    Valores das Variáveis Simuladas
                  </h4>
                  <div className="space-y-3.5">
                    {data.map((item, idx) => {
                      const value = item.A;
                      let progressColor = "bg-emerald-550 shadow-[0_0_8px_rgba(16,185,129,0.3)]";
                      let textColor = "text-emerald-700";
                      let ratingLabel = "Baixo";
                      if (value > 7) {
                        progressColor = "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]";
                        textColor = "text-rose-700 font-extrabold";
                        ratingLabel = "Crítico";
                      } else if (value > 4) {
                        progressColor = "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]";
                        textColor = "text-amber-700";
                        ratingLabel = "Médio";
                      }
                      
                      return (
                        <div key={idx} className="bg-slate-50 border border-slate-150 rounded-xl p-3 shadow-xs">
                          <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                            <span className="text-slate-800 font-extrabold uppercase">{item.subject}</span>
                            <span className={`text-[10px] font-mono leading-none bg-white py-1 px-2 border border-slate-200 rounded-md ${textColor}`}>
                              {value.toFixed(1)} <span className="text-slate-400 font-normal">/ 10</span> ({ratingLabel})
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-205 rounded-full overflow-hidden">
                            <div className={`h-full ${progressColor} transition-all duration-300`} style={{ width: `${value * 10}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="pt-4 text-[10px] font-mono text-slate-400 font-bold flex items-center justify-between border-t border-slate-100 mt-4">
                  <span>AI MULTIVARIATE INTERACTION</span>
                  <span>GEOMETRIA OTR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
