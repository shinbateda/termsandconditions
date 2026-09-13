import React, { useState } from 'react';
import { DocCategory } from '../types';
import { DOC_TABS, PHASE_INFO } from '../data/legalDocs';
import { HighlightText } from './HighlightText';
import {
  Copy,
  Check,
  Calendar,
  Sparkles,
  Info,
  ShieldCheck,
  FileSignature,
  Download,
  AlertCircle
} from 'lucide-react';

interface DocViewerProps {
  phase: 'phase1' | 'phase2';
  activeDoc: DocCategory;
  onSelectDoc: (doc: DocCategory) => void;
  searchQuery: string;
  fontSize: 'sm' | 'base' | 'lg';
}

export const DocViewer: React.FC<DocViewerProps> = ({
  phase,
  activeDoc,
  onSelectDoc,
  searchQuery,
  fontSize,
}) => {
  const [copied, setCopied] = useState(false);
  
  // Interactive Simulation State for Form/Consent testing
  const [agreedItems, setAgreedItems] = useState<Record<string, boolean>>({
    'p1-loc-agree': false,
    'p1-3rd-agree': false,
    'p2-loc-agree': false,
    'p2-3rd-agree': false,
  });

  // Simulated Guardian Form input
  const [guardianForm, setGuardianForm] = useState({
    wardName: '홍길동',
    wardBirth: '2020-05-15',
    wardType: '8세 이하 아동',
    guardianName: '김영희',
    guardianPhone: '010-1234-5678',
    guardianRelation: '모(어머니)',
    signDate: '2026-09-13',
  });

  const [notificationType, setNotificationType] = useState<'immediate' | 'summary30'>('immediate');
  const [scanIntensity, setScanIntensity] = useState<'saving' | 'standard' | 'active'>('standard');

  const phaseMeta = PHASE_INFO[phase];

  const fontSizeClasses = {
    sm: 'text-xs leading-relaxed',
    base: 'text-sm leading-relaxed',
    lg: 'text-base leading-relaxed',
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAgreement = (key: string) => {
    setAgreedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Phase Banner Information */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border shadow-xs transition-all ${
          phase === 'phase1'
            ? 'bg-slate-900 text-white border-slate-800'
            : 'bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white border-indigo-900/50'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  phase === 'phase1'
                    ? 'bg-slate-700 text-slate-200'
                    : 'bg-indigo-500 text-white shadow-xs'
                }`}
              >
                {phaseMeta.title}
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> 시행일자: {phaseMeta.date}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{phaseMeta.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${
                phase === 'phase1'
                  ? 'bg-slate-800 text-indigo-300 border-slate-700'
                  : 'bg-indigo-900/80 text-emerald-300 border-indigo-700'
              }`}
            >
              {phaseMeta.badge}
            </span>
          </div>
        </div>
      </div>

      {/* Sub Tabs: Doc 1 to Doc 4 */}
      <div className="flex flex-wrap gap-2 print:hidden">
        {DOC_TABS.map((tab) => (
          <button
            key={tab.id}
            id={`subtab-${tab.id}`}
            onClick={() => onSelectDoc(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeDoc === tab.id
                ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 shadow-2xs'
            }`}
          >
            <span>{tab.name}</span>
            {phase === 'phase2' && (tab.id === 'doc1' || tab.id === 'doc2' || tab.id === 'doc4') && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                  activeDoc === tab.id ? 'bg-indigo-500 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                고도화
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Document Content Container */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
        {/* =========================================================================
            PHASE 1: 1차 런칭 버전 (2026.09.11)
            ========================================================================= */}
        {phase === 'phase1' && (
          <div className="divide-y divide-slate-100">
            {/* P1 - DOC 1: 서비스 이용약관 */}
            {activeDoc === 'doc1' && (
              <div id="p1-doc1" className={`p-6 sm:p-10 ${fontSizeClasses[fontSize]}`}>
                {/* Header of Doc */}
                <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        [1차] LostFindUs 서비스 이용약관 (붙임 1)
                      </h2>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        1차 런칭
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">적용일자: 2026년 9월 11일 | 소관: 주식회사 아이티에스뱅크</p>
                  </div>
                  <button
                    id="copy-p1-doc1-btn"
                    onClick={() => handleCopyText(document.getElementById('p1-doc1-body')?.innerText || '')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? '복사 완료!' : '전문 복사'}</span>
                  </button>
                </div>

                {/* Article Body */}
                <div id="p1-doc1-body" className="space-y-6 text-slate-700">
                  <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs text-indigo-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5 text-indigo-950">
                      <Info className="w-4 h-4 text-indigo-600" /> [1차 버전 핵심 운영 모델]
                    </p>
                    <p>
                      1차 런칭 버전은 <strong>1:1 당근 모델(무상 중개)</strong>을 채택하여 회사가 보상금을 직접 수납하거나 예치하지 않습니다.
                      민법 제675조 현상광고 법리를 기초로 하여 소유주(보호자)와 발견 제보자 간 직접 자율 정산 방식으로 운영됩니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제1조 (목적)</h3>
                    <p>
                      <HighlightText
                        text="본 약관은 주식회사 아이티에스뱅크(이하 '회사')가 제공하는 반려동물 실종 예방 및 공동 탐색 B2C 서비스인 'LostFindUs'(이하 '서비스')를 이용함에 있어, 회사와 회원 간의 권리, 의무, 책임사항 및 이용 조건을 규정함을 목적으로 합니다."
                        query={searchQuery}
                      />
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제2조 (용어의 정의)</h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>
                        <HighlightText
                          text="'서비스'라 함은 회사가 안심칩(BLE 비콘) 및 LostFindUs 어플리케이션을 통해 제공하는 실시간 위치 확인, 안심구역 이탈 알림, 실종/분실 신고 및 이웃 간 공동 수색 네트워크 서비스를 의미합니다."
                          query={searchQuery}
                        />
                      </li>
                      <li>
                        <HighlightText
                          text="'회원'이라 함은 본 약관에 동의하고 서비스를 이용하는 고객으로서, 반려동물을 등록하고 찾기 요청을 발령하는 '보호자'와 주변 안심칩 신호를 검지하여 제보하는 '제보자'(이웃 가디언)를 포함합니다."
                          query={searchQuery}
                        />
                      </li>
                      <li>
                        <HighlightText
                          text="'1:1 당근 모델'이라 함은 1차 버전에서 회사가 보상금을 예치받지 않고, 보호자와 제보자가 자율적으로 1:1 직접 연락하여 보상 및 인계를 진행하는 무상 중개 모델을 말합니다."
                          query={searchQuery}
                        />
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      제3조 (회사의 지위 및 책임 제한 - 현상광고 프레임)
                    </h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>
                        <HighlightText
                          text="회사가 서비스 화면을 통해 중개하는 보호자의 보상금 제시는 민법 제675조에 따른 '현상광고' 계약에 해당하며, 계약 당사자는 소유주(보호자)와 목격 제보자입니다."
                          query={searchQuery}
                        />
                      </li>
                      <li>
                        <HighlightText
                          text="회사는 '통신판매중개자' 및 '거래 증명자(Witness & Verifier)'로서 정보 중계 플랫폼만을 제공하며, 보호자와 제보자 간의 보상 대금 지급 불이행이나 사적 분쟁에 대해 책임을 지지 않습니다."
                          query={searchQuery}
                        />
                      </li>
                      <li>
                        <HighlightText
                          text="복수 제보 발생 시 보수의 분배는 민법상 법정 원칙인 '최초 결정적 제보자 우선'을 기본값으로 지정합니다."
                          query={searchQuery}
                        />
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      제4조 (1차 서비스 범위 - 반려동물 B2C 한정)
                    </h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>
                        <HighlightText
                          text="1차 런칭 서비스는 사물위치정보 규제 완화를 받는 민간 반려동물(개·고양이 등)에만 한정하여 제공됩니다."
                          query={searchQuery}
                        />
                      </li>
                      <li>
                        <HighlightText
                          text="사람(배회노인, 발달장애인, 아동) 대상 서비스는 모바일 앱 UI에서 전면 배제되며, 해당 공공영역 관제는 서버 웹(Admin Web)에서 별도 이원화 관리됩니다."
                          query={searchQuery}
                        />
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      제5조 (제보자 행동 원칙 및 동물 점유 금지)
                    </h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>
                        <HighlightText
                          text="발견 제보자는 길거리에서 유실 동물을 목격한 경우 점유이탈물횡령 등 민·형사상 분쟁을 예방하기 위하여 동물을 임의로 이동시키거나 보호(점유)하지 않고 발견 위치와 사진만 제보해야 합니다."
                          query={searchQuery}
                        />
                      </li>
                      <li>
                        <HighlightText
                          text="제보 사진 등록 시 타인의 초상권 및 차량번호판 유출을 방지하기 위해 단말기 클라이언트단에서 자동으로 마스킹(블러) 처리합니다."
                          query={searchQuery}
                        />
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제6조 (보상 및 게이미피케이션 정책)</h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>
                        <HighlightText
                          text="1차 버전에서는 현금성 결제 시스템이 연동되지 않으며, 환금성 리워드를 완전히 배제합니다."
                          query={searchQuery}
                        />
                      </li>
                      <li>
                        <HighlightText
                          text="자발적 참여 독려를 위해 수색 기여 누적 통계에 기반한 '연남동 안심 파수꾼', '명예 구조견' 등 디지털 배지 및 성취 등급 시스템을 제공합니다."
                          query={searchQuery}
                        />
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제7조 (미성년 제보자 및 약관 개정)</h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>
                        <HighlightText
                          text="만 14세 미만 미성년 제보자는 현금성 거래 대상에서 원천 배제되며 명예 배지 트랙으로만 참여합니다."
                          query={searchQuery}
                        />
                      </li>
                      <li>
                        <HighlightText text="본 약관은 2026년 9월 11일부터 효력이 발생합니다." query={searchQuery} />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* P1 - DOC 2: 개인위치정보 수집·이용 동의 */}
            {activeDoc === 'doc2' && (
              <div id="p1-doc2" className={`p-6 sm:p-10 ${fontSizeClasses[fontSize]}`}>
                <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        [1차] 개인위치정보 수집·이용 동의서 (붙임 2)
                      </h2>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        1차 런칭
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      적용일자: 2026년 9월 11일 | 근거법령: 위치정보의 보호 및 이용 등에 관한 법률
                    </p>
                  </div>
                  <button
                    id="copy-p1-doc2-btn"
                    onClick={() => handleCopyText(document.getElementById('p1-doc2-body')?.innerText || '')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? '복사 완료!' : '전문 복사'}</span>
                  </button>
                </div>

                <div id="p1-doc2-body" className="space-y-6 text-slate-700">
                  <p className="leading-relaxed">
                    주식회사 아이티에스뱅크(이하 '회사')는 「위치정보의 보호 및 이용 등에 관한 법률」에 따라 사용자의 개인위치정보를 수집 및 이용합니다.
                  </p>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제1조 (위치정보 수집·이용 목적)</h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>실시간 반려동물 지도 동선 매핑 및 좌표 시각화 서비스 제공</li>
                      <li>등록 반려동물의 안심구역(Geo-fence) 이탈 및 복귀 실시간 푸시 알림</li>
                      <li>백그라운드 BLE 상시 수집기를 활용한 인근 실종 반려동물 안심칩 검지 및 자동 제보 보고</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제2조 (수집 항목 및 방법)</h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>
                        <strong>수집 항목:</strong> 모바일 기기의 GPS 좌표, 주변 BLE 안심칩 비콘 수신 데이터 및 RSSI 신호 강도, 기기 식별값(UUID)
                      </li>
                      <li>
                        <strong>수집 방법:</strong> 어플리케이션 실행 중 및 백그라운드 상태에서 운영체제 권한 획득 후 자동 수집
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제3조 (보유·이용기간 및 데이터 보안)</h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>목적 달성 또는 동의 철회 시 개인위치정보는 즉시 영구 파기합니다.</li>
                      <li>위치정보법 제16조 제2항에 의거 '수집·이용·제공사실 확인자료'는 5년간 분리 보관합니다.</li>
                      <li>모든 데이터는 국외 이전을 금지하며 AWS 서울 리전(Seoul Region) 내 AES-256 암호화 DB에 한정 보존됩니다.</li>
                    </ul>
                  </div>

                  {/* Legal Table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden mt-6 shadow-2xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="p-3.5 font-bold text-slate-800 w-1/2">동의 항목</th>
                          <th className="p-3.5 font-bold text-slate-800 text-center w-1/4">필수 여부</th>
                          <th className="p-3.5 font-bold text-slate-800 text-center w-1/4">동의 처리</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-slate-50/50">
                          <td className="p-3.5 font-semibold text-slate-900">
                            개인위치정보 수집·이용 동의
                            <span className="block text-xs font-normal text-slate-500 mt-0.5">
                              (GPS, BLE 비콘 검지, 안심구역 이탈 알림)
                            </span>
                          </td>
                          <td className="p-3.5 text-center font-bold text-rose-600">필수 동의</td>
                          <td className="p-3.5 text-center">
                            <label className="inline-flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                id="chk-p1-loc-agree"
                                checked={agreedItems['p1-loc-agree']}
                                onChange={() => toggleAgreement('p1-loc-agree')}
                                className="w-4 h-4 rounded-sm text-indigo-600 focus:ring-indigo-500 border-slate-300"
                              />
                              <span className="text-xs font-medium text-slate-800">
                                {agreedItems['p1-loc-agree'] ? '[ 동의함 ]' : '[ 동의안함 ]'}
                              </span>
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* P1 - DOC 3: 보호의무자 동의서 */}
            {activeDoc === 'doc3' && (
              <div id="p1-doc3" className={`p-6 sm:p-10 ${fontSizeClasses[fontSize]}`}>
                <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        [1차] 보호의무자 동의서 (붙임 3)
                      </h2>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        법정 표준 서식
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      적용일자: 2026년 9월 11일 | 근거법령: 위치정보의 보호 및 이용 등에 관한 법률 제26조
                    </p>
                  </div>
                  <button
                    id="copy-p1-doc3-btn"
                    onClick={() => handleCopyText(document.getElementById('p1-doc3-body')?.innerText || '')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? '복사 완료!' : '전문 복사'}</span>
                  </button>
                </div>

                <div id="p1-doc3-body" className="space-y-6 text-slate-700">
                  <div className="text-xs bg-slate-50 p-3.5 rounded-xl text-slate-600 border border-slate-200 leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>
                      ※ 본 동의서는 주식회사 아이티에스뱅크가 위치정보법상 개인위치정보사업자/위치기반서비스사업자 등록 규정을 충족하기 위해 구비한 법정 필수 표준 서식입니다.
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">1. 피보호자 및 보호의무자 정보</h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <tbody>
                        <tr className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                          <th className="p-3 w-1/3">피보호자 정보 (위치주체)</th>
                          <th className="p-3 w-1/3">인적사항 (생년월일)</th>
                          <th className="p-3 w-1/3">세부 구분</th>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="p-3 font-medium text-slate-900">[피보호자 성명]</td>
                          <td className="p-3 text-slate-600">[YYYY-MM-DD]</td>
                          <td className="p-3 text-slate-700 leading-relaxed">
                            [ ] 8세 이하 아동<br />[ ] 피성년후견인<br />[ ] 정신장애인
                          </td>
                        </tr>
                        <tr className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                          <th className="p-3">보호의무자 성명</th>
                          <th className="p-3">연 락 처</th>
                          <th className="p-3">피보호자와의 관계</th>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-900">[보호의무자 성명]</td>
                          <td className="p-3 text-slate-600">[010-0000-0000]</td>
                          <td className="p-3 text-slate-700">[예: 부, 모, 법정후견인]</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-base font-bold text-slate-900 mb-2">2. 동의 내용 및 첨부 서류</h3>
                    <p className="leading-relaxed">
                      본인은 정당한 보호의무자로서 피보호자의 생명·신체 보호를 위하여 위치정보 수집·이용 및 제3자 제공에 동의하며, 자격 증빙 서류(가족관계증명서 또는 주민등록등본 1부)를 제출합니다.
                    </p>
                  </div>

                  <div className="mt-8 text-right p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <p className="text-slate-700">2026년 &nbsp;&nbsp;&nbsp;월 &nbsp;&nbsp;&nbsp;일</p>
                    <p className="text-slate-800 font-medium">
                      보호의무자 성명: <span className="inline-block w-36 border-b border-slate-400"></span> (서명 또는 인)
                    </p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 pt-2">
                      주식회사 아이티에스뱅크 귀중
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* P1 - DOC 4: 제3자 제공 동의서 */}
            {activeDoc === 'doc4' && (
              <div id="p1-doc4" className={`p-6 sm:p-10 ${fontSizeClasses[fontSize]}`}>
                <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        [1차] 개인(위치)정보 제3자 제공 동의서 (붙임 4)
                      </h2>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        1차 런칭
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      적용일자: 2026년 9월 11일 | 근거법령: 위치정보법 제19조 (제3자 제공 통보 의무)
                    </p>
                  </div>
                  <button
                    id="copy-p1-doc4-btn"
                    onClick={() => handleCopyText(document.getElementById('p1-doc4-body')?.innerText || '')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? '복사 완료!' : '전문 복사'}</span>
                  </button>
                </div>

                <div id="p1-doc4-body" className="space-y-6 text-slate-700">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제1조 (제3자 제공 정책)</h3>
                    <p className="leading-relaxed">
                      회사는 보호자가 앱 상에서 능동적으로 '실종 신고(긴급찾기요청)'를 발령한 경우에 한하여 실종 탐색 목적으로 제3자에게 위치정보를 제공합니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제2조 (위치공유 발생 시 즉시 통보)</h3>
                    <p className="leading-relaxed">
                      위치정보법 제19조 제3항에 따라 제3자에게 위치정보가 제공된 경우 동적 앱 푸시, 카카오 알림톡, 이메일을 통해 제공받는 자, 일시, 목적을 매회 즉시 실시간 통보합니다.
                    </p>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 mt-6">■ 제3자 제공 내역</h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                        <tr>
                          <th className="p-3 w-1/4">제공받는 자</th>
                          <th className="p-3 w-1/4">제공 목적</th>
                          <th className="p-3 w-1/4">제공 항목</th>
                          <th className="p-3 w-1/4">보유 및 이용기간</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold text-slate-900">
                            인근 앱 사용자<br />(이웃 가디언)
                          </td>
                          <td className="p-3 text-slate-700">주변 3km 수색망 형성 및 목격 제보 작성 지원</td>
                          <td className="p-3 text-slate-700">반려동물 사진/이름, 실종 위치 GPS, 안심칩 UUID</td>
                          <td className="p-3 text-slate-700">구조 완료 시 즉시 파기</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold text-slate-900">
                            지자체 및<br />유기동물 보호소
                          </td>
                          <td className="p-3 text-slate-700">KAPIS 유기동물 보호망 연동 및 소유주 반환 조율</td>
                          <td className="p-3 text-slate-700">안심칩 식별번호, 실종 등록번호, 최종 위치</td>
                          <td className="p-3 text-slate-700">행정 반환 처리 즉시 파기 (감사로그 5년)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 mt-6">■ 동의 확인</h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                        <tr>
                          <th className="p-3 w-1/2">동의 항목</th>
                          <th className="p-3 text-center w-1/4">필수 여부</th>
                          <th className="p-3 text-center w-1/4">동의 여부</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-3.5 font-semibold text-slate-900">
                            실종 반려동물 구조를 위한 위치정보 제3자 제공 동의
                          </td>
                          <td className="p-3.5 text-center font-bold text-rose-600">필수 동의</td>
                          <td className="p-3.5 text-center">
                            <label className="inline-flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                id="chk-p1-3rd-agree"
                                checked={agreedItems['p1-3rd-agree']}
                                onChange={() => toggleAgreement('p1-3rd-agree')}
                                className="w-4 h-4 rounded-sm text-indigo-600 focus:ring-indigo-500 border-slate-300"
                              />
                              <span className="text-xs font-medium text-slate-800">
                                {agreedItems['p1-3rd-agree'] ? '[ 동의함 ]' : '[ 동의안함 ]'}
                              </span>
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            PHASE 2: 2차 고도화 버전 (2026.10.31)
            ========================================================================= */}
        {phase === 'phase2' && (
          <div className="divide-y divide-slate-100">
            {/* P2 - DOC 1: 서비스 이용약관 (고도화) */}
            {activeDoc === 'doc1' && (
              <div id="p2-doc1" className={`p-6 sm:p-10 ${fontSizeClasses[fontSize]}`}>
                <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        [2차] LostFindUs 서비스 이용약관 (붙임 1)
                      </h2>
                      <span className="bg-indigo-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-2xs">
                        고도화 적용
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      적용일자: 2026년 10월 31일 | 소관: 주식회사 아이티에스뱅크 | 개정구분: 에스크로·정액제·소액분액
                    </p>
                  </div>
                  <button
                    id="copy-p2-doc1-btn"
                    onClick={() => handleCopyText(document.getElementById('p2-doc1-body')?.innerText || '')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? '복사 완료!' : '전문 복사'}</span>
                  </button>
                </div>

                <div id="p2-doc1-body" className="space-y-6 text-slate-700">
                  {/* Highlight Callout */}
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <Sparkles className="w-4 h-4 text-emerald-600" /> [2차 고도화 4대 개정 핵심]
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-emerald-800">
                      <li>
                        <strong>에스크로 결제대금예치:</strong> PG사 안전계좌 연동 및 회사는 비콘 거래 증명자(Witness & Verifier)로 지위 확립.
                      </li>
                      <li>
                        <strong>건당 정액 3,000원 이용료:</strong> 기존 논란이 있던 30% 수수료를 전면 폐지하고 제보자에게 보상금 100% 지급.
                      </li>
                      <li>
                        <strong>소득세법 5만원 이하 분할:</strong> 기타소득 과세최저한 준수로 원천징수 행정 의무 합법적 면제.
                      </li>
                      <li>
                        <strong>자작극 방지 알고리즘 A/B:</strong> 12시간 고정 비콘 및 72시간 내 사전 스캔 탐지 시 정산 즉시 동결(HOLD).
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제1조 (목적)</h3>
                    <p>
                      본 약관은 주식회사 아이티에스뱅크(이하 '회사')가 제공하는 반려동물 실종 예방,{' '}
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded-sm">
                        에스크로 안전 정산
                      </span>{' '}
                      및 공동 탐색 B2C 서비스인 'LostFindUs'(이하 '서비스')의 이용 조건을 규정함을 목적으로 합니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제2조 (용어의 정의)</h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>
                        <span className="font-bold text-slate-900">'에스크로(Escrow) 결제대금예치'</span>라 함은 보호자가 예치한 보상금을 PG사 명의의 에스크로 계좌에 보관하고 구조 완료 시 정산하는 안전 거래 시스템을 말합니다.
                      </li>
                      <li>
                        <span className="font-bold text-slate-900">'안전거래 이용료'</span>라 함은 에스크로 연동 및 자작극 탐지 시스템 운영 비용으로 보호자가 예치 결제 시 별도 납부하는{' '}
                        <span className="text-indigo-700 font-bold bg-indigo-50 px-1 py-0.5 rounded-sm">
                          건당 정액 3,000원의 서비스 이용료
                        </span>
                        를 말하며, 기존 30% 정률 수수료는 완전히 폐지됩니다.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      제3조 (회사의 지위 - 거래 증명자 지위 명시)
                    </h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>
                        보호자의 보상금 제시는 민법상 '현상광고' 계약에 해당하며, 회사는 직접 자금을 보관하지 않는 '통신판매중개자' 및 비콘 신호 무결성을 입증하는 '거래 증명자(Witness & Verifier)' 지위를 갖습니다.
                      </li>
                      <li>
                        회사는 30% 수수료를 차감하지 않으며,{' '}
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded-sm">
                          제보자는 보호자가 예치한 보상금 100% 전액을 정산
                        </span>
                        받습니다.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      제4조 (소득세법 세무 및 소액 분배 유도 정책)
                    </h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>제보 보상금은 소득세법상 '기타소득'에 해당합니다.</li>
                      <li>
                        회사는 기타소득 과세최저한 기준인{' '}
                        <span className="font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded-sm">
                          '지급 건별 5만 원 이하' 요건
                        </span>
                        을 준수하기 위해 고액 보상금을 복수의 기여 제보자들에게 5만 원 이하로 소액 분액 정산하도록 유도함으로써 원천징수 의무를 면제받습니다.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      제5조 (미성년 제보자 현금 정산 제외 특칙)
                    </h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>만 14세 미만 미성년 제보자는 현금 에스크로 정산 대상에서 원천 배제됩니다.</li>
                      <li>
                        미성년 기여자는 현금 정산 대신 디지털 명예 배지 및 지역 상권 제휴 굿즈/쿠폰 교환 트랙으로 우회 연동됩니다.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      제6조 (어뷰징 대응 및 자작극 탐지 알고리즘 A/B 연동)
                    </h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>
                        회사는 자작극(Staged Loss) 적발을 위해{' '}
                        <span className="font-semibold text-slate-900 bg-slate-100 px-1 py-0.5 rounded-sm">
                          [알고리즘 A] 실종 후 비콘 동일 지점 12시간 고정 감지
                        </span>{' '}
                        및{' '}
                        <span className="font-semibold text-slate-900 bg-slate-100 px-1 py-0.5 rounded-sm">
                          [알고리즘 B] 실종 전 72시간 내 제보자 단말의 사전 스캔 매칭
                        </span>
                        을 가동합니다.
                      </li>
                      <li>
                        알고리즘 A/B 적발 시 해당 케이스는 즉시{' '}
                        <strong className="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-sm">
                          'HOLD'(정산 보류)
                        </strong>{' '}
                        처리되며 에스크로 대금 인출이 자동 동결됩니다.
                      </li>
                      <li>
                        보호자의 악의적 허위신고 시에도 타 스캐너 수신 이력을 대조하여 양방향 교차 검증을 수행합니다.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      제7조 (제보자 점유 금지 및 사진 마스킹)
                    </h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>제보자는 동물을 임의로 이동·보호하지 않고 위치만 제보해야 합니다.</li>
                      <li>
                        제보 사진은 클라이언트단에서 제3자 얼굴 및 차량번호판을{' '}
                        <span className="font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded-sm">
                          자동 블러 마스킹
                        </span>{' '}
                        처리 후 서버로 전송합니다.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제8조 (시행일)</h3>
                    <p>본 약관은 2026년 10월 31일부터 시행됩니다.</p>
                  </div>
                </div>
              </div>
            )}

            {/* P2 - DOC 2: 개인위치정보 수집·이용 동의 (고도화) */}
            {activeDoc === 'doc2' && (
              <div id="p2-doc2" className={`p-6 sm:p-10 ${fontSizeClasses[fontSize]}`}>
                <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        [2차] 개인위치정보 수집·이용 동의서 (붙임 2)
                      </h2>
                      <span className="bg-indigo-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-2xs">
                        AoA & 배터리 제어
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      적용일자: 2026년 10월 31일 | 근거법령: 위치정보법 및 방송통신위원회 기술 가이드라인
                    </p>
                  </div>
                  <button
                    id="copy-p2-doc2-btn"
                    onClick={() => handleCopyText(document.getElementById('p2-doc2-body')?.innerText || '')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? '복사 완료!' : '전문 복사'}</span>
                  </button>
                </div>

                <div id="p2-doc2-body" className="space-y-6 text-slate-700">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      제1조 (수집 항목 및 고도화 기술)
                    </h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>
                        <strong>수집 항목:</strong> 스마트폰 GPS 좌표, BLE 6.0 안심칩 스캔 데이터,{' '}
                        <span className="font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded-sm">
                          AoA(Angle of Arrival) 수신 신호 강도(RSSI) 및 방향각 데이터
                        </span>
                        , 단말기 UUID
                      </li>
                      <li>
                        <strong>수집 방법:</strong> 모바일 앱 실행 및 백그라운드 상시 수집 모드 연동
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      제2조 (배터리 고지 및 사용자 스캔 강도 제어권)
                    </h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>백그라운드 BLE 상시 스캔으로 인한 배터리 소모량을 정량 고지합니다.</li>
                      <li>
                        사용자가 직접 스캔 작동 주기 및{' '}
                        <span className="font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded-sm">
                          강도(절전/표준/적극)를 자유롭게 수동 선택 제어
                        </span>
                        할 수 있는 UI 권한을 보장합니다.
                      </li>
                    </ul>

                    {/* Interactive Simulator for Scan Intensity */}
                    <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">
                          [앱 UI 구현 예시] 사용자 스캔 강도 제어권 설정:
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          현재 설정: {scanIntensity === 'saving' ? '절전(15분 주기)' : scanIntensity === 'standard' ? '표준(5분 주기)' : '적극(실시간 1분)'}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          id="scan-saving-btn"
                          onClick={() => setScanIntensity('saving')}
                          className={`py-1.5 px-2 text-xs rounded-lg font-medium transition-colors ${
                            scanIntensity === 'saving'
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          절전 모드 (배터리 0.5%/일)
                        </button>
                        <button
                          type="button"
                          id="scan-standard-btn"
                          onClick={() => setScanIntensity('standard')}
                          className={`py-1.5 px-2 text-xs rounded-lg font-medium transition-colors ${
                            scanIntensity === 'standard'
                              ? 'bg-indigo-600 text-white shadow-2xs'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          표준 모드 (배터리 1.5%/일)
                        </button>
                        <button
                          type="button"
                          id="scan-active-btn"
                          onClick={() => setScanIntensity('active')}
                          className={`py-1.5 px-2 text-xs rounded-lg font-medium transition-colors ${
                            scanIntensity === 'active'
                              ? 'bg-amber-600 text-white shadow-2xs'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          적극 수색 모드 (3%/일)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">제3조 (데이터 보안 및 보유기간)</h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>데이터 국외 이전을 금지하고 AWS 서울 리전 내 AES-256 암호화 저장소에 보존합니다.</li>
                      <li>수집·이용·제공사실 확인자료는 위치정보법 제16조에 따라 5년간 보존 후 자동 파기합니다.</li>
                    </ul>
                  </div>

                  {/* Table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden mt-6 shadow-2xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="p-3.5 font-bold text-slate-800 w-1/2">동의 항목</th>
                          <th className="p-3.5 font-bold text-slate-800 text-center w-1/4">필수 여부</th>
                          <th className="p-3.5 font-bold text-slate-800 text-center w-1/4">동의 처리</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-slate-50/50">
                          <td className="p-3.5 font-semibold text-slate-900">
                            개인위치정보 수집·이용 동의
                            <span className="block text-xs font-normal text-indigo-700 mt-0.5">
                              (AoA 방향각 수집 및 배터리 제어권 보장 포함)
                            </span>
                          </td>
                          <td className="p-3.5 text-center font-bold text-rose-600">필수 동의</td>
                          <td className="p-3.5 text-center">
                            <label className="inline-flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                id="chk-p2-loc-agree"
                                checked={agreedItems['p2-loc-agree']}
                                onChange={() => toggleAgreement('p2-loc-agree')}
                                className="w-4 h-4 rounded-sm text-indigo-600 focus:ring-indigo-500 border-slate-300"
                              />
                              <span className="text-xs font-medium text-slate-800">
                                {agreedItems['p2-loc-agree'] ? '[ 동의함 ]' : '[ 동의안함 ]'}
                              </span>
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* P2 - DOC 3: 보호의무자 동의서 (고도화) */}
            {activeDoc === 'doc3' && (
              <div id="p2-doc3" className={`p-6 sm:p-10 ${fontSizeClasses[fontSize]}`}>
                <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        [2차] 보호의무자 동의서 (붙임 3)
                      </h2>
                      <span className="bg-indigo-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-2xs">
                        방통위 표준 서식
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      적용일자: 2026년 10월 31일 | 방송통신위원회 개인위치정보사업 지도점검 표준 서식
                    </p>
                  </div>
                  <button
                    id="copy-p2-doc3-btn"
                    onClick={() => handleCopyText(document.getElementById('p2-doc3-body')?.innerText || '')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? '복사 완료!' : '전문 복사'}</span>
                  </button>
                </div>

                <div id="p2-doc3-body" className="space-y-6 text-slate-700">
                  <div className="text-xs bg-slate-50 p-3.5 rounded-xl text-slate-600 border border-slate-200 leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>
                      ※ 본 동의서는 방송통신위원회의 개인위치정보사업 지도점검 규정을 충족하기 위한 법정 필수 표준 서식입니다.
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">1. 피보호자 및 보호의무자 정보</h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <tbody>
                        <tr className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                          <th className="p-3 w-1/3">피보호자 정보</th>
                          <th className="p-3 w-1/3">인적사항</th>
                          <th className="p-3 w-1/3">구분</th>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="p-3 font-medium text-slate-900">[피보호자 성명]</td>
                          <td className="p-3 text-slate-600">[YYYY-MM-DD]</td>
                          <td className="p-3 text-slate-700 leading-relaxed">
                            [ ] 8세 이하 아동<br />[ ] 피성년후견인<br />[ ] 정신장애인
                          </td>
                        </tr>
                        <tr className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                          <th className="p-3">보호의무자 성명</th>
                          <th className="p-3">연 락 처</th>
                          <th className="p-3">피보호자와의 관계</th>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-900">[보호의무자 성명]</td>
                          <td className="p-3 text-slate-600">[010-0000-0000]</td>
                          <td className="p-3 text-slate-700">[예: 부, 모, 법정후견인]</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-base font-bold text-slate-900 mb-2">2. 동의 내용 및 증빙 서류</h3>
                    <p className="leading-relaxed">
                      본인은 법정 보호의무자로서 피보호자의 생명·신체 보호를 위한 위치 수집·이용·제3자 제공에 동의하며 증빙 서류(가족관계증명서 1부)를 첨부합니다.
                    </p>
                  </div>

                  {/* Interactive Fill Simulator */}
                  <div className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-100 text-xs space-y-3 print:hidden">
                    <p className="font-bold text-indigo-950 flex items-center gap-1.5">
                      <FileSignature className="w-4 h-4 text-indigo-600" /> [양식 미리보기 입력 테스트]
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">피보호자 성명</label>
                        <input
                          type="text"
                          value={guardianForm.wardName}
                          onChange={(e) => setGuardianForm({ ...guardianForm, wardName: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">보호의무자 성명</label>
                        <input
                          type="text"
                          value={guardianForm.guardianName}
                          onChange={(e) => setGuardianForm({ ...guardianForm, guardianName: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">피보호자와의 관계</label>
                        <input
                          type="text"
                          value={guardianForm.guardianRelation}
                          onChange={(e) => setGuardianForm({ ...guardianForm, guardianRelation: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-right p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <p className="text-slate-700">2026년 &nbsp;&nbsp;&nbsp;월 &nbsp;&nbsp;&nbsp;일</p>
                    <p className="text-slate-800 font-medium">
                      보호의무자 성명: <span className="inline-block px-3 font-bold text-slate-900 border-b border-slate-400">{guardianForm.guardianName || '________________'}</span> (서명 또는 인)
                    </p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 pt-2">
                      주식회사 아이티에스뱅크 귀중
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* P2 - DOC 4: 제3자 제공 동의서 (고도화) */}
            {activeDoc === 'doc4' && (
              <div id="p2-doc4" className={`p-6 sm:p-10 ${fontSizeClasses[fontSize]}`}>
                <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        [2차] 개인(위치)정보 제3자 제공 동의서 (붙임 4)
                      </h2>
                      <span className="bg-indigo-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-2xs">
                        KAPIS 연동 & 30일 요약
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      적용일자: 2026년 10월 31일 | 근거법령: 위치정보법 제19조 제3항 단서 (요약 통보 선택권)
                    </p>
                  </div>
                  <button
                    id="copy-p2-doc4-btn"
                    onClick={() => handleCopyText(document.getElementById('p2-doc4-body')?.innerText || '')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? '복사 완료!' : '전문 복사'}</span>
                  </button>
                </div>

                <div id="p2-doc4-body" className="space-y-6 text-slate-700">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      제1조 (제3자 제공 및 KAPIS 연동)
                    </h3>
                    <p className="leading-relaxed">
                      보호자의 '실종 신고(긴급찾기요청)' 발령 시 주변 가디언 수색망, 경찰청 안전드림 및{' '}
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded-sm">
                        국가동물보호정보시스템(KAPIS)
                      </span>
                      에 실종 위치 정보가 제공됩니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      제2조 (통보 시스템 및 30일 요약 통보 선택권)
                    </h3>
                    <ul className="list-decimal pl-5 space-y-2">
                      <li>제3자에게 위치 제공 시 동적 앱 푸시/알림톡/이메일로 매회 즉시 실시간 통보합니다.</li>
                      <li>
                        사용자는 매회 즉시 통보 외에{' '}
                        <span className="font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded-sm">
                          30일 주기 요약 통보 방식
                        </span>
                        으로 선택 전환할 수 있습니다.
                      </li>
                    </ul>

                    {/* Interactive Selector for Notification Choice */}
                    <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-xs font-bold text-slate-700 block">
                        [위치정보법 제19조 준수 UI 시뮬레이션] 제3자 제공 통보 방식 선택:
                      </span>
                      <div className="flex flex-wrap gap-3">
                        <label className="inline-flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-slate-200">
                          <input
                            type="radio"
                            name="notif-choice"
                            checked={notificationType === 'immediate'}
                            onChange={() => setNotificationType('immediate')}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-xs font-medium text-slate-800">
                            매회 즉시 실시간 통보 (기본값)
                          </span>
                        </label>
                        <label className="inline-flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-slate-200">
                          <input
                            type="radio"
                            name="notif-choice"
                            checked={notificationType === 'summary30'}
                            onChange={() => setNotificationType('summary30')}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-xs font-medium text-slate-800">
                            30일 주기 요약 통보 (알림 피로 경감)
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 mt-6">■ 제3자 제공 내역</h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                        <tr>
                          <th className="p-3 w-1/4">제공받는 자</th>
                          <th className="p-3 w-1/4">제공 목적</th>
                          <th className="p-3 w-1/4">제공 항목</th>
                          <th className="p-3 w-1/4">보유 및 이용기간</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold text-slate-900">
                            인근 앱 사용자<br />(이웃 가디언)
                          </td>
                          <td className="p-3 text-slate-700">주변 3km 수색망 형성 및 목격 제보 작성 지원</td>
                          <td className="p-3 text-slate-700">
                            반려동물 사진, 실종 GPS,{' '}
                            <span className="font-bold text-indigo-700">AoA 좌표</span>, 안심칩 UUID
                          </td>
                          <td className="p-3 text-slate-700">구조 완료 시 즉시 파기</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold text-slate-900">
                            경찰청, KAPIS 및<br />유기동물 보호소
                          </td>
                          <td className="p-3 text-slate-700">공공 데이터 연동, 지자체 관제 대조 및 소유주 인계</td>
                          <td className="p-3 text-slate-700">안심칩 ID, 동물 등록번호, 최종 검지 시각/위치</td>
                          <td className="p-3 text-slate-700">행정 반환 시 즉시 파기 (감사로그 5년)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 mt-6">■ 동의 확인</h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                        <tr>
                          <th className="p-3 w-1/2">동의 항목</th>
                          <th className="p-3 text-center w-1/4">필수 여부</th>
                          <th className="p-3 text-center w-1/4">동의 여부</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-3.5 font-semibold text-slate-900">
                            실종 반려동물 구조 및 KAPIS 연동을 위한 제3자 제공 동의
                          </td>
                          <td className="p-3.5 text-center font-bold text-rose-600">필수 동의</td>
                          <td className="p-3.5 text-center">
                            <label className="inline-flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                id="chk-p2-3rd-agree"
                                checked={agreedItems['p2-3rd-agree']}
                                onChange={() => toggleAgreement('p2-3rd-agree')}
                                className="w-4 h-4 rounded-sm text-indigo-600 focus:ring-indigo-500 border-slate-300"
                              />
                              <span className="text-xs font-medium text-slate-800">
                                {agreedItems['p2-3rd-agree'] ? '[ 동의함 ]' : '[ 동의안함 ]'}
                              </span>
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
