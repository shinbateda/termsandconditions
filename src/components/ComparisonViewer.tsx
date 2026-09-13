import React, { useState } from 'react';
import { DIFF_DATA, DOC_TABS } from '../data/legalDocs';
import { DocCategory } from '../types';
import { HighlightText } from './HighlightText';
import { ShieldAlert, CheckCircle2, ArrowRight, Filter, BookOpen } from 'lucide-react';

interface ComparisonViewerProps {
  searchQuery: string;
}

export const ComparisonViewer: React.FC<ComparisonViewerProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<DocCategory | 'all'>('all');

  const filteredDiffs = DIFF_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.topic.toLowerCase().includes(query) ||
      item.phase1.toLowerCase().includes(query) ||
      item.phase2.toLowerCase().includes(query) ||
      item.legalImpact.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-850 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-indigo-700/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold tracking-wide uppercase border border-indigo-400/20">
              <BookOpen className="w-3.5 h-3.5" /> 1차(런칭) ➔ 2차(고도화) 핵심 법률·약관 개정 대조표
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              LostFindUs 서비스 1·2차 규제 준수 및 약관 개정 비교
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              1차 무상 중개(당근 모델)에서 2차 <strong className="text-indigo-200">에스크로 안전정산(건당 3,000원 정액제)</strong>, 
              <strong className="text-indigo-200"> 소득세법상 5만 원 이하 분할 유도(원천징수 면제)</strong>, 
              <strong className="text-indigo-200"> 자작극 탐지 알고리즘 A/B</strong> 및 <strong className="text-indigo-200">AoA 방향각 수집 & KAPIS 연동</strong>까지
              법적 리스크를 선제적으로 차단한 개정 내역을 조문별로 대조 검토합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10 text-center">
              <span className="block text-xs text-slate-400">1차 시행일</span>
              <span className="text-sm font-bold text-white">2026.09.11</span>
              <span className="block text-[11px] text-indigo-300 mt-0.5">1:1 직거래 당근형</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10 text-center">
              <span className="block text-xs text-slate-400">2차 시행일</span>
              <span className="text-sm font-bold text-emerald-400">2026.10.31</span>
              <span className="block text-[11px] text-emerald-300 mt-0.5">PG 에스크로 고도화</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 mr-1">
          <Filter className="w-3.5 h-3.5" /> 문서 필터:
        </span>
        <button
          id="filter-all"
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          전체 보기 ({DIFF_DATA.length})
        </button>
        {DOC_TABS.map((tab) => {
          const count = DIFF_DATA.filter((d) => d.category === tab.id).length;
          return (
            <button
              key={tab.id}
              id={`filter-${tab.id}`}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.shortName} ({count})
            </button>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="space-y-4">
        {filteredDiffs.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            검색 결과가 없습니다. 다른 검색어를 입력해보세요.
          </div>
        ) : (
          filteredDiffs.map((diff, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300"
            >
              {/* Card Header */}
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                    {diff.categoryName}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    <HighlightText text={diff.topic} query={searchQuery} />
                  </h3>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                  {diff.tag}
                </span>
              </div>

              {/* Diff Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
                {/* 1차 런칭 내용 */}
                <div className="p-5 bg-slate-50/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-slate-400 inline-block"></span>
                      1차 런칭 버전 (2026.09.11)
                    </span>
                    <span className="text-[11px] text-slate-400">당근 모델</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <HighlightText text={diff.phase1} query={searchQuery} />
                  </p>
                </div>

                {/* 2차 고도화 내용 */}
                <div className="p-5 bg-indigo-50/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      2차 고도화 버전 (2026.10.31)
                    </span>
                    <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                      주요 개정
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    <HighlightText text={diff.phase2} query={searchQuery} />
                  </p>
                </div>
              </div>

              {/* Legal Rationale / Compliance Note */}
              <div className="px-5 py-3 bg-amber-50/60 border-t border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-amber-950">규제 준수 및 리스크 방어 근거: </strong>
                  <HighlightText text={diff.legalImpact} query={searchQuery} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Table for Print & Admin Audit */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-indigo-600" />
          규제 당국(방통위·국세청·금감원) 점검 대비 4대 핵심 법무 체크리스트
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
            <strong className="text-slate-900 font-semibold block text-sm">1. 전자금융거래법 & 에스크로</strong>
            <p className="leading-relaxed text-slate-600">
              회사는 직접 예치금을 보관하지 않고 공인 PG사의 에스크로 가상계좌를 활용하여 무허가 선불업 리스크를 제거함. 건당 3,000원의 고정 이용료로 폭리 시비를 방지하고 제보자에게 100% 보상금 지급.
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
            <strong className="text-slate-900 font-semibold block text-sm">2. 소득세법 원천징수 면제 (5만원 기준)</strong>
            <p className="leading-relaxed text-slate-600">
              소득세법 제84조의 과세최저한(기타소득 지급건별 5만 원 이하) 기준을 준수하도록 유도하여, 회사의 복잡한 원천징수 및 지급명세서 제출 행정 부담을 합법적으로 면제함.
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
            <strong className="text-slate-900 font-semibold block text-sm">3. 자작극 방지 알고리즘 A/B 법제화</strong>
            <p className="leading-relaxed text-slate-600">
              [A] 실종 후 동일 지점 12시간 고정 감지 및 [B] 실종 전 72시간 내 제보자 단말 사전 스캔 매칭 적발 시 즉시 'HOLD' 처리하여 사기·어뷰징 방지 및 민형사 고발 근거 약관 명시.
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
            <strong className="text-slate-900 font-semibold block text-sm">4. 위치정보법 & 방통위 점검 완벽 대비</strong>
            <p className="leading-relaxed text-slate-600">
              AoA 방향각 수집 명시, 배터리 소모 고지 및 스캔 강도(절전/표준/적극) 사용자 제어권 부여, 제3자 제공 시 즉시 통보 외 30일 요약 통보 선택권 제공으로 방통위 지도점검 100% 충족.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
