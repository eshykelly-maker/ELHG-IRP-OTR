import React from 'react';
import { MapLayer } from '../types';

interface CenterMapProps {
  layers: MapLayer;
  setLayers: React.Dispatch<React.SetStateAction<MapLayer>>;
  selectedTrackId: string;
  setSelectedTrackId: (v: string) => void;
  velocidade: number; 
  calculationTotal: number; 
  darkMode?: boolean;
}

export default function CenterMap({
  darkMode = false,
}: CenterMapProps) {
  
  return (
    <div className={`flex-1 flex flex-col min-w-0 font-sans h-full overflow-hidden relative ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#e5e7eb]'}`}>
      <iframe 
        src="/map/index.html" 
        className="w-full h-full border-none" 
        title="QGIS Web Map"
      />
    </div>
  );
}

