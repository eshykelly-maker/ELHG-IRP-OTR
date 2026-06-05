import React from 'react';
import { AlertCircle, CheckCircle2, Wrench, BarChart2 } from 'lucide-react';
import { IRPCalculation } from '../types';

interface BottomAnalysisProps {
  calculation: IRPCalculation;
  identificacao: string;
  darkMode?: boolean;
}

export default function BottomAnalysis({ calculation, identificacao, darkMode = false }: BottomAnalysisProps) {
  
  // Dynamic text generators for Cortes e Perfurações card
  const getCortesEfeito = (val: number) => {
    if (val >= 7.5) {
      return {
        nota: val.toFixed(2),
        nivel: 'Crítico',
        texto: 'Laceração profunda da banda com altíssima taxa de perda de fragmentos de borracha. Alto risco de perda funcional abrupta.',
        acao: 'Intervenção Mecânica Imediata: Patrolamento e limpeza da frente de lavra com Motoniveladora nas próximas 2 horas.',
        color: darkMode ? 'text-red-400 bg-red-950/50 border-red-900/50' : 'text-red-600 bg-red-50 border-red-200'
      };
    } else if (val >= 5.0) {
      return {
        nota: val.toFixed(2),
        nivel: 'Alto',
        texto: 'Incidência severa de cortes na banda de rodagem causados por matacos esparsos de Hematita. Risco de penetração na carcaça.',
        acao: 'Patrolamento de pista / Varrição de frentes com carregadeira e limpeza regular com Motor Grader.',
        color: darkMode ? 'text-orange-400 bg-orange-950/50 border-orange-900/50' : 'text-orange-600 bg-orange-50 border-orange-200'
      };
    } else {
      return {
        nota: val.toFixed(2),
        nivel: 'Normal',
        texto: 'Cortes superficiais pontuais condizentes com a operação padrão no minério de ferro.',
        acao: 'Monitoramento preventivo nas inspeções programadas no COI a cada final de turno.',
        color: darkMode ? 'text-emerald-400 bg-emerald-950/50 border-emerald-900/50' : 'text-emerald-600 bg-emerald-50 border-emerald-200'
      };
    }
  };

  // Dynamic text generators for Impactos e Separação card
  const getImpactoEfeito = (val: number) => {
    if (val >= 7.5) {
      return {
        nota: val.toFixed(2),
        nivel: 'Crítico',
        texto: 'Delaminação severa sob as cintas metálicas internas decorrente de alto flexionamento cíclico por matacos de canga.',
        acao: 'Avaliação de integridade mecânica com Ultrassom térmico portátil na baia de manutenção.',
        color: darkMode ? 'text-red-400 bg-red-950/50 border-red-900/50' : 'text-red-600 bg-red-50 border-red-200'
      };
    } else if (val >= 5.0) {
      return {
        nota: val.toFixed(2),
        nivel: 'Atenção',
        texto: 'Deformações estruturais por impactos em rochas e desníveis locais de rampa (sulcos). Risco de fadiga das cintas.',
        acao: 'Inspecionar desníveis e gerenciar tamanho das pilhas de abatimento de carga no Km 3.4.',
        color: darkMode ? 'text-orange-400 bg-orange-950/50 border-orange-900/50' : 'text-orange-600 bg-orange-50 border-orange-200'
      };
    } else {
      return {
        nota: val.toFixed(2),
        nivel: 'Estável',
        texto: 'Estresse estrutural lateral aceitável. Suspensão ativa operando no patamar verde.',
        acao: 'Manter velocidade regulada nas proximidades dos desvios operacionais da rampa.',
        color: darkMode ? 'text-emerald-400 bg-emerald-950/50 border-emerald-900/50' : 'text-emerald-600 bg-emerald-50 border-emerald-200'
      };
    }
  };

  // Dynamic text generators for Abrasão card
  const getAbrasaoEfeito = (val: number, severity: number) => {
    const combined = (val + severity) / 2;
    if (combined >= 7.0) {
      return {
        nota: combined.toFixed(2),
        texto: 'Desgaste acelerado da banda de rodagem decorrente de alta fricção e curvas fechadas com carga máxima.',
        acao: 'Otimizar traçado das haul roads e reduzir gradiente vertical para mitigação de forças axiais.',
        color: darkMode ? 'text-red-400 bg-red-950/50 border-red-900/50' : 'text-red-600 bg-red-50 border-red-200'
      };
    } else if (combined >= 4.5) {
      return {
        nota: combined.toFixed(2),
        texto: 'Perda precoce de milímetros de borracha na banda em decorrência da alta abrasividade do minério local.',
        acao: 'Reduzir ciclos de frenagem agressiva acelerada, otimizar curvas de alta fricção do traçado.',
        color: darkMode ? 'text-orange-400 bg-orange-950/50 border-orange-900/50' : 'text-orange-600 bg-orange-50 border-orange-200'
      };
    } else {
      return {
        nota: combined.toFixed(2),
        texto: 'Taxa de desgaste normal dentro do envelope operacional esperado.',
        acao: 'Continuar rodagem sob acompanhamento de durabilidade residual de borracha mensal.',
        color: darkMode ? 'text-emerald-400 bg-emerald-950/50 border-emerald-900/50' : 'text-emerald-600 bg-emerald-50 border-emerald-200'
      };
    }
  };

  const cortesData = getCortesEfeito(calculation.cp);
  const impactoData = getImpactoEfeito(calculation.ie);
  const abrasaoData = getAbrasaoEfeito(calculation.pt, calculation.sg);

  return (
    <div className={`border-t p-5 flex flex-col gap-4 font-sans shrink-0 select-none transition-colors duration-300 ${
      darkMode 
        ? 'bg-slate-900 border-slate-800 text-slate-100' 
        : 'bg-slate-100 border-slate-200 text-slate-800'
    }`}>
      
      {/* Footer diagnostic header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <BarChart2 size={16} className={darkMode ? 'text-indigo-400' : 'text-indigo-600'} />
          <span className={`font-bold uppercase tracking-widest text-xs border-b-2 border-indigo-500 pb-0.5 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Diretrizes de Engenharia COI
          </span>
        </div>
        <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-slate-400 bg-slate-800 px-3 py-1 rounded border border-slate-700' : 'text-slate-500 bg-white px-3 py-1 rounded border border-slate-200 shadow-sm'}`}>
          <span>ID Ativo:</span>
          <span className={`font-black ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{identificacao}</span>
        </div>
      </div>

      {/* Grid containing dynamic insight cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Cortes e Perfuras */}
        <div className={`border rounded-lg p-4 text-sm flex flex-col justify-between shadow-sm gap-3 transition-colors duration-300 ${
          darkMode ? 'bg-slate-950/80 border-slate-800/80' : 'bg-white border-slate-200/80'
        }`}>
          <div className="flex items-start justify-between">
            <span className={`font-bold text-xs uppercase tracking-widest ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Cortes e Perfurações</span>
            <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border font-mono ${cortesData.color}`}>
              Nota {cortesData.nota}
            </span>
          </div>
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>Efeito Previsto</span>
            <p className={`leading-snug mt-1 text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{cortesData.texto}</p>
          </div>
          <div className={`pt-3 border-t flex items-start gap-1.5 text-xs ${darkMode ? 'border-slate-800 text-indigo-400' : 'border-slate-100 text-indigo-700'}`}>
            <Wrench size={14} className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'} shrink-0 mt-0.5`} />
            <div>
              <span className="font-bold uppercase tracking-widest text-[10px]">Ação COO</span>
              <p className={`leading-snug mt-0.5 font-medium ${darkMode ? 'text-indigo-300' : 'text-indigo-800'}`}>{cortesData.acao}</p>
            </div>
          </div>
        </div>

        {/* Card 2: Impacto & Separacao */}
        <div className={`border rounded-lg p-4 text-sm flex flex-col justify-between shadow-sm gap-3 transition-colors duration-300 ${
          darkMode ? 'bg-slate-950/80 border-slate-800/80' : 'bg-white border-slate-200/80'
        }`}>
          <div className="flex items-start justify-between">
            <span className={`font-bold text-xs uppercase tracking-widest ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Impacto &amp; Separação</span>
            <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border font-mono ${impactoData.color}`}>
              Nota {impactoData.nota}
            </span>
          </div>
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>Efeito Previsto</span>
            <p className={`leading-snug mt-1 text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{impactoData.texto}</p>
          </div>
          <div className={`pt-3 border-t flex items-start gap-1.5 text-xs ${darkMode ? 'border-slate-800 text-indigo-400' : 'border-slate-100 text-indigo-700'}`}>
            <AlertCircle size={14} className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'} shrink-0 mt-0.5`} />
            <div>
              <span className="font-bold uppercase tracking-widest text-[10px]">Diretriz COI</span>
              <p className={`leading-snug mt-0.5 font-medium ${darkMode ? 'text-indigo-300' : 'text-indigo-800'}`}>{impactoData.acao}</p>
            </div>
          </div>
        </div>

        {/* Card 3: Abrasão por Severidade */}
        <div className={`border rounded-lg p-4 text-sm flex flex-col justify-between shadow-sm gap-3 transition-colors duration-300 ${
          darkMode ? 'bg-slate-950/80 border-slate-800/80' : 'bg-white border-slate-200/80'
        }`}>
          <div className="flex items-start justify-between">
            <span className={`font-bold text-xs uppercase tracking-widest ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Abrasão Operacional</span>
            <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border font-mono ${abrasaoData.color}`}>
              MÉDIA {abrasaoData.nota}
            </span>
          </div>
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>Efeito Mecânico</span>
            <p className={`leading-snug mt-1 text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{abrasaoData.texto}</p>
          </div>
          <div className={`pt-3 border-t flex items-start gap-1.5 text-xs ${darkMode ? 'border-slate-800 text-emerald-400' : 'border-slate-100 text-emerald-700'}`}>
            <CheckCircle2 size={14} className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'} shrink-0 mt-0.5`} />
            <div>
              <span className="font-bold uppercase tracking-widest text-[10px]">Otimização</span>
              <p className={`leading-snug mt-0.5 font-medium ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{abrasaoData.acao}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
