import React, { useState } from 'react';
import { PhaseId, DocCategory } from './types';
import { Header } from './components/Header';
import { DocViewer } from './components/DocViewer';
import { ComparisonViewer } from './components/ComparisonViewer';
import { RegulatorySummary } from './components/RegulatorySummary';
import { Shield, Building2, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentPhase, setCurrentPhase] = useState<PhaseId>('phase1');
  const [activeDoc, setActiveDoc] = useState<DocCategory>('doc1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        currentPhase={currentPhase}
        onSelectPhase={setCurrentPhase}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        onPrint={handlePrint}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-8">
        {currentPhase === 'compare' ? (
          <ComparisonViewer searchQuery={searchQuery} />
        ) : (
          <DocViewer
            phase={currentPhase}
            activeDoc={activeDoc}
            onSelectDoc={setActiveDoc}
            searchQuery={searchQuery}
            fontSize={fontSize}
          />
        )}

        {/* Regulatory & Compliance Summary Card */}
        <RegulatorySummary />
      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8 text-slate-500 text-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-600" /> 주식회사 아이티에스뱅크 (ITS Bank Co., Ltd.)
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-medium">LostFindUs 약관 통합 시스템</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span>위치정보관리책임자: CISO / 법무팀</span>
              <span>•</span>
              <span>개인위치정보사업 등록번호: 제2026-서울-0000호</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-400">
            <p>
              본 시스템은 방송통신위원회 위치정보법 및 전자금융거래법 점검 대비 1차(2026.09.11) 및 2차(2026.10.31) 약관 및 동의서 표준 열람용 웹 서비스입니다.
            </p>
            <p className="shrink-0">
              © 2026 ITS Bank Co., Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
