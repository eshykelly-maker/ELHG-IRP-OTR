import { Calculator, ChevronRight } from "lucide-react";
import { RiskLevel } from "../App";
import DiagnosticoPneus from "./DiagnosticoPneus";

export default function RightPanel({
  selectedRisk,
  width,
  onCollapse,
}: {
  selectedRisk: RiskLevel;
  width?: number;
  onCollapse?: () => void;
}) {
  let riskData = {
    badge: "Alto Risco Via",
    badgeClass: "bg-orange-150 text-orange-950 border-orange-400 font-extrabold",
    abrasividade: "7.0",
    riscoEstimado: "Cortes & Laceração",
    riscoEstimadoClass: "text-orange-750 font-black",
    resultado: "0.67",
    resultadoLabel: "Alta",
    resultadoWrapper: "bg-orange-50 border-orange-350 shadow-[inset_0_0_12px_rgba(249,115,22,0.05)]",
    rows: [
      { label: "TKPH", bruto: "800.0", norm: "0.80", peso: "25%", parc: "0.20" },
      { label: "Sev. Geo (SG)", bruto: "7.0", norm: "0.70", peso: "20%", parc: "0.14" },
      { label: "Cortes (CP)", bruto: "6.5", norm: "0.65", peso: "20%", parc: "0.13" },
      { label: "Impactos (IE)", bruto: "7.5", norm: "0.75", peso: "20%", parc: "0.15" },
      { label: "Aquec. (SA)", bruto: "4.0", norm: "0.40", peso: "10%", parc: "0.04" },
      { label: "Patinagem (PA)", bruto: "20.0", norm: "0.20", peso: "5%", parc: "0.01" }
    ],
    highlightRow: "alta"
  };

  if (selectedRisk === "medio") {
    riskData = {
      badge: "Risco Moderado",
      badgeClass: "bg-yellow-150 text-yellow-950 border-yellow-400 font-extrabold",
      abrasividade: "4.5",
      riscoEstimado: "Desgaste Acelerado",
      riscoEstimadoClass: "text-yellow-750 font-black",
      resultado: "0.41",
      resultadoLabel: "Moderada",
      resultadoWrapper: "bg-yellow-50 border-yellow-350 shadow-[inset_0_0_12px_rgba(234,179,8,0.05)]",
      rows: [
        { label: "TKPH", bruto: "550.0", norm: "0.55", peso: "25%", parc: "0.14" },
        { label: "Sev. Geo (SG)", bruto: "4.5", norm: "0.45", peso: "20%", parc: "0.09" },
        { label: "Cortes (CP)", bruto: "3.0", norm: "0.30", peso: "20%", parc: "0.06" },
        { label: "Impactos (IE)", bruto: "3.5", norm: "0.35", peso: "20%", parc: "0.07" },
        { label: "Aquec. (SA)", bruto: "3.5", norm: "0.35", peso: "10%", parc: "0.04" },
        { label: "Patinagem (PA)", bruto: "2.5", norm: "0.25", peso: "5%", parc: "0.01" }
      ],
      highlightRow: "moderada"
    };
  } else if (selectedRisk === "baixo") {
    riskData = {
      badge: "Baixo Risco",
      badgeClass: "bg-emerald-150 text-emerald-950 border-emerald-400 font-extrabold",
      abrasividade: "2.0",
      riscoEstimado: "Operação Normal",
      riscoEstimadoClass: "text-emerald-750 font-black",
      resultado: "0.21",
      resultadoLabel: "Baixa",
      resultadoWrapper: "bg-emerald-50 border-emerald-350 shadow-[inset_0_0_12px_rgba(16,185,129,0.05)]",
      rows: [
        { label: "TKPH", bruto: "350.0", norm: "0.35", peso: "25%", parc: "0.09" },
        { label: "Sev. Geo (SG)", bruto: "2.0", norm: "0.20", peso: "20%", parc: "0.04" },
        { label: "Cortes (CP)", bruto: "1.5", norm: "0.15", peso: "20%", parc: "0.03" },
        { label: "Impactos (IE)", bruto: "1.5", norm: "0.15", peso: "20%", parc: "0.03" },
        { label: "Aquec. (SA)", bruto: "2.0", norm: "0.20", peso: "10%", parc: "0.02" },
        { label: "Patinagem (PA)", bruto: "1.0", norm: "0.10", peso: "5%", parc: "0.00" }
      ],
      highlightRow: "baixa"
    };
  }

  return (
    <aside 
      style={{ width: width ? `${width}px` : "490px" }}
      className="shrink-0 bg-slate-50 border-l border-slate-300 flex flex-col h-full overflow-y-auto z-10 font-sans"
    >
      {/* HEADER SECTION */}
      <div className="p-6 border-b border-slate-200 bg-white">
        <DiagnosticoPneus selectedRisk={selectedRisk || "baixo"} />
        
        <div className="flex justify-between items-center mb-6 mt-3">
          <div className="flex items-center gap-1.5">
            {onCollapse && (
              <button
                onClick={onCollapse}
                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors shrink-0 mr-1"
                title="Minimizar Coluna"
              >
                <ChevronRight size={16} />
              </button>
            )}
            <h2 className="text-base font-black uppercase tracking-tight text-slate-800">
              Setor de Operação
            </h2>
          </div>
          <span className={`text-xs uppercase tracking-wide px-3 py-1.5 rounded-lg border-2 ${riskData.badgeClass}`}>
            {riskData.badge}
          </span>
        </div>

        {/* Operational characteristics board */}
        <div className="space-y-3.5 bg-slate-100 p-4 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center border-b border-slate-200/60 pb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 font-mono">Pista Monitorada</span>
            <span className="text-sm font-black text-slate-900">
              S11D - Rampa Sul
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200/60 pb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 font-mono">Material Predominante</span>
            <span className="text-sm font-black text-slate-900 font-display">
              Hematita Compacta
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200/60 pb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 font-mono">Abrasividade Local</span>
            <span className="text-sm font-black text-orange-950 font-mono bg-orange-100/90 px-3 py-1 rounded-lg border border-orange-355">
              {riskData.abrasividade} <span className="text-orange-700/80 text-xs font-black">/ 10</span>
            </span>
          </div>
          <div className="flex justify-between items-center pt-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 font-mono">Risco Estimado</span>
            <span className={`text-sm font-black uppercase tracking-wider ${riskData.riscoEstimadoClass}`}>
              {riskData.riscoEstimado}
            </span>
          </div>
        </div>
      </div>

      {/* COMPUTATIONAL DETAILS */}
      <div className="p-6 flex-1">
        <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-xs relative">
          <div className="p-4 border-b border-slate-200 bg-slate-100 flex items-center gap-2.5">
            <Calculator size={26} className="text-indigo-600 stroke-[2.5]" />
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest block font-mono">
              MATRIZ DE CÁLCULO IRP-OTR
            </span>
          </div>
          <div className="p-5">
            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50/50">
                  <th className="text-xs font-black text-slate-700 uppercase tracking-wider py-2.5 px-2">Variável</th>
                  <th className="text-xs font-black text-slate-700 uppercase tracking-wider py-2.5 px-2 text-right">Bruto</th>
                  <th className="text-xs font-black text-slate-700 uppercase tracking-wider py-2.5 px-2 text-right">Norm.</th>
                  <th className="text-xs font-black text-slate-700 uppercase tracking-wider py-2.5 px-2 text-right">Peso</th>
                  <th className="text-xs font-black text-indigo-700 uppercase tracking-wider py-2.5 px-2 text-right">Parc.</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {riskData.rows.map((row, idx) => (
                  <TableRow
                    key={idx}
                    label={row.label}
                    bruto={row.bruto}
                    norm={row.norm}
                    peso={row.peso}
                    parc={row.parc}
                  />
                ))}
              </tbody>
            </table>

            {/* RESULTS OUTCOME PILLET */}
            <div className={`border-2 rounded-xl p-5 text-center ${riskData.resultadoWrapper}`}>
              <div className="text-xs font-black text-slate-800 uppercase tracking-widest mb-2 font-mono">
                Resultado IRP-OTR
              </div>
              <div className="text-[52px] font-black text-slate-950 font-mono tracking-tight leading-none mb-3">
                {riskData.resultado}
              </div>
              <div className="text-xs font-black text-slate-900 uppercase tracking-widest bg-white border border-slate-350 inline-block px-4 py-2 rounded-lg shadow-2xs">
                CLASSE: {riskData.resultadoLabel.toUpperCase()}
              </div>
            </div>

            {/* HIGH-ZOOM OPTIMIZED RANGE TABLE */}
            <div className="mt-6 pt-5 border-t-2 border-slate-100">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 font-mono">
                MATRIZ DE GRAVIDADE
              </h3>
              <div className="overflow-hidden rounded-xl border-2 border-slate-300 shadow-xs">
                <table className="w-full text-left border-collapse bg-white">
                  <thead>
                    <tr className="border-b-2 border-slate-300 bg-slate-100 text-sm font-black text-slate-900">
                      <th className="p-3.5 border-r border-slate-250">Risco</th>
                      <th className="p-3.5 border-r border-slate-250 text-center">Intervalo</th>
                      <th className="p-3.5">Ação Requerida</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-bold text-slate-800">
                    <tr className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${riskData.highlightRow === 'baixa' ? 'bg-emerald-100/90 text-emerald-950 border-l-4 border-l-emerald-600 font-extrabold shadow-xs' : 'text-slate-800'}`}>
                      <td className="p-3.5 font-black border-r border-slate-250 uppercase tracking-wider">Baixa</td>
                      <td className="p-3.5 font-mono border-r border-slate-250 text-center font-extrabold text-slate-950">0.00 - 0.25</td>
                      <td className="p-3.5 text-slate-900">Operação Estável</td>
                    </tr>
                    <tr className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${riskData.highlightRow === 'moderada' ? 'bg-yellow-100 text-yellow-950 border-l-4 border-l-amber-500 font-extrabold shadow-xs' : 'text-slate-800'}`}>
                      <td className="p-3.5 font-black border-r border-slate-250 uppercase tracking-wider">Moderada</td>
                      <td className="p-3.5 font-mono border-r border-slate-250 text-center font-extrabold text-slate-950">0.26 - 0.50</td>
                      <td className="p-3.5 text-slate-950">Monitoramento Operacional</td>
                    </tr>
                    <tr className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${riskData.highlightRow === 'alta' ? 'bg-orange-100 text-orange-950 border-l-4 border-l-orange-500 font-extrabold shadow-xs' : 'text-slate-800'}`}>
                      <td className="p-3.5 font-black border-r border-slate-250 uppercase tracking-wider">Alta</td>
                      <td className="p-3.5 font-mono border-r border-slate-250 text-center font-extrabold text-slate-950">0.51 - 0.75</td>
                      <td className="p-3.5 text-slate-950">Manutenção & Ajuste Corretivo</td>
                    </tr>
                    <tr className={`hover:bg-slate-50 transition-colors ${riskData.highlightRow === 'critica' ? 'bg-red-105 text-red-950 border-l-4 border-l-red-650 font-extrabold shadow-xs' : 'text-slate-800'}`}>
                      <td className="p-3.5 font-black border-r border-slate-250 uppercase tracking-wider">Crítica</td>
                      <td className="p-3.5 font-mono border-r border-slate-250 text-center font-extrabold text-red-950">0.76 - 1.00</td>
                      <td className="p-3.5 font-extrabold text-rose-950">Parada Provisória OTR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TableRow({
  label,
  bruto,
  norm,
  peso,
  parc,
}: {
  label: string;
  bruto: string;
  norm: string;
  peso: string;
  parc: string;
  key?: any;
}) {
  return (
    <tr className="border-b-2 border-slate-200 last:border-0 hover:bg-slate-50 transition-colors group">
      <td className="py-2.5 px-2 text-xs font-black text-slate-800 uppercase tracking-wide truncate max-w-[120px]" title={label}>{label}</td>
      <td className="py-2.5 px-2 text-right font-mono text-sm font-black text-slate-950 bg-slate-50/55 group-hover:bg-slate-100/50 transition-colors">{bruto}</td>
      <td className="py-2.5 px-2 text-right font-mono text-xs font-bold text-slate-700">{norm}</td>
      <td className="py-2.5 px-2 text-right font-mono text-xs font-bold text-slate-800 bg-slate-50/55 group-hover:bg-slate-100/50 transition-colors">{peso}</td>
      <td className="py-2.5 px-2 text-right font-mono text-sm font-black text-indigo-700 bg-indigo-50/70 group-hover:bg-indigo-55 transition-colors">
        {parc}
      </td>
    </tr>
  );
}
