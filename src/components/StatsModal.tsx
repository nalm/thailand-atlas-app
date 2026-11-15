import React, { useMemo, useState } from 'react';
import { ArrowUpDown, BarChart3, X } from 'lucide-react';
import {
  MACRO_REGION_ORDER,
  MACRO_REGIONS,
  PROVINCES,
  formatArea,
  formatUsd,
} from '../data/atlasData';
import type { MacroRegionId } from '../types/atlas';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProvince: (id: string) => void;
}

type SortKey = 'nameKo' | 'populationMan' | 'areaKm2' | 'gdpPerCapitaUsd' | 'specialMetricValue';

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  onSelectProvince,
}) => {
  const [regionFilter, setRegionFilter] = useState<MacroRegionId | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('populationMan');
  const [sortDesc, setSortDesc] = useState(true);

  const regionStats = useMemo(() => {
    return MACRO_REGION_ORDER.map((rid) => {
      const items = PROVINCES.filter((p) => p.regionId === rid);
      const pop = items.reduce((s, p) => s + p.populationMan, 0);
      const area = items.reduce((s, p) => s + p.areaKm2, 0);
      const avgGdp = Math.round(items.reduce((s, p) => s + p.gdpPerCapitaUsd, 0) / items.length);
      return {
        meta: MACRO_REGIONS[rid],
        count: items.length,
        pop,
        area,
        avgGdp,
      };
    });
  }, []);

  const rows = useMemo(() => {
    const filtered =
      regionFilter === 'all'
        ? PROVINCES
        : PROVINCES.filter((p) => p.regionId === regionFilter);

    return [...filtered].sort((a, b) => {
      if (sortKey === 'nameKo') {
        return sortDesc
          ? b.nameKo.localeCompare(a.nameKo, 'ko')
          : a.nameKo.localeCompare(b.nameKo, 'ko');
      }
      return sortDesc ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey];
    });
  }, [regionFilter, sortKey, sortDesc]);

  if (!isOpen) return null;

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDesc((d) => !d);
    } else {
      setSortKey(key);
      setSortDesc(key !== 'nameKo');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-400" />
            <div>
              <h2 className="text-lg font-bold">태국 77개 주 통계 대시보드</h2>
              <p className="text-xs text-slate-300">
                6대 권역별 요약 및 전체 77개 주(방콕 + 76 짱왓) 정렬 테이블
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* 6 Macro-Region Summary Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {regionStats.map((rs) => (
              <button
                key={rs.meta.id}
                type="button"
                onClick={() =>
                  setRegionFilter((prev) => (prev === rs.meta.id ? 'all' : rs.meta.id))
                }
                className={`rounded-xl border p-3 text-left text-xs transition ${
                  regionFilter === rs.meta.id
                    ? `${rs.meta.softBg} ${rs.meta.border} ring-2 ring-offset-1`
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{rs.meta.nameKo}</span>
                  <span className="text-[11px] font-bold text-slate-500">{rs.count}주</span>
                </div>
                <div className="mt-1.5 text-[11px] text-slate-600">
                  인구 합: <strong className="text-slate-900">{rs.pop.toLocaleString('ko-KR')}만</strong>
                </div>
                <div className="text-[11px] text-slate-600">
                  면적: <strong className="text-slate-900">{rs.area.toLocaleString('ko-KR')}</strong>
                </div>
                <div className="text-[11px] text-slate-600">
                  평균 GPP: <strong className="text-slate-900">${rs.avgGdp.toLocaleString('ko-KR')}</strong>
                </div>
              </button>
            ))}
          </div>

          {/* Filter bar */}
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">
              표시 중: <strong className="text-slate-900">{rows.length}개 주</strong> (행 클릭 시 해당 주 이동)
            </span>
            {regionFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setRegionFilter('all')}
                className="rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700 hover:bg-slate-200"
              >
                전체 77개 보기
              </button>
            )}
          </div>

          {/* Sortable Table */}
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-3.5 py-2.5 font-bold">#</th>
                  <th className="px-3.5 py-2.5">
                    <button
                      type="button"
                      onClick={() => toggleSort('nameKo')}
                      className="flex items-center gap-1 font-bold hover:text-indigo-600"
                    >
                      <span>주 이름</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-3.5 py-2.5 font-bold">권역</th>
                  <th className="px-3.5 py-2.5 font-bold">주도</th>
                  <th className="px-3.5 py-2.5">
                    <button
                      type="button"
                      onClick={() => toggleSort('populationMan')}
                      className="flex items-center gap-1 font-bold hover:text-indigo-600"
                    >
                      <span>인구(만 명)</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-3.5 py-2.5">
                    <button
                      type="button"
                      onClick={() => toggleSort('areaKm2')}
                      className="flex items-center gap-1 font-bold hover:text-indigo-600"
                    >
                      <span>면적</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-3.5 py-2.5">
                    <button
                      type="button"
                      onClick={() => toggleSort('gdpPerCapitaUsd')}
                      className="flex items-center gap-1 font-bold hover:text-indigo-600"
                    >
                      <span>1인당 GPP</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-3.5 py-2.5">
                    <button
                      type="button"
                      onClick={() => toggleSort('specialMetricValue')}
                      className="flex items-center gap-1 font-bold hover:text-indigo-600"
                    >
                      <span>암프/켓</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {rows.map((p, idx) => {
                  const rm = MACRO_REGIONS[p.regionId];
                  return (
                    <tr
                      key={p.id}
                      onClick={() => {
                        onSelectProvince(p.id);
                        onClose();
                      }}
                      className="cursor-pointer transition hover:bg-indigo-50/60"
                    >
                      <td className="px-3.5 py-2.5 text-slate-400">{idx + 1}</td>
                      <td className="px-3.5 py-2.5 font-bold text-slate-900">
                        {p.nameKo}{' '}
                        <span className="ml-1 text-[11px] font-normal text-slate-400">
                          {p.code}
                        </span>
                      </td>
                      <td className="px-3.5 py-2.5">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${rm.badge}`}>
                          {rm.nameKo}
                        </span>
                      </td>
                      <td className="px-3.5 py-2.5 text-slate-600">{p.capitalKo}</td>
                      <td className="px-3.5 py-2.5 font-semibold text-slate-800">
                        {p.populationMan.toLocaleString('ko-KR')}만
                      </td>
                      <td className="px-3.5 py-2.5 text-slate-700">{formatArea(p.areaKm2)}</td>
                      <td className="px-3.5 py-2.5 font-semibold text-slate-800">
                        {formatUsd(p.gdpPerCapitaUsd)}
                      </td>
                      <td className="px-3.5 py-2.5 text-slate-600">{p.specialMetricValue}개</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
