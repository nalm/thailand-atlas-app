import React, { useMemo, useRef, useState } from 'react';
import {
  Compass,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  CORRIDORS,
  LENS_OPTIONS,
  MACRO_REGION_ORDER,
  MACRO_REGIONS,
  PROVINCE_BY_ID,
  PROVINCES,
  REGION_CENTROIDS,
  REGION_PATHS,
  projectCoord,
} from '../data/atlasData';
import type { Lens, MacroRegionId, ProvinceInfo } from '../types/atlas';

interface CountryMapProps {
  selectedProvinceId: string;
  selectedCityId: string | null;
  activeRegionFilter: MacroRegionId | 'all';
  activeLens: Lens;
  onSelectProvince: (id: string, cityId?: string) => void;
  onRegionFilterChange: (region: MacroRegionId | 'all') => void;
}

const BMR_IDS = new Set([
  'bangkok_metropolis',
  'nonthaburi',
  'pathum_thani',
  'samut_prakan',
  'samut_sakhon',
  'nakhon_pathom',
  'samut_songkhram',
]);

const KEY_MARKER_IDS = new Set([
  'bangkok_metropolis',
  'chiang_mai',
  'chiang_rai',
  'phra_nakhon_si_ayutthaya',
  'sukhothai',
  'chon_buri',
  'rayong',
  'kanchanaburi',
  'prachuap_khiri_khan',
  'phuket',
  'krabi',
  'surat_thani',
  'songkhla',
  'nakhon_ratchasima',
  'khon_kaen',
  'udon_thani',
  'ubon_ratchathani',
  'buri_ram',
  'nong_khai',
  'loei',
]);

export const CountryMap: React.FC<CountryMapProps> = ({
  selectedProvinceId,
  selectedCityId,
  activeRegionFilter,
  activeLens,
  onSelectProvince,
  onRegionFilterChange,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hudCollapsed, setHudCollapsed] = useState(false);
  const [showAllMarkers, setShowAllMarkers] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  const hoveredProvince = hoveredId ? PROVINCE_BY_ID[hoveredId] : null;
  const activeLensMeta = LENS_OPTIONS.find((l) => l.id === activeLens) ?? LENS_OPTIONS[0];

  const getFillColor = (p: ProvinceInfo): string => {
    const regionColor = MACRO_REGIONS[p.regionId].color;
    const isDimmedByRegion = activeRegionFilter !== 'all' && p.regionId !== activeRegionFilter;

    if (isDimmedByRegion) {
      return '#E2E8F0';
    }

    if (activeLens === 'dynasty') {
      if (p.dynastyTag) return '#D97706';
      return '#F1F5F9';
    }
    if (activeLens === 'corridors') {
      if (p.corridors.includes('eec')) return '#0284C7';
      if (p.corridors.includes('bmr')) return '#4F46E5';
      if (p.corridors.includes('north_rail')) return '#059669';
      if (p.corridors.includes('isan_highspeed')) return '#D97706';
      if (p.corridors.includes('south_maritime')) return '#E11D48';
      return '#F1F5F9';
    }
    if (activeLens === 'heritage') {
      if (p.hasUnesco) return '#059669';
      if (p.landmarks.length >= 3) return '#6EE7B7';
      return '#F1F5F9';
    }
    if (activeLens === 'korea') {
      if (p.koreanHistory && p.koreanHistory.length > 0) return '#E11D48';
      return '#F1F5F9';
    }
    return regionColor;
  };

  const getFillOpacity = (p: ProvinceInfo): number => {
    if (activeRegionFilter !== 'all' && p.regionId !== activeRegionFilter) return 0.45;
    if (p.id === selectedProvinceId) return 0.95;
    if (p.id === hoveredId) return 0.85;
    if (activeLens !== 'none') {
      const hex = getFillColor(p);
      return hex === '#F1F5F9' ? 0.7 : 0.8;
    }
    return 0.68;
  };

  const markerProvinces = useMemo(() => {
    return PROVINCES.filter((p) => {
      if (activeRegionFilter !== 'all' && p.regionId !== activeRegionFilter) return false;
      if (showAllMarkers) return true;
      return KEY_MARKER_IDS.has(p.id) || p.id === selectedProvinceId;
    });
  }, [activeRegionFilter, showAllMarkers, selectedProvinceId]);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = (e.clientX - dragStartRef.current.x) / zoom;
    const dy = (e.clientY - dragStartRef.current.y) / zoom;
    setPan({
      x: Math.max(-280, Math.min(280, dragStartRef.current.panX + dx)),
      y: Math.max(-220, Math.min(220, dragStartRef.current.panY + dy)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // BMR Inset center around Bangkok [451, 315] in SVG coords
  // Scale 2.6x inside box x=22..252, y=235..445
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-sky-50/70 via-white to-slate-50 shadow-sm">
      {/* Top-left collapsible HUD */}
      <div className="pointer-events-auto absolute left-3 top-3 z-20 max-w-[270px] rounded-xl border border-slate-200/90 bg-white/90 p-3 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-900">태국 77개 주 인터랙티브 지도</span>
          </div>
          <button
            type="button"
            onClick={() => setHudCollapsed((v) => !v)}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            title={hudCollapsed ? '패널 펼치기' : '패널 접기'}
          >
            {hudCollapsed ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
        {!hudCollapsed && (
          <div className="mt-2 space-y-1.5 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold ${activeLensMeta.badgeColor}`}>
                {activeLensMeta.label}
              </span>
            </div>
            <p className="leading-relaxed">{activeLensMeta.shortDesc}</p>
            <p className="text-[10px] text-slate-400">
              주(짱왓) 또는 도시 마커를 클릭하면 하단 상세 리포트가 열립니다.
            </p>
          </div>
        )}
      </div>

      {/* Top-center Hover Tooltip */}
      {hoveredProvince && (
        <div className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-xl border border-slate-200 bg-slate-900/95 px-3.5 py-2 text-white shadow-lg backdrop-blur">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: MACRO_REGIONS[hoveredProvince.regionId].color }}
            />
            <span className="text-sm font-bold">{hoveredProvince.nameKo}</span>
            <span className="text-xs text-slate-300">{hoveredProvince.nameLocal}</span>
            <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] font-medium text-slate-200">
              {MACRO_REGIONS[hoveredProvince.regionId].nameKo}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-300">
            <span>인구 {hoveredProvince.populationText}</span>
            <span>·</span>
            <span>면적 {hoveredProvince.areaKm2.toLocaleString('ko-KR')} km²</span>
            <span>·</span>
            <span>1인당 GPP ${hoveredProvince.gdpPerCapitaUsd.toLocaleString('ko-KR')}</span>
          </div>
        </div>
      )}

      {/* Top-right Controls */}
      <div className="pointer-events-auto absolute right-3 top-3 z-20 flex flex-col items-end gap-2">
        <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white/90 p-1 shadow-sm backdrop-blur">
          <button
            type="button"
            onClick={() => setShowAllMarkers((v) => !v)}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
              showAllMarkers ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
            title="마커 표시 밀도 전환"
          >
            {showAllMarkers ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            <span>{showAllMarkers ? '전체 77개' : '주요 거점'}</span>
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white/90 p-1 shadow-sm backdrop-blur">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(4, +(z + 0.5).toFixed(1)))}
            className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-100"
            title="확대"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <span className="min-w-[36px] text-center text-xs font-semibold text-slate-600">
            {zoom.toFixed(1)}x
          </span>
          <button
            type="button"
            onClick={() => {
              const next = Math.max(1, +(zoom - 0.5).toFixed(1));
              setZoom(next);
              if (next === 1) setPan({ x: 0, y: 0 });
            }}
            className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-100"
            title="축소"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          {zoom > 1 && (
            <button
              type="button"
              onClick={resetView}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              title="화면 초기화"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main SVG Canvas */}
      <svg
        viewBox="0 0 1000 680"
        className={`h-[480px] w-full select-none sm:h-[560px] lg:h-[620px] ${
          zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          <clipPath id="bmr-inset-clip">
            <rect x="24" y="242" width="224" height="196" rx="12" />
          </clipPath>
        </defs>

        {/* Sea / Neighboring subtle labels */}
        <text x="690" y="455" className="fill-sky-300/80 text-[13px] font-semibold tracking-widest">
          타이만 (Gulf of Thailand)
        </text>
        <text x="275" y="555" className="fill-sky-300/80 text-[12px] font-semibold tracking-wider">
          안다만해 (Andaman Sea)
        </text>

        <g
          transform={`translate(500, 340) scale(${zoom}) translate(${-500 + pan.x}, ${-340 + pan.y})`}
        >
          {/* 77 Province Polygons */}
          {PROVINCES.map((p) => {
            const d = REGION_PATHS[p.id];
            if (!d) return null;
            const isSelected = p.id === selectedProvinceId;
            const isHovered = p.id === hoveredId;

            return (
              <path
                key={p.id}
                d={d}
                fill={getFillColor(p)}
                fillOpacity={getFillOpacity(p)}
                stroke={isSelected ? '#0F172A' : isHovered ? '#1E293B' : '#FFFFFF'}
                strokeWidth={isSelected ? 1.8 / zoom : isHovered ? 1.3 / zoom : 0.7 / zoom}
                className="cursor-pointer transition-colors duration-150"
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId((prev) => (prev === p.id ? null : prev))}
                onClick={() => onSelectProvince(p.id)}
              />
            );
          })}

          {/* Corridor Overlay Lines when corridors lens is active */}
          {activeLens === 'corridors' &&
            CORRIDORS.map((c) => {
              const pts = c.provinces
                .map((pid) => PROVINCE_BY_ID[pid])
                .filter(Boolean)
                .map((p) => projectCoord(p.coord));
              if (pts.length < 2) return null;
              const pathD = pts.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt[0]},${pt[1]}`).join(' ');
              return (
                <path
                  key={c.id}
                  d={pathD}
                  fill="none"
                  stroke={c.color}
                  strokeWidth={2.5 / zoom}
                  strokeDasharray={`${5 / zoom} ${3 / zoom}`}
                  strokeOpacity={0.75}
                  className="pointer-events-none"
                />
              );
            })}

          {/* City / Province Markers */}
          {markerProvinces.map((p) => {
            const [cx, cy] = REGION_CENTROIDS[p.id] ?? projectCoord(p.coord);
            const isSelected = p.id === selectedProvinceId;
            const isBangkok = p.id === 'bangkok_metropolis';
            if (BMR_IDS.has(p.id) && !isBangkok && !isSelected && !showAllMarkers) return null;

            return (
              <g
                key={`marker-${p.id}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId((prev) => (prev === p.id ? null : prev))}
                onClick={() => onSelectProvince(p.id)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={(isBangkok ? 5.5 : isSelected ? 4.8 : 3.2) / zoom}
                  fill={isBangkok ? '#EF4444' : isSelected ? '#0F172A' : '#FFFFFF'}
                  stroke={isBangkok ? '#FFFFFF' : '#0F172A'}
                  strokeWidth={1.3 / zoom}
                />
                {(isSelected || KEY_MARKER_IDS.has(p.id)) && (
                  <text
                    x={cx}
                    y={cy - (isBangkok ? 8 : 6.5) / zoom}
                    textAnchor="middle"
                    fontSize={10 / zoom}
                    fontWeight={isSelected || isBangkok ? 700 : 600}
                    fill="#0F172A"
                    stroke="#FFFFFF"
                    strokeWidth={2.4 / zoom}
                    paintOrder="stroke"
                    className="pointer-events-none select-none"
                  >
                    {p.shortNameKo}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Bangkok Metropolitan Region (BMR) Inset Box (Empty left Andaman area) */}
        <g className="pointer-events-auto">
          <rect
            x="24"
            y="242"
            width="224"
            height="196"
            rx="12"
            fill="#FFFFFF"
            fillOpacity="0.93"
            stroke="#CBD5E1"
            strokeWidth="1.2"
          />
          <g clipPath="url(#bmr-inset-clip)">
            <g transform="translate(136, 344) scale(3.2) translate(-450, -315)">
              {PROVINCES.filter((p) => BMR_IDS.has(p.id)).map((p) => {
                const d = REGION_PATHS[p.id];
                if (!d) return null;
                const isSelected = p.id === selectedProvinceId;
                return (
                  <path
                    key={`inset-${p.id}`}
                    d={d}
                    fill={getFillColor(p)}
                    fillOpacity={isSelected ? 0.95 : 0.72}
                    stroke={isSelected ? '#0F172A' : '#FFFFFF'}
                    strokeWidth={isSelected ? 0.7 : 0.35}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredId(p.id)}
                    onMouseLeave={() => setHoveredId((prev) => (prev === p.id ? null : prev))}
                    onClick={() => onSelectProvince(p.id)}
                  />
                );
              })}
              {PROVINCES.filter((p) => BMR_IDS.has(p.id)).map((p) => {
                const [cx, cy] = REGION_CENTROIDS[p.id] ?? projectCoord(p.coord);
                const isSelected = p.id === selectedProvinceId;
                return (
                  <g
                    key={`inset-lbl-${p.id}`}
                    className="cursor-pointer"
                    onClick={() => onSelectProvince(p.id)}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={p.id === 'bangkok_metropolis' ? 1.5 : 1.1}
                      fill={p.id === 'bangkok_metropolis' ? '#EF4444' : '#0F172A'}
                    />
                    <text
                      x={cx}
                      y={cy - 1.8}
                      textAnchor="middle"
                      fontSize="3.1"
                      fontWeight={isSelected ? 800 : 600}
                      fill="#0F172A"
                      stroke="#FFFFFF"
                      strokeWidth="0.7"
                      paintOrder="stroke"
                    >
                      {p.shortNameKo}
                    </text>
                  </g>
                );
              })}
            </g>
          </g>
          <rect
            x="24"
            y="242"
            width="224"
            height="24"
            rx="12"
            fill="#0F172A"
            fillOpacity="0.88"
          />
          <text x="34" y="258" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
            방콕 수도권 (BMR) 확대
          </text>
          {/* Leader line from inset to Bangkok area */}
          <line
            x1="248"
            y1="322"
            x2="430"
            y2="315"
            stroke="#94A3B8"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </g>
      </svg>

      {/* Bottom Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-white/95 px-4 py-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onRegionFilterChange('all')}
            className={`rounded-full px-2.5 py-1 font-medium transition ${
              activeRegionFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체 77개 주
          </button>
          {MACRO_REGION_ORDER.map((rid) => {
            const meta = MACRO_REGIONS[rid];
            const isActive = activeRegionFilter === rid;
            return (
              <button
                key={rid}
                type="button"
                onClick={() => onRegionFilterChange(isActive ? 'all' : rid)}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium transition ${
                  isActive
                    ? `${meta.badge} ${meta.border}`
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.color }} />
                <span>{meta.nameKo}</span>
              </button>
            );
          })}
        </div>
        <div className="text-[11px] text-slate-400">
          {selectedCityId ? '도시 마커 선택됨 · ' : ''}방콕(BMA) + 76개 주(짱왓)
        </div>
      </div>
    </div>
  );
};
