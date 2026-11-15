import React, { useMemo, useState } from 'react';
import {
  BarChart3,
  BookOpen,
  GitCompare,
  Globe2,
  MapPin,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { CompareModal } from './components/CompareModal';
import { CountryMap } from './components/CountryMap';
import { HierarchyModal } from './components/HierarchyModal';
import { OverviewPanel } from './components/OverviewPanel';
import { StatsModal } from './components/StatsModal';
import { UnitDetail } from './components/UnitDetail';
import {
  LENS_OPTIONS,
  MACRO_REGION_ORDER,
  MACRO_REGIONS,
  PROVINCE_BY_ID,
  PROVINCES,
} from './data/atlasData';
import type { Lens, MacroRegionId } from './types/atlas';

export function App() {
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('bangkok_metropolis');
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [activeRegionFilter, setActiveRegionFilter] = useState<MacroRegionId | 'all'>('all');
  const [activeLens, setActiveLens] = useState<Lens>('none');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const [isHierarchyOpen, setIsHierarchyOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([
    'bangkok_metropolis',
    'chiang_mai',
    'phuket',
  ]);

  const selectedProvince = PROVINCE_BY_ID[selectedProvinceId] ?? PROVINCES[0];

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return PROVINCES.filter(
      (p) =>
        p.nameKo.toLowerCase().includes(q) ||
        p.shortNameKo.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.capitalKo.toLowerCase().includes(q) ||
        p.cities.some((c) => c.nameKo.toLowerCase().includes(q) || c.nameEn.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [searchQuery]);

  const quickBarProvinces = useMemo(() => {
    const list =
      activeRegionFilter === 'all'
        ? PROVINCES
        : PROVINCES.filter((p) => p.regionId === activeRegionFilter);
    return [...list].sort((a, b) => b.populationMan - a.populationMan);
  }, [activeRegionFilter]);

  const handleSelectProvince = (id: string, cityId?: string) => {
    if (!PROVINCE_BY_ID[id]) return;
    setSelectedProvinceId(id);
    setSelectedCityId(cityId ?? null);
    setSearchQuery('');
    setSearchFocused(false);
  };

  const handleOpenCompareWith = (provinceId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(provinceId)) return prev;
      return [provinceId, prev[0] ?? 'chiang_mai', prev[1] ?? 'phuket'];
    });
    setIsCompareOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-900/95 text-white shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-rose-500 shadow">
              <Globe2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold tracking-tight sm:text-lg">
                  태국 지리·역사 아틀라스
                </h1>
                <span className="hidden rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 sm:inline-block">
                  77 Provinces
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                6대 권역 · 76개 짱왓 + 방콕 특별시 · 왕조·경제·유네스코·한-태 인연
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72 md:w-80">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="주·도시 검색 (예: 방콕, 치앙마이, 푸껫, 부리람)"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-1.5 pl-9 pr-8 text-xs text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-slate-400 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {searchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1.5 text-slate-900 shadow-xl">
                {searchResults.map((p) => {
                  const rm = MACRO_REGIONS[p.regionId];
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onMouseDown={() => handleSelectProvince(p.id)}
                      className="flex w-full items-center justify-between px-3.5 py-2 text-left text-xs hover:bg-indigo-50"
                    >
                      <div>
                        <span className="font-bold text-slate-900">{p.nameKo}</span>
                        <span className="ml-1.5 text-slate-400">{p.nameEn}</span>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${rm.badge}`}>
                        {rm.nameKo}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3 Global Modal Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsHierarchyOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-indigo-400 hover:bg-slate-700"
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-400" />
              <span>왕조·지명 백과</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCompareOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-indigo-400 hover:bg-slate-700"
            >
              <GitCompare className="h-3.5 w-3.5 text-sky-400" />
              <span>비교</span>
            </button>
            <button
              type="button"
              onClick={() => setIsStatsOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-indigo-400 hover:bg-slate-700"
            >
              <BarChart3 className="h-3.5 w-3.5 text-emerald-400" />
              <span>통계</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-5 sm:px-6">
        {/* 2-Row Filter & Thematic Lens Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
          {/* Row 1: Thematic Lenses */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 pb-2.5">
            <span className="mr-1 flex items-center gap-1 text-xs font-bold text-slate-500">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              테마 렌즈:
            </span>
            {LENS_OPTIONS.map((lens) => {
              const isActive = activeLens === lens.id;
              return (
                <button
                  key={lens.id}
                  type="button"
                  onClick={() => setActiveLens(lens.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? lens.badgeColor
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {lens.label}
                </button>
              );
            })}
          </div>

          {/* Row 2: Macro-Region Filter */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-bold text-slate-500">권역 필터:</span>
            <button
              type="button"
              onClick={() => setActiveRegionFilter('all')}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                activeRegionFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              전체 (77)
            </button>
            {MACRO_REGION_ORDER.map((rid) => {
              const m = MACRO_REGIONS[rid];
              const isActive = activeRegionFilter === rid;
              return (
                <button
                  key={rid}
                  type="button"
                  onClick={() => setActiveRegionFilter(isActive ? 'all' : rid)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                    isActive
                      ? `${m.badge} ${m.border}`
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: m.color }} />
                  <span>{m.nameKo}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full-Width Interactive SVG Map */}
        <CountryMap
          selectedProvinceId={selectedProvinceId}
          selectedCityId={selectedCityId}
          activeRegionFilter={activeRegionFilter}
          activeLens={activeLens}
          onSelectProvince={handleSelectProvince}
          onRegionFilterChange={setActiveRegionFilter}
        />

        {/* Quick Province Selector Strip */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-2 flex items-center justify-between px-1 text-xs">
            <span className="font-bold text-slate-700">
              빠른 주 선택 ({quickBarProvinces.length}개 주 · 인구순)
            </span>
            <span className="text-[11px] text-slate-400">가로 스크롤 또는 클릭</span>
          </div>
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
            {quickBarProvinces.map((p) => {
              const isSelected = p.id === selectedProvinceId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectProvince(p.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  <MapPin className="h-3 w-3 opacity-70" />
                  <span>{p.shortNameKo}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Province Detail Dashboard */}
        <UnitDetail
          province={selectedProvince}
          selectedCityId={selectedCityId}
          onSelectCity={setSelectedCityId}
          onOpenCompare={handleOpenCompareWith}
        />

        {/* Overview & Trivia Panel */}
        <OverviewPanel
          activeLens={activeLens}
          activeRegionFilter={activeRegionFilter}
          onSelectRegionFilter={setActiveRegionFilter}
          onSelectProvince={handleSelectProvince}
        />
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4">
          <p className="font-semibold text-slate-700">
            태국 지리·역사 아틀라스 (thailand.nalm.info) — 77개 주(방콕 특별시 + 76개 짱왓)
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span className="text-slate-400">세계 아틀라스 시리즈:</span>
            <a
              href="https://china.nalm.info"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-indigo-600 hover:underline"
            >
              중국 아틀라스 (china.nalm.info)
            </a>
            <span>·</span>
            <a
              href="https://japan.nalm.info"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-indigo-600 hover:underline"
            >
              일본 아틀라스 (japan.nalm.info)
            </a>
            <span>·</span>
            <a
              href="https://usa.nalm.info"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-indigo-600 hover:underline"
            >
              미국 아틀라스 (usa.nalm.info)
            </a>
          </div>
        </div>
      </footer>

      {/* 3 Modals */}
      <HierarchyModal
        isOpen={isHierarchyOpen}
        onClose={() => setIsHierarchyOpen(false)}
        onSelectProvince={handleSelectProvince}
      />
      <CompareModal
        isOpen={isCompareOpen}
        compareIds={compareIds}
        onChangeCompareIds={setCompareIds}
        onClose={() => setIsCompareOpen(false)}
      />
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        onSelectProvince={handleSelectProvince}
      />
    </div>
  );
}

export default App;
