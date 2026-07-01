import React from 'react';
import { FaFolderOpen, FaCloudSun, FaDatabase, FaCircleCheck } from 'react-icons/fa6';

const ProjectMockupPreview = ({ category, heightClass = 'h-32' }) => {
  switch (category) {
    case 'fintech':
      return (
        <div className={`w-full ${heightClass} rounded-xl bg-gray-950 border border-cyan-500/10 overflow-hidden relative p-3 flex flex-col justify-between group-hover:border-cyan-500/30 transition-colors duration-300 select-none`}>
          <div className="flex items-center justify-between text-[9px] font-mono text-gray-500">
            <span>LENDO P2P LEDGER</span>
            <span className="text-emerald-500 animate-pulse flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Active
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="h-6 px-2.5 rounded bg-cyan-950/40 border border-cyan-500/10 flex items-center justify-center text-[10px] font-bold text-[#00f0ff]">
                $24,850
              </div>
              <div className="h-6 px-2.5 rounded bg-sky-950/40 border border-sky-500/10 flex items-center justify-center text-[10px] font-bold text-[#38bdf8]">
                +14.2% APR
              </div>
            </div>
            {/* Visual graph bars */}
            <div className="h-12 w-full flex items-end gap-1.5 pt-1">
              <div className="h-2 w-full bg-cyan-950/60 rounded transition-all duration-300 group-hover:h-3" />
              <div className="h-4 w-full bg-cyan-900/60 rounded transition-all duration-300 group-hover:h-6" />
              <div className="h-7 w-full bg-cyan-750/60 rounded transition-all duration-300 group-hover:h-9" />
              <div className="h-10 w-full bg-[#00f0ff]/50 rounded animate-pulse" />
              <div className="h-5 w-full bg-sky-900/60 rounded transition-all duration-300 group-hover:h-7" />
              <div className="h-8 w-full bg-sky-750/60 rounded transition-all duration-300 group-hover:h-10" />
              <div className="h-11 w-full bg-[#38bdf8]/50 rounded animate-pulse" />
            </div>
          </div>
        </div>
      );
    case 'enterprise':
      return (
        <div className={`w-full ${heightClass} rounded-xl bg-gray-950 border border-cyan-500/10 overflow-hidden relative p-3 flex flex-col justify-between group-hover:border-cyan-500/30 transition-colors duration-300 select-none`}>
          <div className="flex items-center justify-between text-[9px] font-mono text-gray-500">
            <span>BANK DATABASE LOGS</span>
            <span className="text-[#38bdf8] flex items-center gap-1 font-semibold">
              HTTPS SECURE
            </span>
          </div>
          <div className="space-y-1.5 font-mono text-[9px] text-gray-500">
            <div className="flex justify-between border-b border-cyan-500/5 pb-1">
              <span className="text-gray-400">TX_92102: EMI CALC</span>
              <span className="text-[#00f0ff] font-bold">12.5% FIXED</span>
            </div>
            <div className="flex justify-between border-b border-cyan-500/5 pb-1">
              <span className="text-gray-400">BRANCH_MGR: COMMIT</span>
              <span className="text-emerald-500 font-bold">SUCCESS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">LEDGER_POST: OK</span>
              <span className="text-amber-500 font-bold">AUDITED</span>
            </div>
          </div>
          {/* Progress fill */}
          <div className="h-3 w-full bg-gray-900 rounded-full overflow-hidden p-0.5 border border-cyan-500/5">
            <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] rounded-full w-[85%] animate-pulse" />
          </div>
        </div>
      );
    case 'utility':
      return (
        <div className={`w-full ${heightClass} rounded-xl bg-gray-950 border border-cyan-500/10 overflow-hidden relative p-3 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors duration-300 select-none`}>
          {/* Radar Circles */}
          <div className="absolute w-24 h-24 rounded-full border border-cyan-500/10 flex items-center justify-center">
            <div className="absolute w-16 h-16 rounded-full border border-sky-500/15 flex items-center justify-center">
              <div className="absolute w-8 h-8 rounded-full border border-[#00f0ff]/20 animate-ping" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] animate-pulse" />
            </div>
          </div>
          <div className="absolute top-2.5 left-3 text-[9px] font-mono text-gray-500 flex items-center gap-1.5">
            <FaCloudSun className="w-3.5 h-3.5 text-[#38bdf8] animate-bounce" />
            <span>UTILITY ENGINE</span>
          </div>
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[9px] font-mono text-emerald-500 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>GEO-RESOLVED</span>
          </div>
        </div>
      );
    case 'crud':
      return (
        <div className={`w-full ${heightClass} rounded-xl bg-gray-950 border border-cyan-500/10 overflow-hidden relative p-3 flex flex-col justify-between group-hover:border-cyan-500/30 transition-colors duration-300 select-none`}>
          <div className="flex items-center justify-between text-[9px] font-mono text-gray-500">
            <span>ADMIN CONTROL DIRECTORY</span>
            <span className="text-gray-500">Total: 142 Users</span>
          </div>
          <div className="space-y-1.5">
            {/* User row 1 */}
            <div className="flex items-center gap-2 bg-cyan-950/20 p-1.5 rounded border border-cyan-500/5">
              <div className="w-4 h-4 rounded-full bg-[#00f0ff]/20 flex items-center justify-center text-[7px] text-[#00f0ff] font-bold">AK</div>
              <div className="h-1.5 w-16 bg-gray-800 rounded" />
              <div className="ml-auto text-[7px] font-semibold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <FaCircleCheck className="w-2 h-2" />
                Active
              </div>
            </div>
            {/* User row 2 */}
            <div className="flex items-center gap-2 bg-sky-950/20 p-1.5 rounded border border-sky-500/5">
              <div className="w-4 h-4 rounded-full bg-[#38bdf8]/20 flex items-center justify-center text-[7px] text-[#38bdf8] font-bold">JD</div>
              <div className="h-1.5 w-12 bg-gray-800 rounded" />
              <div className="ml-auto text-[7px] font-semibold bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">Viewer</div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className={`w-full ${heightClass} rounded-xl bg-gray-950 border border-cyan-500/10 overflow-hidden relative p-3 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors duration-300 select-none`}>
          <FaFolderOpen className="w-8 h-8 text-[#38bdf8] opacity-40 animate-pulse" />
          <div className="absolute top-2.5 left-3 text-[9px] font-mono text-gray-500 flex items-center gap-1.5">
            <FaDatabase className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>SERVICE ARCHIVE</span>
          </div>
        </div>
      );
  }
};

export default ProjectMockupPreview;
