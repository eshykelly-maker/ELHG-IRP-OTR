import { Home, SlidersHorizontal, Settings, Map as MapIcon, ClipboardList } from "lucide-react";
import { PageType } from "../App";

export default function Sidebar({
  currentPage,
  onNavigate,
  onOpenSettings,
}: {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenSettings?: () => void;
}) {
  return (
    <nav className="w-16 shrink-0 bg-[#0b1121] border-r border-slate-800 flex flex-col items-center py-6 space-y-4 text-slate-400 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      <div
        onClick={() => onNavigate("dashboard")}
        className={`p-2.5 rounded-lg cursor-pointer transition-all ${
          currentPage === "dashboard"
            ? "bg-indigo-600/20 text-indigo-400 shadow-[inset_0_0_12px_rgba(79,70,229,0.3)] border border-indigo-500/30"
            : "hover:bg-slate-800/80 hover:text-slate-200 border border-transparent"
        }`}
        title="Dashboard IRP"
      >
        <Home size={20} />
      </div>
      <div
        onClick={() => onNavigate("map_only")}
        className={`p-2.5 rounded-lg cursor-pointer transition-all ${
          currentPage === "map_only"
            ? "bg-indigo-600/20 text-indigo-400 shadow-[inset_0_0_12px_rgba(79,70,229,0.3)] border border-indigo-500/30"
            : "hover:bg-slate-800/80 hover:text-slate-200 border border-transparent"
        }`}
        title="Mapa Fullscreen"
      >
        <MapIcon size={20} />
      </div>
      <div
        onClick={() => onNavigate("fmea")}
        className={`p-2.5 rounded-lg cursor-pointer transition-all ${
          currentPage === "fmea"
            ? "bg-indigo-600/20 text-indigo-400 shadow-[inset_0_0_12px_rgba(79,70,229,0.3)] border border-indigo-500/30"
            : "hover:bg-slate-800/80 hover:text-slate-200 border border-transparent"
        }`}
        title="Análise FMEA"
      >
        <ClipboardList size={20} />
      </div>
      <div
        onClick={() => onNavigate("simulation")}
        className={`p-2.5 rounded-lg cursor-pointer transition-all ${
          currentPage === "simulation"
             ? "bg-indigo-600/20 text-indigo-400 shadow-[inset_0_0_12px_rgba(79,70,229,0.3)] border border-indigo-500/30"
             : "hover:bg-slate-800/80 hover:text-slate-200 border border-transparent"
        }`}
        title="Simulação e Customização"
      >
        <SlidersHorizontal size={20} />
      </div>


      <div className="mt-auto pt-6 border-t border-slate-800/60 w-full flex justify-center">
        <div 
          onClick={onOpenSettings}
          className="p-2.5 cursor-pointer hover:text-indigo-400 hover:bg-slate-800/80 rounded-lg transition-all border border-transparent"
          title="Configurações do Sistema"
        >
          <Settings size={20} />
        </div>
      </div>
    </nav>
  );
}
