import React from 'react';
import { GitCompare, X } from 'lucide-react';
import {
  AREA_RANK,
  COMPARE_PRESETS,
  GDP_RANK,
  MACRO_REGIONS,
  POPULATION_RANK,
  PROVINCE_BY_ID,
  PROVINCES,
  formatArea,
  formatUsd,
} from '../data/atlasData';

interface CompareModalProps {
  isOpen: boolean;
  compareIds: string[];
  onChangeCompareIds: (ids: string[]) => void;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  compareIds,
  onChangeCompareIds,
  onClose,
}) => {
  if (!isOpen) return null;

  const sortedProvinces = [...PROVINCES].sort((a, b) => a.nameKo.localeCompare(b.nameKo, 'ko'));
  const selected = compareIds.map((id) => PROVINCE_BY_ID[id]).filter(Boolean);

  const handleSelectAt = (index: number, newId: string) => {
    const next = [...compareIds];
    next[index] = newId;
    onChangeCompareIds(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-indigo-400" />
            <div>
              <h2 className="text-lg font-bold">태국 주(짱왓) 3자 비교 분석</h2>
              <p className="text-xs text-slate-300">
                최대 3개 주를 선택해 인구·면적·1인당 GPP·산업·역사 특성을 나란히 비교합니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Presets & Selectors */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-3.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500">추천 비교 프리셋:</span>
            {COMPARE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onChangeCompareIds(preset.provinceIds)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {[0, 1, 2].map((idx) => (
              <select
                key={idx}
                value={compareIds[idx] ?? ''}
                onChange={(e) => handleSelectAt(idx, e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                {sortedProvinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nameKo} ({MACRO_REGIONS[p.regionId].nameKo})
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {selected.map((p) => {
              const region = MACRO_REGIONS[p.regionId];
              return (
                <div
                  key={p.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="border-b border-slate-100 pb-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${region.badge}`}>
                      {region.nameKo}
                    </span>
                    <h3 className="mt-1.5 text-lg font-extrabold text-slate-900">{p.nameKo}</h3>
                    <div className="text-xs text-slate-400">
                      {p.nameLocal} · {p.nameEn}
                    </div>
                    <p className="mt-1 text-xs font-medium text-indigo-600">{p.nicknameKo}</p>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
                      <span className="text-slate-500">인구</span>
                      <span className="font-bold text-slate-900">
                        {p.populationText} ({POPULATION_RANK[p.id]}위)
                      </span>
                    </div>
                    <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
                      <span className="text-slate-500">면적</span>
                      <span className="font-bold text-slate-900">
                        {formatArea(p.areaKm2)} ({AREA_RANK[p.id]}위)
                      </span>
                    </div>
                    <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
                      <span className="text-slate-500">1인당 GPP</span>
                      <span className="font-bold text-slate-900">
                        {formatUsd(p.gdpPerCapitaUsd)} ({GDP_RANK[p.id]}위)
                      </span>
                    </div>
                    <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
                      <span className="text-slate-500">{p.specialMetricLabel}</span>
                      <span className="font-bold text-slate-900">{p.specialMetricValue}개</span>
                    </div>
                    <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
                      <span className="text-slate-500">주도 / 최대도시</span>
                      <span className="font-bold text-slate-900">
                        {p.capitalKo} / {p.largestCityKo}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 text-xs">
                    <div className="font-semibold text-slate-700">핵심 산업</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {p.keyIndustries.map((ind) => (
                        <span
                          key={ind}
                          className="rounded bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 text-xs">
                    <div className="font-semibold text-slate-700">대표 랜드마크</div>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                      {p.landmarks.join(' · ')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
