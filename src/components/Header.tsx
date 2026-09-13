import React from 'react';
import { PhaseId } from '../types';
import { Search, Printer, FileText, GitCompare, Shield, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentPhase: PhaseId;
  onSelectPhase: (phase: PhaseId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  fontSize: 'sm' | 'base' | 'lg';
  onChangeFontSize: (size: 'sm' | 'base' | 'lg') => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPhase,
  onSelectPhase,
  searchQuery,
  onSearchChange,
  fontSize,
  onChangeFontSize,
  onPrint,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs print:hidden">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-sm">
                LF
              </span>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  LostFindUs 시스템 약관 뷰어
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 hidden sm:inline-flex items-center gap-1">
                    <Shield className="w-3 h-3" /> B2C 반려동물 전용
                  </span>
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-0.5 flex items-center gap-2">
                  <span>주식회사 아이티에스뱅크</span>
                  <span className="text-slate-300">•</span>
                  <span>1차(런칭) / 2차(고도화) 통합 관리자 열람 & 규제 준수 검토용</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Utility Tools */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                id="search-input"
                placeholder="조항, 키워드 검색 (예: 에스크로, AoA)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Font Size Selector */}
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-medium text-slate-600">
              <button
                id="font-size-sm-btn"
                onClick={() => onChangeFontSize('sm')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  fontSize === 'sm' ? 'bg-white text-indigo-600 shadow-xs font-semibold' : 'hover:text-slate-900'
                }`}
                title="작은 글자"
              >
                A-
              </button>
              <button
                id="font-size-base-btn"
                onClick={() => onChangeFontSize('base')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  fontSize === 'base' ? 'bg-white text-indigo-600 shadow-xs font-semibold' : 'hover:text-slate-900'
                }`}
                title="기본 글자"
              >
                A
              </button>
              <button
                id="font-size-lg-btn"
                onClick={() => onChangeFontSize('lg')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  fontSize === 'lg' ? 'bg-white text-indigo-600 shadow-xs font-semibold' : 'hover:text-slate-900'
                }`}
                title="큰 글자"
              >
                A+
              </button>
            </div>

            {/* Print Button */}
            <button
              id="print-action-btn"
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-xs transition-colors"
              title="약관 인쇄 및 PDF 저장"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">인쇄/출력</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Phase Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-none" aria-label="Version Tabs">
          <button
            id="tab-phase1"
            onClick={() => onSelectPhase('phase1')}
            className={`flex items-center gap-2 whitespace-nowrap px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              currentPhase === 'phase1'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>1차 런칭 버전 (2026.09.11)</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                currentPhase === 'phase1' ? 'bg-indigo-500/80 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              1:1 당근 모델
            </span>
          </button>

          <button
            id="tab-phase2"
            onClick={() => onSelectPhase('phase2')}
            className={`flex items-center gap-2 whitespace-nowrap px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              currentPhase === 'phase2'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>2차 고도화 버전 (2026.10.31)</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                currentPhase === 'phase2' ? 'bg-indigo-500/80 text-white' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              에스크로·3,000원
            </span>
          </button>

          <button
            id="tab-compare"
            onClick={() => onSelectPhase('compare')}
            className={`flex items-center gap-2 whitespace-nowrap px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              currentPhase === 'compare'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-amber-700 hover:text-amber-900 hover:bg-amber-50'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>1차 vs 2차 개정 비교표 (Diff)</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                currentPhase === 'compare' ? 'bg-amber-700/80 text-white' : 'bg-amber-100 text-amber-800'
              }`}
            >
              법무 검토
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
