import { DocCategory, DiffItem } from '../types';

export const DOC_TABS: { id: DocCategory; name: string; shortName: string }[] = [
  { id: 'doc1', name: '[붙임 1] 서비스 이용약관', shortName: '이용약관' },
  { id: 'doc2', name: '[붙임 2] 개인위치정보 수집·이용 동의', shortName: '위치수집·이용동의' },
  { id: 'doc3', name: '[붙임 3] 보호의무자 동의서', shortName: '보호의무자 동의서' },
  { id: 'doc4', name: '[붙임 4] 제3자 제공 동의서', shortName: '제3자 제공동의' },
];

export const PHASE_INFO = {
  phase1: {
    title: '1차 런칭 버전',
    date: '2026년 9월 11일',
    versionTag: '1차 런칭 (2026.09.11)',
    badge: '1:1 당근 모델 / 무상 중개',
    description: '민법상 현상광고 기반 1:1 직거래 중개 및 반려동물 B2C 초기 런칭 버전',
  },
  phase2: {
    title: '2차 고도화 버전',
    date: '2026년 10월 31일',
    versionTag: '2차 고도화 (2026.10.31)',
    badge: '에스크로 안전정산 / 건당 3천원 / AoA',
    description: 'PG 에스크로 연동, 건당 3,000원 정액 수수료, 어뷰징 탐지 A/B 알고리즘 및 AoA 기술 도입',
  },
};

export const DIFF_DATA: DiffItem[] = [
  {
    category: 'doc1',
    categoryName: '서비스 이용약관',
    topic: '보상금 거래 및 정산 구조',
    phase1: '1:1 당근 모델 (회사 보상금 미예치, 보호자-제보자 간 직접 자율 정산, 단순 정보 중개)',
    phase2: '에스크로(Escrow) 결제대금예치 시스템 도입 (PG사 안전계좌 예치, 구조 완료 시 검증 후 정산)',
    legalImpact: '전자금융거래법 상 무허가 선불업 리스크를 원천 차단하고 거래 안전성 확보',
    tag: '에스크로 도입',
  },
  {
    category: 'doc1',
    categoryName: '서비스 이용약관',
    topic: '수수료 및 플랫폼 수익 모델',
    phase1: '무상 중개 (수수료 없음, 결제 시스템 미연동)',
    phase2: '기존 30% 정률 수수료 완전 폐지 → 건당 정액 3,000원의 "안전거래 이용료"만 부과 / 제보자는 보상금 100% 전액 수령',
    legalImpact: '폭리·상업화 비판 방지 및 유기·납치 유인(자작극) 동기 억제',
    tag: '건당 3,000원 정액제',
  },
  {
    category: 'doc1',
    categoryName: '서비스 이용약관',
    topic: '세무 및 원천징수 의무 대응',
    phase1: '개인 간 직접 거래로 회사 세무 의무 없음',
    phase2: '소득세법상 기타소득 과세최저한(건당 5만 원 이하) 기준을 준수하도록 고액 보상금을 복수 기여 제보자에게 5만 원 이하로 소액 분액 정산 유도 → 원천징수 의무 면제',
    legalImpact: '지급명세서 제출 및 복잡한 원천징수 행정비용 합법적 절감',
    tag: '5만원 소액분액 유도',
  },
  {
    category: 'doc1',
    categoryName: '서비스 이용약관',
    topic: '자작극 및 어뷰징 방지',
    phase1: '기본 신뢰 기반 운영, 사후 민사 분쟁 당사자 해결',
    phase2: '알고리즘 A (실종 후 동일 지점 12시간 고정 감지) 및 알고리즘 B (실종 전 72시간 내 제보자 단말 사전 스캔 매칭) 가동 → 적발 시 "HOLD" 정산 보류 및 동결',
    legalImpact: '보상금 편취 목적의 동물 고의 유기 및 허위신고에 대한 기술적 방어권 확보',
    tag: '알고리즘 A/B 탐지',
  },
  {
    category: 'doc1',
    categoryName: '서비스 이용약관',
    topic: '제보 사진 개인정보 보호',
    phase1: '클라이언트단에서 자동 마스킹(블러) 권고',
    phase2: '단말기 클라이언트단에서 제3자 얼굴 및 차량번호판을 실시간 On-device 자동 블러 마스킹 처리 후 서버 전송 의무화',
    legalImpact: '개인정보보호법상 초상권 및 식별가능 정보 유출 위험 원천 차단',
    tag: '자동 블러 마스킹',
  },
  {
    category: 'doc2',
    categoryName: '개인위치정보 수집·이용 동의',
    topic: '수집 기술 및 측정 정밀도',
    phase1: 'GPS 좌표, 주변 BLE 비콘 RSSI 신호 강도, 기기 식별값(UUID)',
    phase2: 'GPS, BLE 6.0 스캔 데이터 외에 AoA(Angle of Arrival, 도래각/방향각) 데이터 추가 수집',
    legalImpact: '방향각 기반 센티미터급 정밀 실종견 수색 지원 및 수집 항목 명시주의 준수',
    tag: 'AoA 방향각 수집',
  },
  {
    category: 'doc2',
    categoryName: '개인위치정보 수집·이용 동의',
    topic: '배터리 소모 고지 및 사용자 제어권',
    phase1: '일반 백그라운드 수집 동의',
    phase2: '백그라운드 상시 스캔으로 인한 배터리 소모량을 정량 고지하고, 사용자가 스캔 주기 및 강도(절전/표준/적극)를 직접 수동 제어하는 UI 권장권 부여',
    legalImpact: '위치정보법 및 방통위 가이드라인상 단말기 자원 과다사용에 대한 고지의무 준수',
    tag: '스캔 강도 수동 제어',
  },
  {
    category: 'doc4',
    categoryName: '제3자 제공 동의서',
    topic: '공공기관 연동 범위',
    phase1: '인근 앱 사용자(이웃 가디언 3km), 지자체 및 유기동물 보호소',
    phase2: '인근 이웃 가디언 외에 경찰청(안전드림), 국가동물보호정보시스템(KAPIS) 및 유기동물 보호소로 제공처 확대',
    legalImpact: '국가 공공 행정망 연동을 통한 유실동물 반환율 극대화 및 목적 외 이용 방지',
    tag: 'KAPIS 및 경찰청 연동',
  },
  {
    category: 'doc4',
    categoryName: '제3자 제공 동의서',
    topic: '제3자 제공 즉시 통보 방식',
    phase1: '위치정보 제공 시 동적 앱 푸시/알림톡/이메일로 매회 즉시 실시간 통보',
    phase2: '매회 즉시 실시간 통보 기본 + 사용자가 30일 주기 요약 통보 방식으로 선택 전환할 수 있는 권한 신설',
    legalImpact: '위치정보법 제19조 제3항 단서 규정(정기 요약 통보 선택권) 충족으로 과도한 알림 피로도 경감',
    tag: '30일 요약통보 선택권',
  },
];
