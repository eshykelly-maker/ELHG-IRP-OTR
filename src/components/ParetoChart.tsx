import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart2, Maximize2, Minimize2 } from "lucide-react";
import { RiskLevel } from "../App";
import { useMemo, useState } from "react";

const RISK_DATA = {
  alto: [
    { label: "TKPH", value: 0.20 },
    { label: "Impactos", value: 0.15 },
    { label: "Sev. Geo", value: 0.14 },
    { label: "Cortes", value: 0.13 },
    { label: "Aquec.", value: 0.04 },
    { label: "Patinagem", value: 0.01 },
  ],
  medio: [
    { label: "TKPH", value: 0.14 },
    { label: "Sev. Geo", value: 0.09 },
    { label: "Impactos", value: 0.07 },
    { label: "Cortes", value: 0.06 },
    { label: "Aquec.", value: 0.04 },
    { label: "Patinagem", value: 0.01 },
  ],
  baixo: [
    { label: "TKPH", value: 0.09 },
    { label: "Sev. Geo", value: 0.04 },
    { label: "Cortes", value: 0.03 },
    { label: "Impactos", value: 0.03 },
    { label: "Aquec.", value: 0.02 },
    { label: "Patinagem", value: 0.00 },
  ],
};

export default function ParetoChart({
  selectedRisk,
}: {
  selectedRisk: RiskLevel;
}) {
  const [isMaximized, setIsMaximized] = useState(false);

  const data = useMemo(() => {
    const rawData = RISK_DATA[selectedRisk || "alto"];
    const sortedData = [...rawData].sort((a, b) => b.value - a.value);
    
    const total = sortedData.reduce((sum, item) => sum + item.value, 0);
    let cumulative = 0;

    return sortedData.map((item) => {
      cumulative += item.value;
      return {
        ...item,
        cumulativePercentage: total > 0 ? (cumulative / total) * 100 : 0,
      };
    });
  }, [selectedRisk]);

  return (
    <>
      <div className="bg-white border w-full border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col h-[320px] hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '1rem 1rem' }}></div>
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100">
              <BarChart2 size={16} />
            </div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              Análise de Pareto <span className="text-slate-500 font-normal normal-case ml-1 text-xs">(Composição de Riscos)</span>
            </h3>
          </div>
          <button
            onClick={() => setIsMaximized(true)}
            className="p-1.5 text-slate-400 hover:text-indigo-650 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors shrink-0"
            title="Maximizar Gráfico"
          >
            <Maximize2 size={15} />
          </button>
        </div>
        <div className="w-full flex-1 min-h-[200px] relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{
                top: 15,
                right: 15,
                bottom: 15,
                left: 10,
              }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#f1f5f9" vertical={false} strokeDasharray="3 3"/>
              <XAxis
                dataKey="label"
                scale="band"
                tick={{ fontSize: 13, fill: "#0f172a", fontWeight: 850 }}
                axisLine={{ stroke: "#cbd5e1", strokeWidth: 1.5 }}
                tickLine={false}
                dy={6}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12, fill: "#0f172a", fontWeight: 800 }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={false}
                tickMargin={6}
                tickFormatter={(value) => value.toFixed(2)}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: "#0f172a", fontWeight: 800 }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={false}
                tickMargin={6}
                tickFormatter={(value) => `${value.toFixed(0)}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                  backdropFilter: "blur(4px)"
                }}
                cursor={{ fill: "#f8fafc" }}
                formatter={(value: number, name: string) => {
                  if (name === "cumulativePercentage") return [`${value.toFixed(1)}%`, "Acumulado"];
                  return [value.toFixed(2), "Contribuição"];
                }}
              />
              <Bar
                yAxisId="left"
                dataKey="value"
                barSize={32}
                fill="url(#colorValue)"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cumulativePercentage"
                stroke="#ea580c"
                strokeWidth={3}
                dot={{ r: 4.5, fill: "#fff", stroke: "#ea580c", strokeWidth: 2.5 }}
                activeDot={{ r: 6.5, fill: "#ea580c" }}
              />
            </ComposedChart>
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
                  <BarChart2 size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                    Análise Dinâmica de Pareto
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5 font-medium">
                    Composição acumulativa de riscos operacionais OTR (Criticidade Normalizada)
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
              <div className="flex-1 min-h-[300px] flex flex-col justify-center bg-slate-50/50 rounded-2xl border border-slate-150 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={data}
                    margin={{
                      top: 20,
                      right: 25,
                      bottom: 25,
                      left: 15,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorValueMaximized" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#1d4ed8" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#cbd5e1" strokeDasharray="3 3"/>
                    <XAxis
                      dataKey="label"
                      scale="band"
                      tick={{ fontSize: 14, fill: "#0f172a", fontWeight: 850 }}
                      axisLine={{ stroke: "#94a3b8", strokeWidth: 2 }}
                      tickLine={true}
                      dy={8}
                    />
                    <YAxis
                      yAxisId="left"
                      tick={{ fontSize: 13, fill: "#0f172a", fontWeight: 800 }}
                      axisLine={{ stroke: "#94a3b8", strokeWidth: 1.5 }}
                      tickLine={true}
                      tickMargin={8}
                      tickFormatter={(value) => value.toFixed(2)}
                      label={{ value: 'Criticidade Individual', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12, fontWeight: 800, fill: '#1e293b' }, offset: -4 }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 13, fill: "#0f172a", fontWeight: 800 }}
                      axisLine={{ stroke: "#94a3b8", strokeWidth: 1.5 }}
                      tickLine={true}
                      tickMargin={8}
                      tickFormatter={(value) => `${value.toFixed(0)}%`}
                      label={{ value: 'Percentual Acumulado (%)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fontSize: 12, fontWeight: 800, fill: '#1e293b' }, offset: 4 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.98)",
                        border: "2px solid #cbd5e1",
                        borderRadius: "12px",
                        fontSize: "13px",
                        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                        backdropFilter: "blur(4px)"
                      }}
                      cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
                      formatter={(value: number, name: string) => {
                        if (name === "cumulativePercentage") return [`${value.toFixed(2)}%`, "Acumulado"];
                        return [value.toFixed(3), "Contribuição"];
                      }}
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="value"
                      barSize={55}
                      fill="url(#colorValueMaximized)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cumulativePercentage"
                      stroke="#ea580c"
                      strokeWidth={4}
                      dot={{ r: 6.5, fill: "#fff", stroke: "#ea580c", strokeWidth: 3 }}
                      activeDot={{ r: 8.5, fill: "#ea580c" }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Data and details side */}
              <div className="w-full md:w-80 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200/80 pt-4 md:pt-0 md:pl-6 overflow-y-auto">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-indigo-750 uppercase tracking-widest font-mono">
                    Tabela Detalhada (Pareto)
                  </h4>
                  <div className="overflow-hidden border border-slate-200 rounded-xl shadow-inner scrollbar-hide">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 font-bold text-slate-600 font-mono">
                          <th className="py-2 px-3">Fator</th>
                          <th className="py-2 px-3 text-right">Valor</th>
                          <th className="py-2 px-3 text-right">Acumulado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans font-bold text-slate-700">
                        {data.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2 px-3 text-slate-900 font-black">{item.label}</td>
                            <td className="py-2 px-3 text-right font-mono text-slate-800 bg-slate-50/50">{item.value.toFixed(2)}</td>
                            <td className="py-2 px-3 text-right font-mono text-amber-700">{item.cumulativePercentage.toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 bg-indigo-50 border border-indigo-250 rounded-xl text-indigo-950 text-xs space-y-1.5 shadow-xs">
                    <span className="font-extrabold block text-indigo-900">Dica de Mitigação:</span>
                    <p className="leading-relaxed font-bold text-slate-705">
                      Foque esforços na mitigação de <strong>{data[0]?.label}</strong> e <strong>{data[1]?.label}</strong>, os quais compõem <strong>{(data[1]?.cumulativePercentage || 80).toFixed(0)}%</strong> do impacto global nesta análise.
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 text-[10px] font-mono text-slate-400 font-bold flex items-center justify-between border-t border-slate-100 mt-4">
                  <span>AI PARETO COMPOSITION</span>
                  <span>FATOR GERAL OTR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
