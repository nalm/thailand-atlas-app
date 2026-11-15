import type { AdminTierRow, DynastyCapitalRow, ToponymRootRow } from '../types/atlas';

export const DYNASTY_CAPITALS: DynastyCapitalRow[] = [
  {
    eraKo: '수코타이 왕국',
    eraLocal: 'อาณาจักรสุโขทัย',
    period: '1238~1438 (약 200년)',
    capitalKo: '수코타이 (Sukhothai)',
    provinceId: 'sukhothai',
    character: '최초의 통일 타이계 왕국 · 아버지 같은 가부장적 왕정',
    legacy: '람캄행 대왕의 타이 문자 창제(1283), 상좌부 불교 국교화, 유네스코 세계문화유산 역사공원',
  },
  {
    eraKo: '란나 왕국',
    eraLocal: 'อาณาจักรล้านนา',
    period: '1292~1775 (독자 북부 왕국)',
    capitalKo: '치앙마이 (Chiang Mai)',
    provinceId: 'chiang_mai',
    character: '백만 개의 논을 뜻하는 북부 산악·분지 연맹 왕국',
    legacy: '고유 란나 문자·티크 목조 사원·칸똑 궁중요리·이펭 등불 축제 문화',
  },
  {
    eraKo: '아유타야 왕국',
    eraLocal: 'กรุงศรีอยุธยา',
    period: '1351~1767 (417년)',
    capitalKo: '아유타야 (Ayutthaya)',
    provinceId: 'phra_nakhon_si_ayutthaya',
    character: '짜오프라야강 삼각주 섬 도시 · 동남아 해상무역 제국',
    legacy: '신성왕(데바라자) 체제 확립, 왓 마하탓·왓 프라시산펫 등 웅장한 프랑(탑) 유산',
  },
  {
    eraKo: '톤부리 왕조',
    eraLocal: 'กรุงธนบุรี',
    period: '1767~1782 (15년)',
    capitalKo: '톤부리 (현 방콕 서안)',
    provinceId: 'bangkok_metropolis',
    character: '버마 침략 직후 딱신 대왕의 구국·재통일 과도기 수도',
    legacy: '왓 아룬(새벽 사원)을 왕실 사원으로 삼고 란나와 남부를 수복해 현대 태국 영토 기틀 마련',
  },
  {
    eraKo: '랏따나꼬신 왕조',
    eraLocal: 'กรุงรัตนโกสินทร์',
    period: '1782~현재',
    capitalKo: '방콕 (끄룽텝 마하나콘)',
    provinceId: 'bangkok_metropolis',
    character: '짜끄리 왕조(현 라마 10세) · 비식민지 근대화 및 현대 메가시티',
    legacy: '왕궁·왓 프라깨우 건립, 라마 5세 노예해방·철도 부설, 현대 태국의 정치·경제 중심',
  },
];

export const TOPONYM_ROOTS: ToponymRootRow[] = [
  {
    prefixKo: '나콘 (Nakhon)',
    thaiRoot: 'นคร (Nagara)',
    meaning: '도시 · 성읍 · 도읍',
    examples: '나콘랏차시마, 나콘빠톰, 나콘시탐마랏, 나콘사완, 나콘파놈, 나콘나욕',
    note: '산스크리트어 나가라(Nagara)에서 유래해 고대 왕도나 거점 도시에 붙는 가장 흔한 접두사입니다.',
  },
  {
    prefixKo: '부리 (Buri)',
    thaiRoot: 'บุรี (Puri)',
    meaning: '성곽 도시 · 요새',
    examples: '촌부리, 수판부리, 롭부리, 랏차부리, 펫차부리, 사라부리, 논타부리, 짠타부리, 싱부리',
    note: '산스크리트어 푸리(Puri)에서 왔으며, 중부·동부·서부의 유서 깊은 성읍 이름 끝에 주로 붙습니다.',
  },
  {
    prefixKo: '사뭇 (Samut)',
    thaiRoot: 'สมุทร (Samudra)',
    meaning: '바다 · 대양',
    examples: '사뭇쁘라깐(바다 요새), 사뭇사콘(바다의 강), 사뭇송크람(바다의 전쟁)',
    note: '방콕 남쪽 타이만 연안과 짜오프라야·타찐·매끌롱 강 하구에 나란히 자리한 3개 주에 쓰입니다.',
  },
  {
    prefixKo: '치앙 (Chiang)',
    thaiRoot: 'เชียง',
    meaning: '성벽으로 둘러싸인 도시 (란나어)',
    examples: '치앙마이(새 도시), 치앙라이(멍라이의 도시)',
    note: '북부 란나 문화권의 고유 접두사로, 라오스 시앙쿠앙·미얀마 켕퉁(Kengtung)과 어원이 같습니다.',
  },
  {
    prefixKo: '타니 (Thani)',
    thaiRoot: 'ธานี (Dhani)',
    meaning: '왕의 거처 · 수도',
    examples: '수랏타니(선한 백성의 도시), 우돈타니(북쪽 도시), 우본랏차타니(왕의 연꽃 도시), 빠툼타니',
    note: '왕실의 권위나 길상(吉祥)의 의미를 담아 근대·현대 행정 개편 시 명명된 경우가 많습니다.',
  },
  {
    prefixKo: '시 (Si / Sri)',
    thaiRoot: 'ศรี (Sri)',
    meaning: '영광 · 성스러움 · 길상',
    examples: '시사껫, 프라 나콘 시 아유타야, 나콘 시 탐마랏',
    note: '산스크리트어 슈리(Sri)에서 유래한 존칭 접두사로 유서 깊은 고도에 함께 쓰입니다.',
  },
];

export const ADMIN_TIERS: AdminTierRow[] = [
  {
    tier: '특별행정구 (1)',
    nameKo: '방콕 특별행정구 (BMA) · 파타야 특별시',
    nameLocal: 'กรุงเทพมหานคร (กทม.)',
    count: '1개 특별구 (+1 특별시)',
    headTitle: '직선제 방콕 시장 (ผู้ว่าราชการ)',
    description:
      '방콕은 주(짱왓)가 아닌 특별지방자치단체로 시장이 직선제로 선출되며, 하위에 50개 켓(Khet, 구)을 둡니다.',
  },
  {
    tier: '1단계 광역 (76)',
    nameKo: '짱왓 (Changwat, 주)',
    nameLocal: 'จังหวัด',
    count: '76개 주 (방콕 포함 총 77)',
    headTitle: '내무부 임명 주지사 (ผู้ว่าราชการจังหวัด)',
    description:
      '중앙정부가 파견하는 주지사가 행정을 총괄하며, 주도와 동일한 이름의 중심 군(므앙 암프)을 둡니다.',
  },
  {
    tier: '2단계 기초 (878 + 50)',
    nameKo: '암프 (Amphoe, 군) / 켓 (Khet, 구)',
    nameLocal: 'อำเภอ / เขต',
    count: '878개 암프 + 방콕 50개 켓',
    headTitle: '군수 (นายอำเภอ, 나이 암프)',
    description:
      '주민등록·치안·민원 행정의 실질적 거점입니다. 주도 소재지는 항상 "암프 므앙(Amphoe Mueang)"이라 부릅니다.',
  },
  {
    tier: '3~4단계 말단',
    nameKo: '땀본 (Tambon, 읍·면) → 무반 (Muban, 리)',
    nameLocal: 'ตำบล → หมู่บ้าน',
    count: '약 7,255개 땀본 / 75,000여 개 무반',
    headTitle: '깜난(읍면장) / 푸야이반(이장)',
    description:
      '태국 특산품 진흥 정책인 OTOP(One Tambon One Product, 일촌일품 운동)의 기준 단위가 바로 땀본입니다.',
  },
];
