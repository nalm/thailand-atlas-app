import type {
  CorridorMeta,
  HistoricalEraMeta,
  Lens,
  MacroRegionId,
  MacroRegionMeta,
  TriviaCard,
} from '../types/atlas';

export const MACRO_REGIONS: Record<MacroRegionId, MacroRegionMeta> = {
  central: {
    id: 'central',
    nameKo: '중부 평야',
    nameEn: 'Central Thailand',
    nameLocal: 'ภาคกลาง',
    color: '#4F46E5',
    softBg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    badge: 'bg-indigo-100 text-indigo-800',
    summary:
      '짜오프라야강 충적 평야를 중심으로 수코타이·아유타야·톤부리·방콕으로 이어지는 태국 왕조와 정치·경제의 심장부입니다.',
    keyIdentity: '왕도 심장부 · 짜오프라야 삼각주 · 방콕 메가시티',
  },
  north: {
    id: 'north',
    nameKo: '북부 산악',
    nameEn: 'Northern Thailand',
    nameLocal: 'ภาคเหนือ',
    color: '#059669',
    softBg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-800',
    summary:
      '히말라야 지맥과 도이 인타논이 솟은 고산 지대이자, 독자적 문자와 건축을 꽃피운 란나(Lanna) 왕국의 본향입니다.',
    keyIdentity: '란나 왕국 문화권 · 고산 커피·차 · 골든 트라이앵글',
  },
  northeast: {
    id: 'northeast',
    nameKo: '북동부 이산',
    nameEn: 'Northeastern (Isan)',
    nameLocal: 'ภาคตะวันออกเฉียงเหนือ (อีสาน)',
    color: '#D97706',
    softBg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-800',
    summary:
      '코랏 고원과 메콩강 유역을 아우르는 태국 최대 면적·인구 권역으로, 크메르 석조 사원과 솜땀·라오계 문화가 어우러집니다.',
    keyIdentity: '코랏 고원 · 메콩강 국경 · 크메르 유적 · 이산 미식',
  },
  east: {
    id: 'east',
    nameKo: '동부 연안',
    nameEn: 'Eastern Thailand',
    nameLocal: 'ภาคตะวันออก',
    color: '#0284C7',
    softBg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-700',
    badge: 'bg-sky-100 text-sky-800',
    summary:
      '동부경제회랑(EEC)과 램차방 심해항이 자리한 태국 최대 제조·수출 전진기지이자, 파타야·꼬창의 휴양지입니다.',
    keyIdentity: 'EEC 동부경제회랑 · 자동차·석유화학 · 램차방 항만',
  },
  west: {
    id: 'west',
    nameKo: '서부 산간',
    nameEn: 'Western Thailand',
    nameLocal: 'ภาคตะวันตก',
    color: '#7C3AED',
    softBg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-700',
    badge: 'bg-violet-100 text-violet-800',
    summary:
      '테나세림 산맥을 따라 미얀마와 접하며, 콰이강의 다리 역사 현장과 후아힌 왕실 휴양지, 깽끄라찬 숲을 품고 있습니다.',
    keyIdentity: '테나세림 산맥 · 죽음의 철도 · 왕실 휴양지 후아힌',
  },
  south: {
    id: 'south',
    nameKo: '남부 반도',
    nameEn: 'Southern Thailand',
    nameLocal: 'ภาคใต้',
    color: '#E11D48',
    softBg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    badge: 'bg-rose-100 text-rose-800',
    summary:
      '안다만해와 타이만을 가르는 말레이 반도로, 천혜의 섬 관광(푸껫·끄라비·사무이)과 천연고무·해상무역·이슬람 문화가 공존합니다.',
    keyIdentity: '안다만-타이만 해양벨트 · 주석·고무 · 스리위자야 유산',
  },
};

export const MACRO_REGION_ORDER: MacroRegionId[] = [
  'central',
  'north',
  'northeast',
  'east',
  'west',
  'south',
];

export const HISTORICAL_ERAS: HistoricalEraMeta[] = [
  {
    id: 'dvaravati_khmer',
    nameKo: '드바라바티·크메르·스리위자야',
    period: '6~13세기',
    capital: '나콘빠톰 · 롭부리 · 차이야',
    color: '#7C3AED',
    summary:
      '타이족 남하 이전 중부의 몬족 드바라바티 불교 문명, 이산·중부의 크메르 제국 전초기지(피마이·파놈룽), 남부의 해상왕국 스리위자야가 공존했습니다.',
    keyProvinces: ['nakhon_pathom', 'lop_buri', 'nakhon_ratchasima', 'buri_ram', 'surat_thani'],
  },
  {
    id: 'lanna_sukhothai',
    nameKo: '란나 · 수코타이 왕조',
    period: '1238~1438',
    capital: '치앙마이 · 수코타이',
    color: '#059669',
    summary:
      '북부에서는 멍라이 왕이 치앙마이를 중심으로 란나 왕국을, 중북부에서는 람캄행 대왕이 한글과 닮은 타이 문자를 창제한 수코타이 왕국을 열었습니다.',
    keyProvinces: ['sukhothai', 'chiang_mai', 'chiang_rai', 'kamphaeng_phet', 'nan'],
  },
  {
    id: 'ayutthaya',
    nameKo: '아유타야 왕국 (417년)',
    period: '1351~1767',
    capital: '프라 나콘 시 아유타야',
    color: '#D97706',
    summary:
      '짜오프라야강 삼각주 섬 도시에 세워진 국제 해상무역 대국으로, 417년간 동남아의 패권을 누리며 유럽·일본·조선과도 간접 교류했습니다.',
    keyProvinces: ['phra_nakhon_si_ayutthaya', 'suphan_buri', 'phitsanulok', 'kanchanaburi', 'nakhon_si_thammarat'],
  },
  {
    id: 'thonburi',
    nameKo: '톤부리 왕조 (딱신 대왕)',
    period: '1767~1782',
    capital: '톤부리 (현 방콕 서안)',
    color: '#0284C7',
    summary:
      '버마(꼰바웅 왕조)의 침략으로 아유타야가 함락된 직후 딱신 대왕이 짠타부리에서 거병해 나라를 재통일하고 15년간 수도를 톤부리에 두었습니다.',
    keyProvinces: ['bangkok_metropolis', 'chanthaburi', 'tak', 'ratchaburi'],
  },
  {
    id: 'rattanakosin',
    nameKo: '랏따나꼬신 (짜끄리) 왕조',
    period: '1782~현재',
    capital: '방콕 (끄룽텝 마하나콘)',
    color: '#4F46E5',
    summary:
      '라마 1세가 수도를 짜오프라야강 동쪽 방콕으로 옮긴 이래 라마 4·5세의 근대화 개혁으로 동남아 유일의 비식민지 독립국을 지켜냈습니다.',
    keyProvinces: ['bangkok_metropolis', 'samut_prakan', 'chon_buri', 'phetchaburi', 'prachuap_khiri_khan'],
  },
];

export const CORRIDORS: CorridorMeta[] = [
  {
    id: 'bmr',
    nameKo: '방콕 수도권 메가시티 (BMR)',
    code: 'BMR',
    color: '#4F46E5',
    summary: '방콕과 5개 위성 주(논타부리·빠툼타니·사뭇쁘라깐·사뭇사콘·나콘빠톰)가 이루는 인구 1,700만+ 경제 중추',
    provinces: ['bangkok_metropolis', 'nonthaburi', 'pathum_thani', 'samut_prakan', 'samut_sakhon', 'nakhon_pathom'],
  },
  {
    id: 'eec',
    nameKo: '동부경제회랑 (EEC)',
    code: 'EEC',
    color: '#0284C7',
    summary: '차층사오·촌부리·라용 3개 주를 잇는 태국 차세대 첨단 제조·전기차·항공·심해항(램차방·마따풋) 벨트',
    provinces: ['chachoengsao', 'chon_buri', 'rayong'],
  },
  {
    id: 'north_rail',
    nameKo: '북부 란나·고속철 회랑',
    code: 'NORTH',
    color: '#059669',
    summary: '방콕-아유타야-나콘사완-핏사눌록-람빵-치앙마이로 이어지는 종단 간선 철도 및 북부 경제축',
    provinces: ['phra_nakhon_si_ayutthaya', 'nakhon_sawan', 'phitsanulok', 'lampang', 'lamphun', 'chiang_mai', 'chiang_rai'],
  },
  {
    id: 'isan_highspeed',
    nameKo: '이산·메콩 국제철도 회랑',
    code: 'ISAN',
    color: '#D97706',
    summary: '방콕-사라부리-나콘랏차시마-콘깬-우돈타니-농카이(라오스·중국 연결) 고속철도 및 메콩 교역축',
    provinces: ['saraburi', 'nakhon_ratchasima', 'khon_kaen', 'udon_thani', 'nong_khai', 'ubon_ratchathani'],
  },
  {
    id: 'south_maritime',
    nameKo: '남부 안다만-타이만 해양벨트',
    code: 'SOUTH',
    color: '#E11D48',
    summary: '춤폰 랜드브리지 구상부터 수랏타니·푸껫·끄라비·송클라(핫야이)를 잇는 남부 해양관광·고무·물류축',
    provinces: ['chumphon', 'surat_thani', 'phuket', 'krabi', 'phangnga', 'nakhon_si_thammarat', 'songkhla'],
  },
];

export const LENS_OPTIONS: {
  id: Lens;
  label: string;
  shortDesc: string;
  badgeColor: string;
}[] = [
  {
    id: 'none',
    label: '6대 권역 기본도',
    shortDesc: '태국 공식 6대 지리 권역과 77개 주 행정 경계',
    badgeColor: 'bg-slate-800 text-white',
  },
  {
    id: 'dynasty',
    label: '왕조·역사 수도',
    shortDesc: '란나·수코타이·아유타야·톤부리·방콕 왕도 및 역사 거점',
    badgeColor: 'bg-amber-600 text-white',
  },
  {
    id: 'corridors',
    label: '경제·철도 회랑',
    shortDesc: 'BMR 수도권, EEC 동부경제회랑, 북부·이산·남부 핵심 축',
    badgeColor: 'bg-sky-600 text-white',
  },
  {
    id: 'heritage',
    label: '유네스코·불교유산',
    shortDesc: '유네스코 세계문화·자연유산 보유 주와 대표 사원·국립공원',
    badgeColor: 'bg-emerald-600 text-white',
  },
  {
    id: 'korea',
    label: '한국-태국 인연',
    shortDesc: '6·25 참전, K-팝 태국인 멤버 고향, 한국 기업·교민 거점',
    badgeColor: 'bg-rose-600 text-white',
  },
];

export const THAILAND_TRIVIA: TriviaCard[] = [
  {
    title: '방콕의 정식 명칭은 기네스북 세계 최장 도시명',
    subtitle: '끄룽텝 마하나콘 ... 168글자',
    detail:
      '태국인은 방콕을 "방콕"이라 부르지 않고 "끄룽텝(천사의 도시)"이라 부릅니다. 1782년 라마 1세가 명명한 풀네임은 로마자 168자 이상으로 세계에서 가장 긴 지명으로 기네스북에 등재되어 있습니다.',
  },
  {
    title: '76개 주 + 1개 특별행정구 = 총 77개 지방 단위',
    subtitle: '방콕은 "짱왓(주)"이 아니다',
    detail:
      '태국은 흔히 77개 주라고 부르지만 엄밀히는 76개 짱왓(Changwat)과 1개 특별행정구(방콕, BMA)로 구성됩니다. 2011년 농카이에서 분리된 븡깐(Bueng Kan)이 가장 최근에 탄생한 77번째 주입니다.',
  },
  {
    title: '동남아시아 유일의 비식민지 독립국 (무앙 타이)',
    subtitle: '영국(미얀마·말레이)과 프랑스(인도차이나) 사이의 완충국',
    detail:
      '19세기 라마 4세와 라마 5세의 정교한 균형 외교와 근대화 개혁 덕분에 주변 모든 국가가 서구 열강의 식민지가 되는 동안에도 주권을 유지했습니다. 국호 "타이(Thai)"는 "자유"를 뜻합니다.',
  },
  {
    title: '한국전쟁에 파병한 아시아 최초의 우방국 중 하나',
    subtitle: '파병 기념비와 21연대 "작은 호랑이" 부대',
    detail:
      '1950년 태국은 유엔군으로 육·해·공군 연인원 6,300여 명을 파병했습니다. 촌부리 사타힙 해군기지와 포천 태국군 참전비 등 양국의 혈맹 역사가 오늘날 한류와 경제 협력으로 이어지고 있습니다.',
  },
];
