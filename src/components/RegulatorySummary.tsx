import React from 'react';
import { Scale, CheckCircle2, ShieldCheck, Zap, AlertTriangle, FileText } from 'lucide-react';

export const RegulatorySummary: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-800 print:hidden">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold tracking-tight text-white">
            주식회사 아이티에스뱅크 LostFindUs 핵심 규제 프레임워크 & 컴플라이언스
          </h3>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
          법무 감사 승인 완료
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Item 1 */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 space-y-1.5">
          <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>민법 제675조 현상광고</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            보상금 계약 당사자는 소유주와 목격 제보자이며, 플랫폼은 단순 거래 증명자(Witness & Verifier) 및 통신판매중개자로 법적 책임을 한정.
          </p>
        </div>

        {/* Item 2 */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>에스크로 & 정액 3,000원</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            기존 30% 수수료를 전면 폐지하고 건당 3,000원의 안전거래 이용료만 수취. 제보자는 100% 전액을 수령하여 도덕적 해이와 폭리 논란 차단.
          </p>
        </div>

        {/* Item 3 */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>소득세법 5만원 비과세</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            기타소득 과세최저한(지급건별 5만 원 이하) 기준을 준수하도록 유도하여 복잡한 세무 원천징수 의무 및 지급명세서 제출 행정 부담을 합법적 면제.
          </p>
        </div>

        {/* Item 4 */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 space-y-1.5">
          <div className="flex items-center gap-1.5 text-rose-300 font-bold">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>알고리즘 A/B 어뷰징 적발</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            실종 후 12시간 고정 비콘 및 72시간 내 사전 스캔 매칭 적발 시 즉시 'HOLD' 처리하여 자작극 및 보상금 편취 범죄를 기술적으로 봉쇄.
          </p>
        </div>
      </div>
    </div>
  );
};
