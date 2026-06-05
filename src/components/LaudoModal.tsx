import React, { useState } from 'react';
import { FileText, Printer, Check, X, RefreshCw } from 'lucide-react';
import { IRPCalculation } from '../types';
import { MATERIALS, TRACKS } from '../utils/calculator';

interface LaudoModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculation: IRPCalculation;
  identificacao: string;
  pneuModelo: string;
  pneuPosicao: string;
  materialId: string;
  trackId: string;
  darkMode?: boolean;
}

export default function LaudoModal({
  isOpen,
  onClose,
  calculation,
  identificacao,
  pneuModelo,
  pneuPosicao,
  materialId,
  trackId,
  darkMode = false,
}: LaudoModalProps) {
  
  const [inspectorName, setInspectorName] = useState('Eng. Marcos S. Souza');
  const [observacoes, setObservacoes] = useState(
    'Fase de varredura prévia indica aumento no arraste de pedras na curva KM 1.5. Recomendada operação de motoniveladora com urgência.'
  );
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  if (!isOpen) return null;

  const currentMaterial = MATERIALS.find(m => m.id === materialId) || MATERIALS[0];
  const currentTrack = TRACKS.find(t => t.id === trackId) || TRACKS[0];

  // Helper status styling for final risk gauge
  const getRiskLabelStyle = (risk: string) => {
    switch (risk) {
      case 'Risco Crítico':
        return { 
          badge: 'bg-red-100 text-red-800 border-red-300',
        };
      case 'Alto Risco':
        return { 
          badge: 'bg-orange-100 text-orange-850 border-orange-300',
        };
      case 'Risco Moderado':
        return { 
          badge: 'bg-amber-100 text-amber-900 border-amber-350',
        };
      default:
        return { 
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        };
    }
  };

  const riskStyle = getRiskLabelStyle(calculation.classificacao);

  // Simulated PDF exporter
  const handleSimulatePrint = () => {
    setIsExporting(true);
    setExportSuccess(false);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
      window.print(); // open native system clean print dialogue
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-[#0f172a]/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 font-sans select-none animate-fadeIn">
        {/* Modal Card container */}
      <div className={`border-2 rounded-xl shadow-2xl max-w-3xl w-full flex flex-col h-[90vh] md:h-[80vh] overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-350'
      }`}>
        
        {/* Header toolbar */}
        <div className={`p-4 flex justify-between items-center shrink-0 border-b-2 ${
          darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
        }`}>
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[#2563eb]" />
            <span className={`font-black text-sm uppercase tracking-wider ${
              darkMode ? 'text-slate-250' : 'text-slate-900'
            }`}>
              Emissor de Laudo Técnico Industrial
            </span>
          </div>
          <button 
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-850 hover:bg-slate-200'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal body (Printable area + user form) */}
        <div className={`flex-1 overflow-y-auto p-5 space-y-4 transition-colors ${
          darkMode ? 'bg-slate-950/80' : 'bg-slate-100'
        }`}>
          
          {/* Form Inspector Configuration */}
          <div className={`border-2 rounded-xl p-4 space-y-3.5 shadow-sm transition-colors ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-250'
          }`}>
            <h4 className={`text-xs font-black uppercase tracking-widest leading-none ${
              darkMode ? 'text-slate-400' : 'text-slate-650'
            }`}>Configuração do Emissor</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={`text-xs font-black uppercase tracking-wider ${
                  darkMode ? 'text-slate-450' : 'text-slate-500'
                }`}>Nome do Inspetor</label>
                <input
                  type="text"
                  value={inspectorName}
                  onChange={(e) => setInspectorName(e.target.value)}
                  className={`border-2 rounded px-3 py-2 text-sm outline-none focus:ring-1 font-black transition-all ${
                    darkMode 
                      ? 'bg-slate-950 border-slate-750 text-slate-100 focus:ring-slate-600 focus:bg-slate-950' 
                      : 'bg-white border-slate-305 text-slate-900 focus:ring-slate-500 focus:bg-white'
                  }`}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={`text-xs font-black uppercase tracking-wider ${
                  darkMode ? 'text-slate-450' : 'text-slate-500'
                }`}>Observações Operacionais</label>
                <input
                  type="text"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className={`border-2 rounded px-3 py-2 text-sm outline-none focus:ring-1 font-bold transition-all ${
                    darkMode 
                      ? 'bg-slate-950 border-slate-750 text-slate-105 focus:ring-slate-600 focus:bg-slate-950' 
                      : 'bg-white border-slate-305 text-slate-900 focus:ring-slate-500 focus:bg-white'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* DOCUMENT INSPETOR PREVIEW */}
          <div className="border-2 border-slate-300 rounded-lg bg-white p-8 relative tracking-normal text-slate-800 leading-relaxed max-w-[21cm] mx-auto shadow-sm" id="laudo-print-document">
            
            {/* Soft decorative badge */}
            <div className="absolute top-7 right-7 border-2 border-slate-400/50 text-slate-800 bg-slate-100 rounded-lg px-3 py-1 text-[11px] font-mono font-black leading-none select-none uppercase tracking-wider scale-95">
              SISTEMA COI IRP-OTR • VALE S11D
            </div>

            {/* Document Title header */}
            <div className="text-center border-b-2 border-slate-300 pb-4 mb-5">
              <h2 className="text-xl font-black tracking-tight uppercase text-slate-900 font-sans">LAUDO TÉCNICO DE INTEGRIDADE OTR</h2>
              <p className="text-xs text-slate-500 font-sans tracking-widest mt-1 uppercase font-black">Relatório de Risco Dinâmico de Pneus de Carga e haul road</p>
            </div>

            {/* General parameters table */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs pb-4 border-b-2 border-slate-250">
              <div className="flex flex-col">
                <span className="text-slate-500 font-black uppercase tracking-widest text-[11px]">Equipamento</span>
                <span className="font-black text-slate-950 uppercase text-base">{identificacao}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 font-black uppercase tracking-widest text-[11px]">Modelo do Pneu</span>
                <span className="font-black text-slate-950 text-base">{pneuModelo}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 font-black uppercase tracking-widest text-[11px]">Posição Monitorada</span>
                <span className="font-mono font-black text-slate-950 text-base">{pneuPosicao}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 font-black uppercase tracking-widest text-[11px]">Data de Emissão</span>
                <span className="font-mono text-slate-800 font-black text-sm">2026-06-04 18:15 UTC</span>
              </div>
            </div>

            {/* Variables and results summary */}
            <div className="py-4 space-y-4 border-b-2 border-slate-250 text-xs">
              <h3 className="font-black uppercase tracking-wider text-slate-500 text-[11px]">Análise Matemática dos Índices</h3>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 font-mono text-base">
                <div className="flex justify-between border-b pb-1.5 border-dashed border-slate-300">
                  <span className="font-sans text-slate-650 font-bold">Estresse Térmico TKPH:</span>
                  <span className="font-black text-slate-950">{calculation.tkph.toFixed(2)} ({calculation.tkphNorm.toFixed(2)})</span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-dashed border-slate-300">
                  <span className="font-sans text-slate-650 font-bold">Severidade da Via (SG):</span>
                  <span className="font-black text-slate-950">{calculation.sg.toFixed(2)} ({calculation.sgNorm.toFixed(2)})</span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-dashed border-slate-300">
                  <span className="font-sans text-slate-650 font-bold">Cortes e Perfurações (CP):</span>
                  <span className="font-black text-slate-950">{calculation.cp.toFixed(2)} ({calculation.cpNorm.toFixed(2)})</span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-dashed border-slate-300">
                  <span className="font-sans text-slate-650 font-bold">Impactos e Separações (IE):</span>
                  <span className="font-black text-slate-950">{calculation.ie.toFixed(2)} ({calculation.ieNorm.toFixed(2)})</span>
                </div>
              </div>

              <div className="p-4 bg-slate-100 border-2 border-slate-300 rounded-lg grid grid-cols-3 gap-3 items-center">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">ÍNDICE IRP TOTAL</span>
                  <span className="text-3xl font-black font-mono tracking-tight text-blue-950">{calculation.total.toFixed(2)}</span>
                </div>
                <div className="flex flex-col col-span-2 border-l-2 border-slate-250 pl-4">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">DIAGNÓSTICO FINAL DE RISCO</span>
                  <span className={`text-base font-black uppercase tracking-wide px-3 py-1 rounded border-2 inline-block mt-0.5 max-w-max ${riskStyle.badge}`}>{calculation.classificacao}</span>
                </div>
              </div>
            </div>

            {/* Dynamic Diagnostics text */}
            <div className="py-4 text-xs space-y-2.5 border-b-2 border-slate-250">
              <h3 className="font-black uppercase tracking-wider text-slate-500 text-[11px]">Parecer Técnico da Engenharia</h3>
              <p className="text-slate-800 leading-relaxed text-justify text-base font-medium">
                Com base nos pesos calculados pelo algoritmo IRP-OTR sob supervisão da central COI do Complexo S11D Carajás,
                o pneu de posição <span className="font-black">{pneuPosicao}</span> do ativo <span className="font-black">{identificacao}</span> aponta classificação de <span className="font-black text-red-900">{calculation.classificacao}</span>.
                O material preponderante selecionado (<span className="font-extrabold">{currentMaterial.label}</span>) impõe severidade abrasiva de <span className="font-extrabold">{currentMaterial.abrasividade.toFixed(2)} / 10</span>.
                Fica estipulado que as velocidades médias superiores a 15 km/h sob carga total podem agravar o cenário de superaquecimento e delaminação das cintas.
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-lg mt-1 text-sm">
                <span className="font-black text-amber-900 uppercase tracking-wider text-[11px]">Nota de Observação do Inspetor:</span>
                <p className="text-amber-950 font-bold italic mt-0.5">{observacoes || 'Nenhuma ressalva inserida.'}</p>
              </div>
            </div>

            {/* Inspector signatures space */}
            <div className="pt-8 flex justify-between items-center text-xs text-[#475569]">
              <div className="flex flex-col items-center w-52">
                <div className="h-[2px] w-full bg-slate-350 mb-1" />
                <span className="font-bold">Assinatura Digital Operacional</span>
                <span className="font-black text-[10px] text-slate-450 uppercase mt-0.5">SHA256: 0a67ea2f39b...</span>
              </div>
              
              <div className="flex flex-col items-center w-52">
                <div className="h-[2px] w-full bg-slate-800 mb-1" />
                <span className="font-black text-slate-900">{inspectorName}</span>
                <span className="text-[10px] uppercase font-black text-slate-500 font-sans">Registro Técnico CREA COI</span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer actions */}
        <div className={`p-4 flex justify-between items-center shrink-0 border-t-2 ${
          darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
        }`}>
          <span className="text-xs text-slate-600 font-mono font-black">ISO 9001 • Formatado para impressão A4</span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className={`px-5 py-2.5 rounded-xl font-black text-sm cursor-pointer border-2 transition-colors ${
                darkMode 
                  ? 'bg-slate-900 hover:bg-slate-800 border-slate-755 text-slate-100' 
                  : 'bg-white hover:bg-slate-200 border-slate-300 text-slate-800'
              }`}
            >
              Cancelar
            </button>
            <button
              onClick={handleSimulatePrint}
              disabled={isExporting}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-1.5 shadow-sm transition-all border-2 border-[#1d4ed8] cursor-pointer disabled:opacity-55"
            >
              {isExporting ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Gerando Documento...
                </>
              ) : exportSuccess ? (
                <>
                  <Check size={14} className="text-white" />
                  Laudo Emitido!
                </>
              ) : (
                <>
                  <Printer size={14} className="text-white" />
                  Imprimir / Salvar PDF
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
