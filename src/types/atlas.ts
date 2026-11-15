export type MacroRegionId =
  | 'north'
  | 'northeast'
  | 'central'
  | 'east'
  | 'west'
  | 'south';

export type Lens = 'none' | 'dynasty' | 'corridors' | 'heritage' | 'korea';

export type KoreanHistoryCategory =
  | '6·25 참전'
  | '한류·문화'
  | '경제·산업'
  | '한인·교류'
  | '역사·자연유산';

export interface KoreanHistoryLink {
  category: KoreanHistoryCategory;
  title: string;
  year: string;
  description: string;
}

export interface CityItem {
  id: string;
  nameKo: string;
  nameEn: string;
  role: 'capital_largest' | 'capital' | 'major';
  populationMan: number;
  populationText: string;
  coord: [number, number]; // [lng, lat]
  note: string;
  landmarks?: string[];
}

export interface ProvinceInfo {
  id: string; // matches REGION_PATHS key in thailandMapPaths.ts (e.g. 'bangkok_metropolis', 'chiang_mai')
  code: string; // ISO 3166-2:TH or short display code (e.g. 'BKK', 'CNX')
  nameKo: string;
  shortNameKo: string;
  nameEn: string;
  nameLocal: string; // Thai script
  regionId: MacroRegionId;
  type: '특별시(BMA)' | '주(짱왓)';
  nicknameKo: string;
  slogan: string;
  capitalKo: string;
  capitalEn: string;
  capitalPopText: string;
  largestCityKo: string;
  largestCityEn: string;
  largestCityPopText: string;
  isCapitalLargest: boolean;
  highlightStory: string;
  coord: [number, number]; // [lng, lat]
  populationMan: number;
  populationText: string;
  areaKm2: number;
  gdpPerCapitaUsd: number;
  specialMetricLabel: string;
  specialMetricValue: number; // Amphoe / Khet count
  dynastyTag?: string; // For dynasty lens highlighting
  hasUnesco?: boolean;
  corridors: string[];
  cities: CityItem[];
  historicalRoleSummary: string;
  historicalEvents: { era: string; title: string; detail: string }[];
  famousPeople: {
    name: string;
    nameEn: string;
    era: string;
    role: string;
    connectionType: string;
    description: string;
  }[];
  characteristicsSummary: string;
  keyIndustries: string[];
  landmarks: string[];
  nationalParksAndHeritage?: string[];
  specialtyAndCulture: string[];
  koreanHistory?: KoreanHistoryLink[];
}

export interface MacroRegionMeta {
  id: MacroRegionId;
  nameKo: string;
  nameEn: string;
  nameLocal: string;
  color: string;
  softBg: string;
  border: string;
  text: string;
  badge: string;
  summary: string;
  keyIdentity: string;
}

export interface HistoricalEraMeta {
  id: string;
  nameKo: string;
  period: string;
  capital: string;
  color: string;
  summary: string;
  keyProvinces: string[];
}

export interface CorridorMeta {
  id: string;
  nameKo: string;
  code: string;
  color: string;
  summary: string;
  provinces: string[];
}

export interface DynastyCapitalRow {
  eraKo: string;
  eraLocal: string;
  period: string;
  capitalKo: string;
  provinceId: string;
  character: string;
  legacy: string;
}

export interface ToponymRootRow {
  prefixKo: string;
  thaiRoot: string;
  meaning: string;
  examples: string;
  note: string;
}

export interface AdminTierRow {
  tier: string;
  nameKo: string;
  nameLocal: string;
  count: string;
  headTitle: string;
  description: string;
}

export interface TriviaCard {
  title: string;
  subtitle: string;
  detail: string;
}
