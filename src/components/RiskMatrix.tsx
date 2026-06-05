import React from 'react';

export default function RiskMatrix({ 
  highlightItems = [],
  dynamicPositions,
  showRpn = true
}: { 
  highlightItems?: string[],
  dynamicPositions?: Record<string, number>,
  showRpn?: boolean
}) {
  // Define a severidade fixa (row index) de cada item
  const itemRows: Record<string, number> = {
    "ST": 0,
    "IE": 0,
    "CP": 1,
    "PT": 1,
    "AS": 2
  };
  
  // Função para pegar a coluna (0 a 4) com base na ocorrência (0 a 10)
  const getColIndex = (val: number) => {
    return Math.min(4, Math.max(0, Math.ceil(val / 2) - 1));
  };
  
  // Base structure sem itens
  const rows = [
    {
      label: "S 9–10",
      desc: "Irreversível crítica",
      cells: [
        { bg: "medio", title: "Risco Médio", items: [] as string[] },
        { bg: "alto", title: "Risco Alto", items: [] as string[] },
        { bg: "alto", title: "Risco Alto", items: [] as string[] },
        { bg: "critico", title: "Risco Crítico", items: [] as string[] },
        { bg: "critico_max", title: "Risco Crítico", items: [] as string[] },
      ]
    },
    {
      label: "S 7–8",
      desc: "Irreversível severa",
      cells: [
        { bg: "baixo", title: "Risco Baixo", items: [] as string[] },
        { bg: "medio", title: "Risco Médio", items: [] as string[] },
        { bg: "alto", title: "Risco Alto", items: [] as string[] },
        { bg: "alto", title: "Risco Alto", items: [] as string[] },
        { bg: "critico", title: "Risco Crítico", items: [] as string[] },
      ]
    },
    {
      label: "S 5–6",
      desc: "Irreversível leve",
      cells: [
        { bg: "baixo", title: "Risco Baixo", items: [] as string[] },
        { bg: "medio", title: "Risco Médio", items: [] as string[] },
        { bg: "medio", title: "Risco Médio", items: [] as string[] },
        { bg: "alto", title: "Risco Alto", items: [] as string[] },
        { bg: "alto", title: "Risco Alto", items: [] as string[] },
      ]
    },
    {
      label: "S 3–4",
      desc: "Reversível severa",
      cells: [
        { bg: "irrelevante", title: "Risco Irrelevante", items: [] as string[] },
        { bg: "baixo", title: "Risco Baixo", items: [] as string[] },
        { bg: "medio", title: "Risco Médio", items: [] as string[] },
        { bg: "medio", title: "Risco Médio", items: [] as string[] },
        { bg: "alto", title: "Risco Alto", items: [] as string[] },
      ]
    },
    {
      label: "S 1–2",
      desc: "Reversível leve",
      cells: [
        { bg: "irrelevante", title: "Risco Irrelevante", items: [] as string[] },
        { bg: "irrelevante", title: "Risco Irrelevante", items: [] as string[] },
        { bg: "baixo", title: "Risco Baixo", items: [] as string[] },
        { bg: "baixo", title: "Risco Baixo", items: [] as string[] },
        { bg: "medio", title: "Risco Médio", items: [] as string[] },
      ]
    }
  ];

  if (dynamicPositions) {
    Object.entries(dynamicPositions).forEach(([item, val]) => {
      const rowIndex = itemRows[item];
      if (rowIndex !== undefined) {
        const colIndex = getColIndex(val);
        rows[rowIndex].cells[colIndex].items.push(item);
      }
    });
  } else {
    // Default FMEA positions
    rows[0].cells[2].items.push("ST");
    rows[0].cells[3].items.push("IE");
    rows[1].cells[3].items.push("CP", "PT");
    rows[2].cells[3].items.push("AS");
  }

  const mapItemLabel = (item: string) => {
    if (!showRpn && dynamicPositions) {
       return `${item} – Ocorr. ${dynamicPositions[item].toFixed(1)}`;
    }
    switch (item) {
      case "ST": return "ST – RPN 420";
      case "IE": return "IE – RPN 315";
      case "CP": return "CP – RPN 256";
      case "PT": return "PT – RPN 196";
      case "AS": return "AS – RPN 126";
      default: return item;
    }
  };

  return (
    <div className="bg-white border w-full border-slate-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden p-6">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '1rem 1rem' }}></div>
      <div className="px-1 py-1 border-b border-slate-100 flex items-center gap-2 relative z-10 mb-6">
        <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
        </div>
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest">
          Matriz de Risco (Severidade × Ocorrência)
        </h2>
      </div>
      
      <div className="overflow-x-auto relative z-10">
        <div className="min-w-[800px] flex flex-col border border-slate-200 rounded-lg overflow-hidden text-sm shadow-sm">
          {/* Header */}
          <div className="flex bg-slate-50 border-b border-slate-200 font-semibold text-slate-600 text-center">
            <div className="w-32 shrink-0 p-3 flex items-center justify-center border-r border-slate-200">
              <span className="text-xs">Severidade \ Ocorr.</span>
            </div>
            <div className="flex-1 p-3 border-r border-slate-200 flex flex-col justify-center">
              <span>O 1–2</span>
              <span className="text-xs font-normal text-slate-500">Altamente improvável</span>
            </div>
            <div className="flex-1 p-3 border-r border-slate-200 flex flex-col justify-center">
              <span>O 3–4</span>
              <span className="text-xs font-normal text-slate-500">Improvável</span>
            </div>
            <div className="flex-1 p-3 border-r border-slate-200 flex flex-col justify-center">
              <span>O 5–6</span>
              <span className="text-xs font-normal text-slate-500">Pouco provável</span>
            </div>
            <div className="flex-1 p-3 border-r border-slate-200 flex flex-col justify-center">
              <span>O 7–8</span>
              <span className="text-xs font-normal text-slate-500">Provável</span>
            </div>
            <div className="flex-1 p-3 flex flex-col justify-center">
              <span>O 9–10</span>
              <span className="text-xs font-normal text-slate-500">Altamente provável</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div key={i} className="flex border-b last:border-b-0 border-slate-200">
              <div className="w-32 shrink-0 p-3 bg-blue-50/50 flex flex-col items-center justify-center text-center border-r border-slate-200 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.02)]">
                <span className="font-bold text-slate-700">{row.label}</span>
                <span className="text-xs text-slate-500 font-medium">{row.desc}</span>
              </div>
              {row.cells.map((cell, j) => {
                const classes = {
                  irrelevante: "bg-gradient-to-br from-emerald-300 to-emerald-400 text-emerald-950 border-t border-l border-white/60 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.1),inset_2px_2px_6px_rgba(255,255,255,0.6)]",
                  baixo: "bg-gradient-to-br from-green-300 to-green-400 text-green-950 border-t border-l border-white/50 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.15),inset_2px_2px_6px_rgba(255,255,255,0.5)]",
                  medio: "bg-gradient-to-br from-yellow-300 to-yellow-400 text-yellow-950 border-t border-l border-white/60 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.15),inset_2px_2px_6px_rgba(255,255,255,0.6)]",
                  alto: "bg-gradient-to-br from-orange-400 to-orange-500 text-orange-950 border-t border-l border-white/40 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.2),inset_2px_2px_6px_rgba(255,255,255,0.4)]",
                  critico: "bg-gradient-to-br from-red-500 to-red-600 text-white border-t border-l border-white/30 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.25),inset_2px_2px_6px_rgba(255,255,255,0.3)]",
                  critico_max: "bg-gradient-to-br from-red-700 to-red-900 text-white border-t border-l border-white/20 shadow-[inset_-2px_-2px_10px_rgba(0,0,0,0.5),inset_2px_2px_8px_rgba(255,255,255,0.15)]",
                };
                const bgClass = classes[cell.bg as keyof typeof classes];
                
                return (
                  <div key={j} className={`flex-1 p-3 flex flex-col items-center justify-center text-center transition-all hover:brightness-110 ${bgClass}`}>
                    <span className="font-bold drop-shadow-sm">{cell.title}</span>
                    {cell.items && (
                      <div className="mt-2 space-y-1.5 w-full">
                        {cell.items.map((item, k) => {
                          const isActive = highlightItems.length === 0 || highlightItems.includes(item);
                          return (
                            <div key={k} className={`text-[11px] font-black tracking-wide bg-black/15 text-white/95 px-2 py-1 rounded shadow-sm border border-black/10 backdrop-blur-sm transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                              {mapItemLabel(item)}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
