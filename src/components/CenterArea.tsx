import { useRef, useState } from "react";
import {
  Map,
  Layers,
  CheckCircle,
  AlertTriangle,
  Maximize,
  Minimize,
  Settings2,
  Trash2,
  MapPinned,
  Mountain,
  Compass,
  Route,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Gauge,
  Info,
} from "lucide-react";
import ParetoChart from "./ParetoChart";
import RadarRiskChart from "./RadarRiskChart";
import ActionPanel from "./ActionPanel";

type MapMode = "location" | "slope" | "custom";

const MAP_LAYERS = [
  { id: "Google Satellite", label: "Satélite de fundo" },
  { id: "declividade_definitiva", label: "Declividade" },
  { id: "sombreamento", label: "Sombreamento" },
  { id: "curvas_de_niveis", label: "Curvas de Nível" },
  { id: "trecho_baixo", label: "Trecho Baixo" },
  { id: "trecho_medio", label: "Trecho Médio" },
  { id: "trecho_alto", label: "Trecho Alto" },
  { id: "área_de_estudo", label: "Área de Estudo" },
];

export default function CenterArea({
  isExtended,
  onToggleExtend,
  selectedRisk,
  onSelectRisk,
  mapOnly = false,
  isResizing = false,
}: {
  isExtended: boolean;
  onToggleExtend: () => void;
  selectedRisk: "baixo" | "medio" | "alto" | null;
  onSelectRisk: (risk: "baixo" | "medio" | "alto" | null) => void;
  mapOnly?: boolean;
  isResizing?: boolean;
}) {
  const [layersOpen, setLayersOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<MapMode>("location");

  // By default, start with location layers
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    "Google Satellite": true,
    declividade_definitiva: false,
    sombreamento: false,
    curvas_de_niveis: false,
    trecho_baixo: false,
    trecho_medio: false,
    trecho_alto: true, // we assume alto risk is selected by default initially
    área_de_estudo: true,
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const applyLayersConfig = (newLayers: Record<string, boolean>) => {
    setActiveLayers(newLayers);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      Object.entries(newLayers).forEach(([layerId, visible]) => {
        iframeRef.current!.contentWindow!.postMessage(
          {
            type: "TOGGLE_LAYER",
            layerTitle: layerId,
            visible: visible,
          },
          "*",
        );
      });
    }
  };

  const setMode = (mode: MapMode) => {
    setActiveMode(mode);
    if (mode === "location") {
      applyLayersConfig({
        "Google Satellite": true,
        declividade_definitiva: false,
        sombreamento: false,
        curvas_de_niveis: false,
        trecho_baixo: false,
        trecho_medio: false,
        trecho_alto: false,
        área_de_estudo: true,
      });
    } else if (mode === "slope") {
      applyLayersConfig({
        "Google Satellite": true,
        declividade_definitiva: true,
        sombreamento: true,
        curvas_de_niveis: true,
        trecho_baixo: false,
        trecho_medio: false,
        trecho_alto: false,
        área_de_estudo: true,
      });
    } else if (mode === "custom") {
      setLayersOpen(true);
    }
  };

  const toggleLayer = (layerId: string) => {
    setActiveMode("custom");
    const newState = !activeLayers[layerId];
    setActiveLayers((prev) => ({ ...prev, [layerId]: newState }));

    // Post message to iframe
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "TOGGLE_LAYER",
          layerTitle: layerId,
          visible: newState,
        },
        "*",
      );
    }
  };

  const clearLayers = () => {
    setActiveMode("custom");
    // Keep satellite by default, turn off others
    const cleared = MAP_LAYERS.reduce(
      (acc, layer) => ({ ...acc, [layer.id]: layer.id === "Google Satellite" }),
      {},
    );
    setActiveLayers(cleared);

    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "CLEAR_ALL_LAYERS" },
        "*",
      );
    }
  };

  const handleRiskSelect = (risk: "baixo" | "medio" | "alto") => {
    onSelectRisk(risk);
    const updatedLayers = {
      ...activeLayers,
      trecho_baixo: risk === "baixo",
      trecho_medio: risk === "medio",
      trecho_alto: risk === "alto",
    };
    applyLayersConfig(updatedLayers);
  };

  return (
    <main className={`flex-1 flex flex-col bg-slate-100 relative overflow-y-auto transition-all duration-300 p-6 pb-12 ${mapOnly ? "" : "space-y-6"}`}>
      {/* Map Area with frame */}
      <div className={`w-full ${mapOnly ? "flex-1 min-h-[400px]" : "h-[620px]"} shrink-0 bg-slate-900 relative flex items-center justify-center z-0 overflow-hidden border border-slate-200 rounded-xl shadow-lg`}>
        {/* QGIS Map Iframe */}
        <iframe
          ref={iframeRef}
          src="/map/index.html"
          title="QGIS Map"
          className={`absolute inset-0 w-full h-full border-0 z-0 ${isResizing ? "pointer-events-none" : ""}`}
          onLoad={() => {
            const initialLayers = {
              ...activeLayers,
              trecho_baixo: selectedRisk === "baixo",
              trecho_medio: selectedRisk === "medio",
              trecho_alto: selectedRisk === "alto",
            };
            applyLayersConfig(initialLayers);
          }}
        />

        {/* HUD FLOATING CONTROL 1: Top-Left Layers Menu */}
        <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
          <button
            onClick={() => setLayersOpen(!layersOpen)}
            className={`flex items-center justify-center border text-slate-300 p-2.5 rounded-xl shadow-xl hover:text-white transition-all cursor-pointer ${layersOpen ? "bg-slate-950 border-slate-705 text-white" : "bg-slate-950/85 border-slate-800/80 hover:bg-slate-950"}`}
            title="Camadas de Geodados"
          >
            <Layers size={18} />
          </button>

          {layersOpen && (
            <div className="bg-slate-950/95 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-md text-slate-300 w-64 p-3.5 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center mb-3 border-b border-slate-800/80 pb-2">
                <span className="font-mono font-bold text-slate-200 text-[10px] uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                  <Map size={14} className="text-indigo-400" /> CAMADAS ATIVAS
                </span>
                <button
                  onClick={clearLayers}
                  className="text-slate-400 hover:text-red-300 transition-colors flex items-center gap-1 text-[9px] font-mono uppercase font-bold"
                  title="Limpar Geodados"
                >
                  <Trash2 size={12} /> Limpar
                </button>
              </div>

              <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
                {MAP_LAYERS.map((layer) => (
                  <div
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className={`flex items-center justify-between cursor-pointer p-1.5 rounded-md transition-colors ${activeLayers[layer.id] ? "bg-slate-850/80 text-white font-extrabold" : "hover:bg-slate-900 text-slate-300 font-semibold"}`}
                  >
                    <span className="text-[11px] truncate font-medium">{layer.label}</span>
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${activeLayers[layer.id] ? "border-indigo-500 bg-indigo-500/20" : "border-slate-700 bg-[#0d1323]"}`}
                    >
                      {activeLayers[layer.id] && (
                        <div className="w-1.5 h-1.5 rounded-sm bg-[#818cf8]"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* HUD FLOATING CONTROL 2: Top-Center Quick Modes */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2 bg-slate-950/90 border-2 border-slate-700 p-2 rounded-full shadow-2xl backdrop-blur-md">
          <button
            onClick={() => setMode("location")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${activeMode === "location" ? "bg-blue-600/30 text-blue-300 border border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.3)]" : "text-slate-300 border border-transparent hover:text-slate-100"}`}
            title="Mapa de Localização"
          >
            <MapPinned size={15} />
            <span>Localização</span>
          </button>

          <button
            onClick={() => setMode("slope")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${activeMode === "slope" ? "bg-[#10b981]/30 text-[#4ade80] border border-[#10b981]/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]" : "text-slate-300 border border-transparent hover:text-slate-100"}`}
            title="Declividade & Gradiops"
          >
            <Mountain size={15} />
            <span>Declividade</span>
          </button>

          <button
            onClick={() => setMode("custom")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${activeMode === "custom" ? "bg-[#f59e0b]/30 text-[#fbbf24] border border-[#f59e0b]/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]" : "text-slate-300 border border-transparent hover:text-slate-100"}`}
            title="Filtros Seletivos"
          >
            <Settings2 size={15} />
            <span>Personalizado</span>
          </button>
        </div>

        {/* HUD FLOATING CONTROL 4: Bottom-Right Instrument Coordinates HUD */}
        <div className="absolute bottom-6 right-6 z-30 pointer-events-none hidden lg:flex flex-col items-end gap-1.5 font-mono text-[11px] text-slate-300 bg-slate-950/90 border-2 border-slate-700 p-3.5 rounded-xl shadow-2xl backdrop-blur-md select-none">
          <div className="flex items-center gap-1.5 mb-1">
            <Compass size={14} className="text-indigo-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span className="font-extrabold text-white tracking-wider text-xs">UTM WGS84 S11D</span>
          </div>
          <span className="tracking-widest text-[#60a5fa] font-black">Easting: 588,230.45 m E</span>
          <span className="tracking-widest text-[#60a5fa] font-black">Northing: 7,349,120.12 m S</span>
          <span className="font-bold text-[9px] text-slate-400 block border-t border-slate-800/80 pt-1.5 mt-1 w-full text-right font-sans">Escala Local // 1:25.000</span>
        </div>

        {/* Floating Expand/Collapse Button */}
        {!mapOnly && (
          <button
            onClick={onToggleExtend}
            className="absolute top-4 right-4 z-30 bg-slate-950 border-2 border-slate-700 hover:bg-[#111827] text-slate-200 p-2.5 rounded-xl shadow-xl transition-colors cursor-pointer"
            title={isExtended ? "Minimizar Mapa" : "Expandir Mapa"}
          >
            {isExtended ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        )}
      </div>

      {/* SEGMENT RISK SELECTOR - PLACED DIRECTLY BENEATH THE MAP FRAME (CLEAN, WHITE, FAST) */}
      <div className="w-full bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-center gap-6 shrink-0">
        <div className="flex flex-wrap items-center justify-center gap-5">
          {/* Baixo Risco */}
          <button
            onClick={() => handleRiskSelect("baixo")}
            className={`flex items-center gap-3.5 px-8 py-3.5 rounded-xl border-3 text-base font-black transition-all duration-200 cursor-pointer shadow-sm ${
              selectedRisk === "baixo"
                ? "bg-white border-emerald-500 text-emerald-805 ring-4 ring-emerald-500/15 translate-y-[-1px]"
                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-350 hover:text-slate-800"
            }`}
          >
            <span className={`w-3.5 h-3.5 rounded-full bg-emerald-500 shrink-0 ${selectedRisk === "baixo" ? "animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" : ""}`}></span>
            <span>Baixo Risco</span>
          </button>

          {/* Médio Risco */}
          <button
            onClick={() => handleRiskSelect("medio")}
            className={`flex items-center gap-3.5 px-8 py-3.5 rounded-xl border-3 text-base font-black transition-all duration-200 cursor-pointer shadow-sm ${
              selectedRisk === "medio"
                ? "bg-white border-amber-500 text-amber-805 ring-4 ring-amber-500/15 translate-y-[-1px]"
                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-350 hover:text-slate-800"
            }`}
          >
            <span className={`w-3.5 h-3.5 rounded-full bg-amber-500 shrink-0 ${selectedRisk === "medio" ? "animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" : ""}`}></span>
            <span>Médio Risco</span>
          </button>

          {/* Alto Risco */}
          <button
            onClick={() => handleRiskSelect("alto")}
            className={`flex items-center gap-3.5 px-8 py-3.5 rounded-xl border-3 text-base font-black transition-all duration-200 cursor-pointer shadow-sm ${
              selectedRisk === "alto"
                ? "bg-white border-rose-500 text-rose-805 ring-4 ring-rose-500/15 translate-y-[-1px]"
                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-350 hover:text-slate-800"
            }`}
          >
            <span className={`w-3.5 h-3.5 rounded-full bg-rose-500 shrink-0 ${selectedRisk === "alto" ? "animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" : ""}`}></span>
            <span>Alto Risco</span>
          </button>
        </div>
      </div>
      
      {/* Analytics Charts Area */}
      {!mapOnly && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 shrink-0 mt-2">
          <div className="xl:col-span-7">
            <ParetoChart selectedRisk={selectedRisk || "alto"} />
          </div>
          <div className="xl:col-span-5">
            <RadarRiskChart selectedRisk={selectedRisk || "alto"} />
          </div>
          <div className="xl:col-span-12">
            <ActionPanel selectedRisk={selectedRisk || "alto"} />
          </div>
        </div>
      )}
    </main>
  );
}
