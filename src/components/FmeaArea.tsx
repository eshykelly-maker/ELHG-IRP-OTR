import { AlertTriangle, ShieldAlert, CheckCircle2 } from "lucide-react";
import RiskMatrix from "./RiskMatrix";

export default function FmeaArea() {
  return (
    <main className="flex-1 overflow-y-auto bg-slate-100 p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3.5 bg-indigo-650 text-white rounded-xl shadow-lg shadow-indigo-200">
          <ShieldAlert size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Análise FMEA: Modos e Efeitos de Falha
          </h1>
          <p className="text-base font-extrabold text-slate-700 mt-0.5">
            Integração das variáveis térmicas, operacionais e geológico-geotécnicas (IRP-OTR)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
        {/* Matriz de Risco Section */}
        <RiskMatrix />

        {/* FMEA Table Section */}
        <div className="bg-white border-2 border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b-2 border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h2 className="text-base font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-5 bg-indigo-500 rounded-full"></span> Estrutura da Matriz FMEA Aplicada
            </h2>
            <div className="flex gap-2 text-xs font-black uppercase tracking-wider text-slate-600">
               <span className="px-2.5 py-1.5 bg-white border border-slate-250 rounded">S: Severidade</span>
               <span className="px-2.5 py-1.5 bg-white border border-slate-250 rounded">O: Ocorrência</span>
               <span className="px-2.5 py-1.5 bg-white border border-slate-250 rounded">D: Detecção</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-900 text-slate-200 text-xs font-black uppercase tracking-wide border-b-2 border-slate-800">
                  <th className="px-5 py-4 font-bold w-[20%]">Modo de falha</th>
                  <th className="px-5 py-4 font-bold border-l border-slate-700/50 w-[30%]">Efeito operacional</th>
                  <th className="px-2 py-4 font-bold border-l border-slate-700/50 text-center w-8">S</th>
                  <th className="px-2 py-4 font-bold border-l border-slate-700/50 text-center w-8">O</th>
                  <th className="px-2 py-4 font-bold border-l border-slate-700/50 text-center w-8">D</th>
                  <th className="px-4 py-4 font-bold border-l border-slate-700/50 text-center whitespace-nowrap bg-indigo-600/20 text-indigo-200 shadow-inner">RPN - Risco</th>
                  <th className="px-4 py-4 font-bold border-l border-slate-700/50 text-center">Prioridade</th>
                  <th className="px-5 py-4 font-bold border-l border-slate-700/50 w-[30%]">Ação recomendada</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y-2 divide-slate-150 text-slate-800">
                <tr className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4.5 font-black text-slate-900 bg-slate-50/50 text-base">Superaquecimento e separação térmica</td>
                  <td className="px-5 py-4.5 text-slate-800 border-l border-slate-200 group-hover:border-slate-350 transition-colors font-extrabold text-sm">Degradação térmica dos compostos internos, separação entre camadas e possível perda prematura do pneu.</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">10</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">6</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">7</td>
                  <td className="px-4 py-4.5 text-center font-mono font-black text-xl bg-red-600 text-white shadow-[inset_0_0_12px_rgba(0,0,0,0.2)] border-l border-slate-200">420</td>
                  <td className="px-4 py-4.5 text-center font-black text-red-750 border-l border-slate-200 text-base">1ª</td>
                  <td className="px-5 py-4.5 text-sm font-black text-slate-900 border-l border-slate-200 bg-slate-50/50">Controlar TKPH/TMPH, carga, velocidade média, pressão e temperatura operacional.</td>
                </tr>
                <tr className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4.5 font-black text-slate-900 text-base">Impactos e separações estruturais</td>
                  <td className="px-5 py-4.5 text-slate-800 border-l border-slate-200 group-hover:border-slate-350 transition-colors font-extrabold text-sm">Deformações internas, rompimento de lonas, separação estrutural e parada não programada.</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">9</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">7</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">5</td>
                  <td className="px-4 py-4.5 text-center font-mono font-black text-xl bg-orange-500 text-white shadow-[inset_0_0_12px_rgba(0,0,0,0.15)] border-l border-slate-200">315</td>
                  <td className="px-4 py-4.5 text-center font-black text-orange-850 border-l border-slate-200 text-base">2ª</td>
                  <td className="px-5 py-4.5 text-sm font-black text-slate-900 border-l border-slate-200">Melhorar manutenção das haul roads, remover blocos e intensificar inspeção após impacto.</td>
                </tr>
                <tr className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4.5 font-black text-slate-900 bg-slate-50/50 text-base">Cortes e perfurações</td>
                  <td className="px-5 py-4.5 text-slate-800 border-l border-slate-200 group-hover:border-slate-350 transition-colors font-extrabold text-sm">Perda de integridade da banda de rodagem, flanco ou carcaça, podendo evoluir para perda de pressão e descarte.</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">8</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">8</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">4</td>
                  <td className="px-4 py-4.5 text-center font-mono font-black text-xl bg-orange-400 text-white shadow-[inset_0_0_12px_rgba(0,0,0,0.1)] border-l border-slate-200">256</td>
                  <td className="px-4 py-4.5 text-center font-black text-orange-800 border-l border-slate-200 text-base">3ª</td>
                  <td className="px-5 py-4.5 text-sm font-black text-slate-900 border-l border-slate-200 bg-slate-50/50">Realizar limpeza e patrolamento da pista, inspeções visuais e controle de fragmentos cortantes.</td>
                </tr>
                <tr className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4.5 font-black text-slate-900 text-base">Patinagem e desgaste por deslizamento</td>
                  <td className="px-5 py-4.5 text-slate-800 border-l border-slate-200 group-hover:border-slate-350 transition-colors font-extrabold text-sm">Desgaste irregular da banda de rodagem, aumento de temperatura e perda de eficiência operacional.</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">7</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">7</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">4</td>
                  <td className="px-4 py-4.5 text-center font-mono font-black text-xl bg-yellow-400 text-yellow-950 shadow-[inset_0_0_12px_rgba(0,0,0,0.1)] border-l border-slate-200">196</td>
                  <td className="px-4 py-4.5 text-center font-black text-yellow-850 border-l border-slate-200 text-base">4ª</td>
                  <td className="px-5 py-4.5 text-sm font-black text-slate-900 border-l border-slate-200">Controlar drenagem, umidade, aderência da pista, operação em rampas e manobras com excesso de torque.</td>
                </tr>
                <tr className="group hover:bg-slate-50/80 transition-colors border-b border-slate-200">
                  <td className="px-5 py-4.5 font-black text-slate-900 bg-slate-50/50 text-base">Abrasão severa</td>
                  <td className="px-5 py-4.5 text-slate-800 border-l border-slate-200 group-hover:border-slate-350 transition-colors font-extrabold text-sm">Desgaste acelerado da banda de rodagem e redução progressiva da vida útil do pneu.</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">6</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">7</td>
                  <td className="px-2 py-4.5 text-center font-mono font-black border-l border-slate-200 text-base">3</td>
                  <td className="px-4 py-4.5 text-center font-mono font-black text-xl bg-emerald-500 text-white shadow-[inset_0_0_12px_rgba(0,0,0,0.15)] border-l border-slate-200">126</td>
                  <td className="px-4 py-4.5 text-center font-black text-emerald-850 border-l border-slate-200 text-base">5ª</td>
                  <td className="px-5 py-4.5 text-sm font-black text-slate-900 border-l border-slate-200 bg-slate-50/50">Melhorar compactação e regularidade da via, acompanhar profundidade da banda e programar intervenções preventivas.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
