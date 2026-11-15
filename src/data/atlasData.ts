import type { ProvinceInfo } from '../types/atlas';
import { PROVINCES_CENTRAL_EAST_WEST } from './provincesCentralEastWest';
import { PROVINCES_NORTH_SOUTH } from './provincesNorthSouth';
import { PROVINCES_NORTHEAST } from './provincesNortheast';

export { REGION_PATHS, REGION_CENTROIDS, projectCoord } from './thailandMapPaths';
export {
  MACRO_REGIONS,
  MACRO_REGION_ORDER,
  HISTORICAL_ERAS,
  CORRIDORS,
  LENS_OPTIONS,
  THAILAND_TRIVIA,
} from './countryConfig';
export { DYNASTY_CAPITALS, TOPONYM_ROOTS, ADMIN_TIERS } from './signatureTopic';

export const PROVINCES: ProvinceInfo[] = [
  ...PROVINCES_CENTRAL_EAST_WEST,
  ...PROVINCES_NORTH_SOUTH,
  ...PROVINCES_NORTHEAST,
];

export const PROVINCE_BY_ID: Record<string, ProvinceInfo> = Object.fromEntries(
  PROVINCES.map((p) => [p.id, p])
);

function buildRankMap(
  items: ProvinceInfo[],
  selector: (p: ProvinceInfo) => number
): Record<string, number> {
  const sorted = [...items].sort((a, b) => selector(b) - selector(a));
  const map: Record<string, number> = {};
  sorted.forEach((p, idx) => {
    map[p.id] = idx + 1;
  });
  return map;
}

export const POPULATION_RANK: Record<string, number> = buildRankMap(
  PROVINCES,
  (p) => p.populationMan
);

export const AREA_RANK: Record<string, number> = buildRankMap(
  PROVINCES,
  (p) => p.areaKm2
);

export const GDP_RANK: Record<string, number> = buildRankMap(
  PROVINCES,
  (p) => p.gdpPerCapitaUsd
);

export const COMPARE_PRESETS: {
  id: string;
  label: string;
  desc: string;
  provinceIds: string[];
}[] = [
  {
    id: 'three_hubs',
    label: '수도 · 북부 · 남부 3대 관광 거점',
    desc: '방콕 vs 치앙마이 vs 푸껫 비교',
    provinceIds: ['bangkok_metropolis', 'chiang_mai', 'phuket'],
  },
  {
    id: 'ancient_capitals',
    label: '태국 3대 고대 왕도',
    desc: '수코타이 vs 아유타야 vs 치앙마이(란나)',
    provinceIds: ['sukhothai', 'phra_nakhon_si_ayutthaya', 'chiang_mai'],
  },
  {
    id: 'economic_powerhouses',
    label: '산업·경제 3강 (BMR & EEC)',
    desc: '방콕 vs 라용(1인당 GDP 1위) vs 촌부리(파타야·램차방)',
    provinceIds: ['bangkok_metropolis', 'rayong', 'chon_buri'],
  },
  {
    id: 'isan_pillars',
    label: '이산 3대 중심 도시',
    desc: '나콘랏차시마(코랏) vs 콘깬 vs 우본랏차타니',
    provinceIds: ['nakhon_ratchasima', 'khon_kaen', 'ubon_ratchathani'],
  },
];

export function formatArea(km2: number): string {
  return `${km2.toLocaleString('ko-KR')} km²`;
}

export function formatUsd(usd: number): string {
  return `$${usd.toLocaleString('ko-KR')}`;
}
