import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import CenterArea from "./components/CenterArea";

import FmeaArea from "./components/FmeaArea";
import SimulationArea from "./components/SimulationArea";

export type RiskLevel = "baixo" | "medio" | "alto" | null;
export type PageType = "dashboard" | "map_only" | "fmea" | "simulation";

export default function App() {
  const [isExtended, setIsExtended] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel>("alto");
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  
  // Settings states
  const [showSettings, setShowSettings] = useState(false);
  const [tkphThreshold, setTkphThreshold] = useState(960);
  const [refreshInterval, setRefreshInterval] = useState("5s");
  const [audioAlerts, setAudioAlerts] = useState(true);
  const [visualAlerts, setVisualAlerts] = useState(true);
  
  // Resize states
  const [isResizing, setIsResizing] = useState<"left" | "right" | null>(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartWidth, setDragStartWidth] = useState(0);

  // Custom columns widths configured by mouse interaction
  const [leftWidth, setLeftWidth] = useState(300);
  const [rightWidth, setRightWidth] = useState(490);

  // Column collapse states
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  // Mouse drag handler for the left column
  const startResizingLeft = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    setIsResizing("left");
    setDragStartX(mouseDownEvent.clientX);
    setDragStartWidth(leftWidth);
  };

  // Mouse drag handler for the right column
  const startResizingRight = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    setIsResizing("right");
    setDragStartX(mouseDownEvent.clientX);
    setDragStartWidth(rightWidth);
  };

  const resetResizingLeft = () => {
    setLeftWidth(300);
  };

  const resetResizingRight = () => {
    setRightWidth(490);
  };

  React.useEffect(() => {
    if (!isResizing) return;

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      const delta = e.clientX - dragStartX;
      if (isResizing === "left") {
        const nextWidth = dragStartWidth + delta;
        if (nextWidth >= 180 && nextWidth <= 600) {
          setLeftWidth(nextWidth);
        }
      } else if (isResizing === "right") {
        const nextWidth = dragStartWidth - delta;
        if (nextWidth >= 250 && nextWidth <= 750) {
          setRightWidth(nextWidth);
        }
      }
    };

    const handleMouseUpGlobal = () => {
      setIsResizing(null);
    };

    window.addEventListener("mousemove", handleMouseMoveGlobal);
    window.addEventListener("mouseup", handleMouseUpGlobal);
    window.addEventListener("mouseleave", handleMouseUpGlobal);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("mouseup", handleMouseUpGlobal);
      window.removeEventListener("mouseleave", handleMouseUpGlobal);
    };
  }, [isResizing, dragStartX, dragStartWidth]);

  return (
    <div className="h-screen w-screen flex flex-col font-sans overflow-hidden bg-slate-100 text-slate-800">
      
      {/* Global transparent drag handler overlay to prevent iframe issues */}
      {isResizing && (
        <div
          className="fixed inset-0 z-[9999] cursor-col-resize select-none bg-transparent"
        />
      )}

      {currentPage !== "simulation" && (
        <Header 
          selectedRisk={selectedRisk} 
        />
      )}
      <div className="flex-1 flex overflow-hidden select-none">
        {!isExtended && (
          <Sidebar 
            currentPage={currentPage} 
            onNavigate={setCurrentPage} 
            onOpenSettings={() => setShowSettings(true)}
          />
        )}
        
        <div className="flex-1 flex h-full overflow-hidden relative">
          <AnimatePresence mode="wait">
            {currentPage === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex-1 flex h-full overflow-hidden"
              >
                {!isExtended && leftCollapsed && (
                  <div 
                    onClick={() => setLeftCollapsed(false)}
                    className="w-10 bg-white border-r border-slate-300 flex flex-col items-center py-4 cursor-pointer hover:bg-slate-50 transition-colors shrink-0 h-full relative z-30 animate-in slide-in-from-left duration-200"
                    title="Expandir Ficha do Equipamento"
                  >
                    <div className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg mb-4 cursor-pointer">
                      <ChevronRight size={14} />
                    </div>
                    <div 
                      className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap mt-4 select-none"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      FICHA DO EQUIPAMENTO
                    </div>
                  </div>
                )}

                {!isExtended && !leftCollapsed && (
                  <LeftPanel 
                    selectedRisk={selectedRisk} 
                    width={leftWidth} 
                    onCollapse={() => setLeftCollapsed(true)} 
                  />
                )}
                
                {/* Left Resizer bar */}
                {!isExtended && !leftCollapsed && (
                  <div
                    onMouseDown={startResizingLeft}
                    onDoubleClick={resetResizingLeft}
                    className="w-1.5 hover:w-2 active:w-2 bg-slate-200/60 hover:bg-indigo-300 active:bg-indigo-500 cursor-col-resize transition-all duration-150 relative z-40 shrink-0 self-stretch flex items-center justify-center group"
                    title="Arraste para ajustar tamanho ou duplo clique para resetar"
                  >
                    <div className="w-0.5 h-10 bg-slate-400 group-hover:bg-indigo-600 rounded-full opacity-60"></div>
                  </div>
                )}

                <CenterArea
                  isExtended={isExtended}
                  onToggleExtend={() => setIsExtended(!isExtended)}
                  selectedRisk={selectedRisk}
                  onSelectRisk={setSelectedRisk}
                  isResizing={isResizing !== null}
                />

                {/* Right Resizer bar */}
                {!isExtended && !rightCollapsed && (
                  <div
                    onMouseDown={startResizingRight}
                    onDoubleClick={resetResizingRight}
                    className="w-1.5 hover:w-2 active:w-2 bg-slate-200/60 hover:bg-indigo-300 active:bg-indigo-500 cursor-col-resize transition-all duration-150 relative z-40 shrink-0 self-stretch flex items-center justify-center group"
                    title="Arraste para ajustar tamanho ou duplo clique para resetar"
                  >
                    <div className="w-0.5 h-10 bg-slate-400 group-hover:bg-indigo-600 rounded-full opacity-60"></div>
                  </div>
                )}

                {!isExtended && !rightCollapsed && (
                  <RightPanel 
                    selectedRisk={selectedRisk} 
                    width={rightWidth} 
                    onCollapse={() => setRightCollapsed(true)} 
                  />
                )}

                {!isExtended && rightCollapsed && (
                  <div 
                    onClick={() => setRightCollapsed(false)}
                    className="w-10 bg-white border-l border-slate-300 flex flex-col items-center py-4 cursor-pointer hover:bg-slate-50 transition-colors shrink-0 h-full relative z-30 animate-in slide-in-from-right duration-200"
                    title="Expandir Diagnóstico & Cálculos"
                  >
                    <div className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg mb-4 cursor-pointer">
                      <ChevronLeft size={14} />
                    </div>
                    <div 
                      className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap mt-4 select-none"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      DIAGNÓSTICO & CÁLCULOS
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {currentPage === "map_only" && (
              <motion.div
                key="map_only"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex-1 flex h-full overflow-hidden"
              >
                <CenterArea
                  isExtended={true}
                  onToggleExtend={() => {}} // Disabled in this mode
                  selectedRisk={selectedRisk}
                  onSelectRisk={setSelectedRisk}
                  mapOnly={true}
                />
              </motion.div>
            )}

            {currentPage === "fmea" && (
              <motion.div
                key="fmea"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex-1 flex h-full overflow-hidden"
              >
                <FmeaArea />
              </motion.div>
            )}

            {currentPage === "simulation" && (
              <motion.div
                key="simulation"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex-1 flex h-full overflow-hidden"
              >
                <SimulationArea
                  widthLeft={leftWidth}
                  widthRight={rightWidth}
                  onResizeLeft={startResizingLeft}
                  onResizeRight={startResizingRight}
                  onResetLeft={resetResizingLeft}
                  onResetRight={resetResizingRight}
                  leftCollapsed={leftCollapsed}
                  setLeftCollapsed={setLeftCollapsed}
                  rightCollapsed={rightCollapsed}
                  setRightCollapsed={setRightCollapsed}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Settings Modal Dialog Overlay */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[99999] flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white border border-slate-250 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative overflow-hidden animate-in zoom-in-95 duration-200 text-slate-800">
            
            {/* Ambient top highlight bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-100/80 text-indigo-700 rounded-lg">
                  <svg className="w-5 h-5 animate-spin-slow text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-black uppercase tracking-tight text-slate-900">Configurações do IRP - OTR</h2>
                  <p className="text-xs text-slate-400 font-bold font-mono">Painel de Parâmetros e Telemetria</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-slate-650 p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-xl font-bold leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* TKPH Threshold */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono">Limite de Alerta TKPH</label>
                  <span className="text-sm font-black font-mono text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">{tkphThreshold} TKPH</span>
                </div>
                <p className="text-[11px] text-slate-400">Limite de operação térmica admissível por pneu antes do disparo de alarmes de superaquecimento na frota.</p>
                <input 
                  type="range" 
                  min={500} 
                  max={1500} 
                  step={50}
                  value={tkphThreshold} 
                  onChange={(e) => setTkphThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono font-bold">
                  <span>500 TKPH</span>
                  <span>Estabilidade Térmica</span>
                  <span>1500 TKPH (Crit.)</span>
                </div>
              </div>

              {/* Refresh rate selection */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono block">Taxa de Amostragem do Sensor</label>
                <p className="text-[11px] text-slate-400">Tempo de telemetria entre requisições de pressão e temperatura externa.</p>
                <div className="grid grid-cols-4 gap-2">
                  {["2s", "5s", "10s", "Manual"].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setRefreshInterval(rate)}
                      className={`py-2 px-3 rounded-xl font-mono font-black text-xs border transition-all cursor-pointer ${
                        refreshInterval === rate 
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/15" 
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                    >
                      {rate}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3.5 border-t border-slate-100 pt-4">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono block">Notificações Customizadas</label>
                
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wide block">Alarmes Sonoros (Avisos de Risco)</span>
                    <span className="text-[10px] text-slate-400 block max-w-[340px]">Tocar sons suaves no painel quando novos alertas críticos forem detectados na via.</span>
                  </div>
                  <button
                    onClick={() => setAudioAlerts(!audioAlerts)}
                    className="w-11 h-6 rounded-full transition-colors relative cursor-pointer flex items-center shrink-0 bg-slate-200"
                    style={{ backgroundColor: audioAlerts ? '#4f46e5' : '#e2e8f0' }}
                  >
                    <div className="w-4 h-4 rounded-full bg-white absolute transition-all duration-200 shadow-sm" style={{ left: audioAlerts ? '1.5rem' : '0.25rem' }} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wide block">Alertas Visuais (Sirene no Painel)</span>
                    <span className="text-[10px] text-slate-400 block max-w-[340px]">Flash pulsante avermelhado nas bordas das telas com perigo eminente.</span>
                  </div>
                  <button
                    onClick={() => setVisualAlerts(!visualAlerts)}
                    className="w-11 h-6 rounded-full transition-colors relative cursor-pointer flex items-center shrink-0 bg-slate-200"
                    style={{ backgroundColor: visualAlerts ? '#4f46e5' : '#e2e8f0' }}
                  >
                    <div className="w-4 h-4 rounded-full bg-white absolute transition-all duration-200 shadow-sm" style={{ left: visualAlerts ? '1.5rem' : '0.25rem' }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer controls */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between gap-3 bg-slate-50 -mx-6 -mb-6 p-6">
              <button
                onClick={() => {
                  setTkphThreshold(960);
                  setRefreshInterval("5s");
                  setAudioAlerts(true);
                  setVisualAlerts(true);
                }}
                className="px-4 py-2 text-xs font-black text-slate-500 hover:text-slate-800 transition-colors cursor-pointer font-mono"
              >
                Resetar Padrão
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                Salvar Configurações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

