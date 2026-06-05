import React, { useState, useMemo } from "react";
import { Truck, Clock, FileText, Calculator, Info, ChevronLeft, ChevronRight } from "lucide-react";
import ParetoChart from "./ParetoChart";
import RadarRiskChart from "./RadarRiskChart";
import ActionPanel from "./ActionPanel";
import RiskMatrix from "./RiskMatrix";
import DiagnosticoPneus from "./DiagnosticoPneus";

export default function SimulationArea({
  widthLeft,
  widthRight,
  onResizeLeft,
  onResizeRight,
  onResetLeft,
  onResetRight,
  leftCollapsed,
  setLeftCollapsed,
  rightCollapsed,
  setRightCollapsed,
}: {
  widthLeft?: number;
  widthRight?: number;
  onResizeLeft?: (e: React.MouseEvent) => void;
  onResizeRight?: (e: React.MouseEvent) => void;
  onResetLeft?: () => void;
  onResetRight?: () => void;
  leftCollapsed: boolean;
  setLeftCollapsed: (collapsed: boolean) => void;
  rightCollapsed: boolean;
  setRightCollapsed: (collapsed: boolean) => void;
}) {
  const [carga, setCarga] = useState(55);
  const [velocidade, setVelocidade] = useState(14.5);
  const [sg, setSg] = useState(7.0);
  const [cp, setCp] = useState(6.0);
  const [ie, setIe] = useState(5.5);
  const [sa, setSa] = useState(4.0);
  const [pa, setPa] = useState(3.0);

  const tkph = Math.round(carga * velocidade * 10) / 10;
  
  const irpData = useMemo(() => {
    const tkph_n = Math.min(tkph / 960, 1);
    const sg_n = sg / 10;
    const cp_n = cp / 10;
    const ie_n = ie / 10;
    const sa_n = sa / 10;
    const pa_n = pa / 10;

    const parcTkph = tkph_n * 0.25;
    const parcSg = sg_n * 0.20;
    const parcCp = cp_n * 0.20;
    const parcIe = ie_n * 0.20;
    const parcSa = sa_n * 0.10;
    const parcPa = pa_n * 0.05;

    const total = parcTkph + parcSg + parcCp + parcIe + parcSa + parcPa;

    let classification: "baixo" | "medio" | "alto" | "critico" = "baixo";
    if (total > 0.75) classification = "critico";
    else if (total > 0.50) classification = "alto";
    else if (total > 0.25) classification = "medio";
    else classification = "baixo";

    return {
      total: total.toFixed(2),
      classification,
      rows: [
        { label: "TKPH", bruto: tkph.toFixed(1), norm: tkph_n.toFixed(2), peso: "25%", parc: parcTkph.toFixed(2) },
        { label: "Sev. Geo (SG)", bruto: sg.toFixed(1), norm: sg_n.toFixed(2), peso: "20%", parc: parcSg.toFixed(2) },
        { label: "Cortes (CP)", bruto: cp.toFixed(1), norm: cp_n.toFixed(2), peso: "20%", parc: parcCp.toFixed(2) },
        { label: "Impactos (IE)", bruto: ie.toFixed(1), norm: ie_n.toFixed(2), peso: "20%", parc: parcIe.toFixed(2) },
        { label: "Aquec. (SA)", bruto: sa.toFixed(1), norm: sa_n.toFixed(2), peso: "10%", parc: parcSa.toFixed(2) },
        { label: "Patinagem (PA)", bruto: pa.toFixed(1), norm: pa_n.toFixed(2), peso: "5%", parc: parcPa.toFixed(2) }
      ]
    };
  }, [tkph, sg, cp, ie, sa, pa]);

  const mapRisk = (classification: string): "baixo" | "medio" | "alto" => {
    if (classification === "critico") return "alto";
    return classification as "baixo" | "medio" | "alto";
  };
  const chartsRisk = mapRisk(irpData.classification);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-100">
      <CustomHeader score={irpData.total} risk={irpData.classification} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL */}
        {leftCollapsed ? (
          <div 
            onClick={() => setLeftCollapsed(false)}
            className="w-10 bg-white border-r border-slate-300 flex flex-col items-center py-4 cursor-pointer hover:bg-slate-50 transition-colors shrink-0 h-full relative z-30 animate-in slide-in-from-left duration-200"
            title="Expandir Simulador de Variáveis"
          >
            <div className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg mb-4 cursor-pointer">
              <ChevronRight size={14} />
            </div>
            <div 
              className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap mt-4 select-none"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              SIMULADOR DE VARIÁVEIS
            </div>
          </div>
        ) : (
          <aside
            style={{ width: widthLeft ? `${widthLeft}px` : "300px" }}
            className="shrink-0 bg-white border-r border-slate-300 flex flex-col h-full overflow-y-auto font-sans"
          >
            <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-2 text-slate-800 bg-slate-150 font-sans">
              <div className="flex items-center gap-2">
                <Truck size={20} className="text-indigo-600 stroke-[2.5]" />
                <h2 className="text-sm font-black uppercase tracking-wider">
                  Simulador de Variáveis
                </h2>
              </div>
              <button
                onClick={() => setLeftCollapsed(true)}
                className="p-1 text-slate-400 hover:text-indigo-650 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors shrink-0"
                title="Minimizar Coluna"
              >
                <ChevronLeft size={16} />
              </button>
            </div>

            <div className="p-5 space-y-5 border-b border-slate-200 bg-slate-50/50">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider font-mono">
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
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider font-mono">
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
                <NumberSliderControl 
                  title="Carga" unit="ton" val={carga} setVal={setCarga} min={40} max={80} step={1}
                />
                <NumberSliderControl 
                  title="Velocidade" unit="km/h" val={velocidade} setVal={setVelocidade} min={5} max={30} step={0.5}
                />
              </div>
            </div>

            <div className="p-5 bg-indigo-50 border-b-2 border-indigo-200 text-center">
              <div className="text-xs font-black text-indigo-950 uppercase tracking-wider mb-1 font-mono">TKPH SIMULADO</div>
              <div className="text-4xl font-black text-indigo-700 font-mono mb-1 tracking-tight">
                {tkph}
              </div>
              <div className="text-[11px] font-bold text-indigo-600 font-mono uppercase bg-white/70 border border-indigo-200 inline-block px-3 py-1 rounded-md">
                Limite teórico OTR: 960 TKPH
              </div>
            </div>

            <div className="p-5 flex-1 space-y-6">
              <SliderControl title="Severidade Geotécnica (SG)" val={sg} setVal={setSg} desc="Fragmentação, umidade e irregularidades." />
              <SliderControl title="Cortes e Perfurações (CP)" val={cp} setVal={setCp} desc="Incidência de fragmentos rochosos." />
              <SliderControl title="Impactos e Separação (IE)" val={ie} setVal={setIe} desc="Deformações por choques dinâmicos." />
              <SliderControl title="Superaquecimento (SA)" val={sa} setVal={setSa} desc="Fator térmico complementar." />
              <SliderControl title="Patinagem (PA)" val={pa} setVal={setPa} desc="Perda de aderência por umidade/torque." />
            </div>
          </aside>
        )}

        {/* Left Resizer bar */}
        {!leftCollapsed && onResizeLeft && (
          <div
            onMouseDown={onResizeLeft}
            onDoubleClick={onResetLeft}
            className="w-1.5 hover:w-2 active:w-2 bg-slate-200/60 hover:bg-indigo-300 active:bg-indigo-500 cursor-col-resize transition-all duration-150 relative z-40 shrink-0 self-stretch flex items-center justify-center font-sans select-none group"
            title="Arraste para ajustar tamanho ou duplo clique para resetar"
          >
            <div className="w-0.5 h-10 bg-slate-400 group-hover:bg-indigo-600 rounded-full opacity-60"></div>
          </div>
        )}

        {/* CENTER AREA */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-slate-100 p-6 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 shrink-0 mt-2">
            <div className="xl:col-span-7">
              <ParetoChart selectedRisk={chartsRisk} />
            </div>
            <div className="xl:col-span-5">
              <RadarRiskChart 
                 selectedRisk={chartsRisk} 
                 dynamicData={{ cp, ie, st: sa, pt: pa, as: sg }}
              />
            </div>
            <div className="xl:col-span-12">
              <ActionPanel selectedRisk={chartsRisk} />
            </div>
          </div>
          
          <div className="mt-4">
             <RiskMatrix 
                highlightItems={[]} 
                showRpn={false}
                dynamicPositions={{
                  "ST": sa,
                  "IE": ie,
                  "CP": cp,
                  "PT": pa,
                  "AS": sg
                }}
             />
          </div>
        </main>

        {/* Right Resizer bar */}
        {!rightCollapsed && onResizeRight && (
          <div
            onMouseDown={onResizeRight}
            onDoubleClick={onResetRight}
            className="w-1.5 hover:w-2 active:w-2 bg-slate-200/60 hover:bg-indigo-300 active:bg-indigo-500 cursor-col-resize transition-all duration-150 relative z-40 shrink-0 self-stretch flex items-center justify-center font-sans select-none group"
            title="Arraste para ajustar tamanho ou duplo clique para resetar"
          >
            <div className="w-0.5 h-10 bg-slate-400 group-hover:bg-indigo-600 rounded-full opacity-60"></div>
          </div>
        )}
        
        {/* RIGHT PANEL */}
        {!rightCollapsed ? (
          <SimulationRightPanel 
            irpData={irpData} 
            sg={sg} 
            width={widthRight} 
            onCollapse={() => setRightCollapsed(true)} 
          />
        ) : (
          <div 
            onClick={() => setRightCollapsed(false)}
            className="w-10 bg-white border-l border-slate-300 flex flex-col items-center py-4 cursor-pointer hover:bg-slate-50 transition-colors shrink-0 h-full relative z-30 animate-in slide-in-from-right duration-200"
            title="Expandir Setor Simulador"
          >
            <div className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg mb-4 cursor-pointer">
              <ChevronLeft size={14} />
            </div>
            <div 
              className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap mt-4 select-none"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              SETOR SIMULADO & CÁLCULOS
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CustomHeader({ score, risk }: { score: string, risk: string }) {
  let label = "Alto Risco";
  let scoreColor = "text-orange-600";
  let labelColor = "text-orange-600";
  let statusDot = "bg-orange-500";
  
  if (risk === "medio") {
    label = "Risco Moderado";
    scoreColor = "text-yellow-600";
    labelColor = "text-yellow-600";
    statusDot = "bg-yellow-500";
  } else if (risk === "baixo") {
    label = "Baixo Risco";
    scoreColor = "text-emerald-600";
    labelColor = "text-emerald-600";
    statusDot = "bg-emerald-500";
  } else if (risk === "critico") {
    label = "RISCO CRÍTICO";
    scoreColor = "text-red-700";
    labelColor = "text-red-700 animate-pulse";
    statusDot = "bg-red-600";
  }

  return (
    <header className="h-16 flex items-center justify-between bg-white border-b border-slate-300 shadow-sm px-4 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${statusDot}`}></div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            IRP-OTR Simulação
          </h1>
          <div className="h-6 w-px bg-slate-300 mx-2"></div>
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-sm">
            Modo Interativo
          </span>
        </div>
      </div>

      <div className="flex h-full py-2 space-x-6">
        <div className="flex flex-col justify-center px-4 border-l border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase">
            Ativo Monitorado
          </span>
          <span className="text-sm font-bold text-slate-700">
            CAT 793 (OTR 40.00R57)
          </span>
        </div>
        <div className="flex flex-col justify-center px-4 border-l border-slate-200">
          <span className="text-xs font-bold text-indigo-400 uppercase">
            IRP-OTR Simulado
          </span>
          <span className={`text-lg font-bold ${scoreColor}`}>{score}</span>
        </div>
        <div className="flex flex-col justify-center px-4 border-l border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase">
            Classificação
          </span>
          <span className={`text-sm font-bold ${labelColor}`}>{label}</span>
        </div>
      </div>
    </header>
  );
}

function NumberSliderControl({ title, unit, val, setVal, min, max, step }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-slate-500 flex justify-between">
        <span>{title}</span>
        <span className="text-xs text-slate-400">{unit}</span>
      </label>
      <div className="flex items-center border border-slate-300 rounded-sm bg-white overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
        <input
          type="number"
          value={val}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) setVal(v);
          }}
          step={step}
          className="w-full px-2 py-1.5 text-base font-mono outline-none"
        />
        <div className="flex flex-col border-l border-slate-300">
          <button 
            onClick={() => setVal(Math.min(max, val + step))}
            className="px-1.5 py-0 border-b border-slate-300 bg-slate-50 hover:bg-slate-200 text-xs text-slate-600 transition-colors"
          >
            ▲
          </button>
          <button 
            onClick={() => setVal(Math.max(min, val - step))}
            className="px-1.5 py-0 bg-slate-50 hover:bg-slate-200 text-xs text-slate-600 transition-colors"
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
}

function SliderControl({ title, val, setVal, desc }: any) {
  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-slate-700">{title}</label>
        <span className="text-base font-mono font-bold text-indigo-600">{val.toFixed(1)}</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="10" 
        step="0.5" 
        value={val} 
        onChange={e => setVal(parseFloat(e.target.value))}
        className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
      />
      <p className="text-xs leading-tight text-slate-400 transition-colors">
        {desc}
      </p>
    </div>
  );
}

function SimulationRightPanel({ irpData, sg, width, onCollapse }: any) {
  let badge = "Alto Risco Via";
  let badgeClass = "bg-orange-150 text-orange-950 border-orange-400 font-extrabold";
  let riscoEstimado = "Desgaste Acelerado";
  let riscoEstimadoClass = "text-orange-700 font-bold";
  let resultadoLabel = "Alta";
  let resultadoWrapper = "bg-orange-50 border-orange-350 shadow-[inset_0_0_12px_rgba(249,115,22,0.05)]";
  let highlightRow = "alta";

  if (irpData.classification === "baixo") {
      badge = "Baixo Risco";
      badgeClass = "bg-emerald-150 text-emerald-950 border-emerald-400 font-extrabold";
      riscoEstimado = "Operação Normal";
      riscoEstimadoClass = "text-emerald-700 font-bold";
      resultadoLabel = "Baixa";
      resultadoWrapper = "bg-emerald-50 border-emerald-350 shadow-[inset_0_0_12px_rgba(16,185,129,0.05)]";
      highlightRow = "baixa";
  } else if (irpData.classification === "medio") {
      badge = "Risco Moderado";
      badgeClass = "bg-yellow-150 text-yellow-950 border-yellow-400 font-extrabold";
      riscoEstimado = "Desgaste Moderado";
      riscoEstimadoClass = "text-yellow-700 font-bold";
      resultadoLabel = "Moderada";
      resultadoWrapper = "bg-yellow-50 border-yellow-350 shadow-[inset_0_0_12px_rgba(234,179,8,0.05)]";
      highlightRow = "moderada";
  } else if (irpData.classification === "critico") {
      badge = "Risco Crítico Via";
      badgeClass = "bg-red-150 text-red-950 border-red-400 font-extrabold";
      riscoEstimado = "Falha Iminente";
      riscoEstimadoClass = "text-red-700 animate-pulse font-black";
      resultadoLabel = "Crítica";
      resultadoWrapper = "bg-red-50 border-red-450 shadow-[inset_0_0_12px_rgba(239,68,68,0.05)]";
      highlightRow = "critica";
  }

  return (
    <aside
      style={{ width: width ? `${width}px` : "490px" }}
      className="shrink-0 bg-slate-50 border-l border-slate-300 flex flex-col h-full overflow-y-auto z-10 font-sans"
    >
      <div className="p-6 border-b border-slate-200 bg-white">
        <DiagnosticoPneus selectedRisk={irpData.classification} />
        <div className="flex justify-between items-center mb-6 mt-3">
          <div className="flex items-center gap-1.5">
            {onCollapse && (
              <button
                onClick={onCollapse}
                className="p-1.5 text-slate-400 hover:text-indigo-650 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors shrink-0 mr-1"
                title="Minimizar Coluna"
              >
                <ChevronRight size={16} />
              </button>
            )}
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              Setor de Operação Simulada
            </h2>
          </div>
          <span className={`text-xs font-black uppercase px-3 py-1 rounded-lg border-2 ${badgeClass}`}>
            {badge}
          </span>
        </div>

        <div className="space-y-3 bg-slate-150 p-4 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Pista Simulada:</span>
            <span className="text-sm font-black text-slate-900 font-mono">
              Rotas Genéricas S11D
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Abrasividade Local:</span>
            <span className="text-sm font-black text-indigo-700 font-mono bg-indigo-100/80 px-2.5 py-0.5 rounded-lg border border-indigo-200/50">
              {sg.toFixed(1)}{" "}
              <span className="text-slate-500 font-extrabold text-xs">/ 10</span>
            </span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Risco Estimado:</span>
            <span className={`text-sm font-black uppercase tracking-wider ${riscoEstimadoClass}`}>
              {riscoEstimado}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1">
        <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 bg-slate-100/60 flex items-center gap-2.5">
            <Calculator size={26} className="text-indigo-600 stroke-[2.5]" />
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-widest block font-mono">
              Cálculo IRP-OTR (Tempo Real)
            </span>
          </div>
          <div className="p-5">
            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50">
                  <th className="text-xs font-extrabold text-slate-500 uppercase tracking-wider py-2.5 px-2">Variável</th>
                  <th className="text-xs font-extrabold text-slate-500 uppercase tracking-wider py-2.5 px-2 text-right">Bruto</th>
                  <th className="text-xs font-extrabold text-slate-500 uppercase tracking-wider py-2.5 px-2 text-right">Norm.</th>
                  <th className="text-xs font-extrabold text-slate-500 uppercase tracking-wider py-2.5 px-2 text-right">Peso</th>
                  <th className="text-xs font-black text-indigo-700 uppercase tracking-wider py-2.5 px-2 text-right">Parc.</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {irpData.rows.map((row: any, idx: number) => (
                  <tr key={idx} className="border-b-2 border-slate-200 last:border-0 hover:bg-slate-50 transition-colors group">
                    <td className="py-2.5 px-2 text-xs font-black text-slate-800 uppercase tracking-wide truncate max-w-[120px]" title={row.label}>{row.label}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-sm font-black text-slate-950 bg-slate-50/55 group-hover:bg-slate-100/50 transition-colors">{row.bruto}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-xs font-bold text-slate-700">{row.norm}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-xs font-bold text-slate-600 bg-slate-50/55 group-hover:bg-slate-100/50 transition-colors">{row.peso}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-sm font-black text-indigo-700 bg-indigo-50/70 group-hover:bg-indigo-50 transition-colors">{row.parc}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-0 border-t-2 border-slate-200 pt-5 mb-6">
              <div className={`rounded-xl border-2 ${resultadoWrapper} p-5 text-center flex flex-col items-center justify-center relative overflow-hidden transition-all shadow-xs`}>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  RESULTADO FINAL SIMULADO
                </div>
                <div className="text-5xl font-black text-slate-950 font-mono tracking-tight mb-2.5">
                  {irpData.total}
                </div>
                <div className={`text-sm font-black uppercase tracking-widest px-4 py-1.5 rounded-lg bg-white border border-slate-300 inline-flex items-center gap-1.5 ${riscoEstimadoClass}`}>
                  Nível {resultadoLabel}
                </div>
              </div>
            </div>

            <div className="border-t-2 border-slate-100">
              <div className="py-3 flex items-center min-w-0">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider font-mono">
                  Matriz de Classificação
                </h3>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse bg-white table-fixed border-2 border-slate-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs font-extrabold text-slate-600">
                      <th className="p-2.5 border-r border-slate-200 pl-4 w-1/3">Classif.</th>
                      <th className="p-2.5 border-r border-slate-200 text-center w-1/3">Intervalo</th>
                      <th className="p-2.5 pr-4 w-1/3">Interpretação</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-bold">
                    <tr className={`border-b border-slate-200 transition-colors ${highlightRow === 'baixa' ? 'bg-emerald-100 text-emerald-950' : 'text-slate-600'}`}>
                      <td className="p-2.5 border-r border-slate-100 pl-4">Baixa</td>
                      <td className="p-2.5 font-mono border-r border-slate-100 text-center">0.00-0.25</td>
                      <td className="p-2.5 pr-4 truncate">Condição estável</td>
                    </tr>
                    <tr className={`border-b border-slate-200 transition-colors ${highlightRow === 'moderada' ? 'bg-yellow-105 text-yellow-950' : 'text-slate-600'}`}>
                      <td className="p-2.5 border-r border-slate-100 pl-4">Moderada</td>
                      <td className="p-2.5 font-mono border-r border-slate-100 text-center">0.26-0.50</td>
                      <td className="p-2.5 pr-4 truncate">Desgaste controlado</td>
                    </tr>
                    <tr className={`border-b border-slate-200 transition-colors ${highlightRow === 'alta' ? 'bg-orange-100 text-orange-950' : 'text-slate-600'}`}>
                      <td className="p-2.5 border-r border-slate-100 pl-4">Alta</td>
                      <td className="p-2.5 font-mono border-r border-slate-100 text-center">0.51-0.75</td>
                      <td className="p-2.5 pr-4 truncate">Risco Relevante</td>
                    </tr>
                    <tr className={`transition-colors ${highlightRow === 'critica' ? 'bg-red-100 text-red-950 text-slate-800' : 'text-slate-600'}`}>
                      <td className="p-2.5 border-r border-slate-100 pl-4">Crítica</td>
                      <td className="p-2.5 font-mono border-r border-slate-100 text-center">0.76-1.00</td>
                      <td className="p-2.5 pr-4 truncate">Falha prematura</td>
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
