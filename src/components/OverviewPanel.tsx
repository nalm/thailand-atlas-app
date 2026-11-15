import React from 'react';
import { BookOpen, Globe2, Info, Layers, Sparkles } from 'lucide-react';
import {
  CORRIDORS,
  HISTORICAL_ERAS,
  LENS_OPTIONS,
  MACRO_REGION_ORDER,
  MACRO_REGIONS,
  PROVINCES,
  THAILAND_TRIVIA,
} from '../data/atlasData';
import type { Lens, MacroRegionId } from '../types/atlas';

interface OverviewPanelProps {
  activeLens: Lens;
  activeRegionFilter: MacroRegionId | 'all';
  onSelectRegionFilter: (rid: MacroRegionId | 'all') => void;
  onSelectProvince: (id: string) => void;
}

export const OverviewPanel: React.FC<OverviewPanelProps> = ({
  activeLens,
  activeRegionFilter,
  onSelectRegionFilter,
  onSelectProvince,
}) => {
  const activeLensMeta = LENS_OPTIONS.find((l) => l.id === activeLens) ?? LENS_OPTIONS[0];

  const regionCounts = MACRO_REGION_ORDER.reduce<Record<string, number>>((acc, rid) => {
    acc[rid] = PROVINCES.filter((p) => p.regionId === rid).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Active Lens Contextual Guide */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              현재 테마 렌즈: {activeLensMeta.label}
            </h3>
          </div>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${activeLensMeta.badgeColor}`}>
            {activeLensMeta.shortDesc}
          </span>
        </div>

        {activeLens === 'dynasty' && (
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            {HISTORICAL_ERAS.map((era) => (
              <div
                key={era.id}
                className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3 text-xs"
              >
                <div className="font-bold text-amber-800">{era.period}</div>
                <div className="mt-0.5 text-sm font-bold text-slate-900">{era.nameKo}</div>
                <div className="mt-1 text-[11px] font-medium text-slate-500">수도: {era.capital}</div>
                <p className="mt-1.5 leading-relaxed text-slate-600">{era.summary}</p>
              </div>
            ))}
          </div>
        )}

        {activeLens === 'corridors' && (
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            {CORRIDORS.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs"
              >
                <span
                  className="inline-block rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                  style={{ backgroundColor: c.color }}
                >
                  {c.code}
                </span>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{c.nameKo}</div>
                <p className="mt-1 leading-relaxed text-slate-600">{c.summary}</p>
              </div>
            ))}
          </div>
        )}

        {activeLens === 'heritage' && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {PROVINCES.filter((p) => p.hasUnesco).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProvince(p.id)}
                className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                {p.shortNameKo} ({p.nationalParksAndHeritage?.[0] ?? 'UNESCO 유산'})
              </button>
            ))}
          </div>
        )}

        {activeLens === 'korea' && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {PROVINCES.filter((p) => p.koreanHistory && p.koreanHistory.length > 0).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProvince(p.id)}
                className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 font-semibold text-rose-800 hover:bg-rose-100"
              >
                {p.shortNameKo} — {p.koreanHistory?.[0].title}
              </button>
            ))}
          </div>
        )}

        {activeLens === 'none' && (
          <p className="mt-2 text-xs text-slate-500">
            상단 테마 렌즈를 전환하면 왕조 수도, 경제·철도 회랑, 유네스코 세계유산, 한국-태국 인연별로 지도를 즉시 재구성해 볼 수 있습니다.
          </p>
        )}
      </div>

      {/* 6 Macro-Region Cards */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Globe2 className="h-4 w-4 text-slate-700" />
          <h3 className="text-base font-bold text-slate-900">태국 6대 지리 권역 한눈에 보기</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MACRO_REGION_ORDER.map((rid) => {
            const meta = MACRO_REGIONS[rid];
            const isSelected = activeRegionFilter === rid;
            return (
              <button
                key={rid}
                type="button"
                onClick={() => onSelectRegionFilter(isSelected ? 'all' : rid)}
                className={`rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? `${meta.softBg} ${meta.border} ring-2 ring-offset-1`
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                    <span className="text-sm font-bold text-slate-900">{meta.nameKo}</span>
                    <span className="text-xs text-slate-400">{meta.nameLocal}</span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                    {regionCounts[rid]}개 주
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{meta.summary}</p>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  <Sparkles className="h-3 w-3" />
                  <span>{meta.keyIdentity}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thailand Trivia Cards */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-slate-700" />
          <h3 className="text-base font-bold text-slate-900">알아두면 흥미로운 태국 지리·역사 상식</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {THAILAND_TRIVIA.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-2.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.title}</div>
                  <div className="mt-0.5 text-xs font-semibold text-indigo-600">{t.subtitle}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{t.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
