import React from 'react';
import {
  Award,
  Building2,
  Compass,
  Factory,
  HeartHandshake,
  History,
  Landmark,
  MapPin,
  Sparkles,
  Trees,
  Users,
} from 'lucide-react';
import {
  AREA_RANK,
  GDP_RANK,
  MACRO_REGIONS,
  POPULATION_RANK,
  formatArea,
  formatUsd,
} from '../data/atlasData';
import type { ProvinceInfo } from '../types/atlas';

interface UnitDetailProps {
  province: ProvinceInfo;
  selectedCityId: string | null;
  onSelectCity: (cityId: string | null) => void;
  onOpenCompare: (provinceId: string) => void;
}

export const UnitDetail: React.FC<UnitDetailProps> = ({
  province,
  selectedCityId,
  onSelectCity,
  onOpenCompare,
}) => {
  const region = MACRO_REGIONS[province.regionId];
  const activeCity =
    province.cities.find((c) => c.id === selectedCityId) ?? province.cities[0] ?? null;

  return (
    <section
      id="detail-section"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${region.badge}`}>
              {region.nameKo} ({region.nameLocal})
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {province.type} · {province.code}
            </span>
            {province.hasUnesco && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                UNESCO 세계유산
              </span>
            )}
            {province.dynastyTag && (
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                {province.dynastyTag}
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-baseline gap-2.5">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {province.nameKo}
            </h2>
            <span className="text-lg font-medium text-slate-400">{province.nameLocal}</span>
            <span className="text-sm font-medium text-slate-400">({province.nameEn})</span>
          </div>
          <p className="mt-1 text-sm font-medium text-indigo-600">
            “{province.nicknameKo}” — {province.slogan}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenCompare(province.id)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
        >
          다른 주와 비교하기 →
        </button>
      </div>

      {/* 4-Metric Cards */}
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>인구</span>
            <span className="rounded bg-white px-1.5 py-0.5 text-[11px] font-bold text-slate-700 shadow-sm">
              전국 {POPULATION_RANK[province.id]}위
            </span>
          </div>
          <div className="mt-1.5 text-lg font-bold text-slate-900">{province.populationText}</div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>면적</span>
            <span className="rounded bg-white px-1.5 py-0.5 text-[11px] font-bold text-slate-700 shadow-sm">
              전국 {AREA_RANK[province.id]}위
            </span>
          </div>
          <div className="mt-1.5 text-lg font-bold text-slate-900">{formatArea(province.areaKm2)}</div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>1인당 GPP (추정)</span>
            <span className="rounded bg-white px-1.5 py-0.5 text-[11px] font-bold text-slate-700 shadow-sm">
              전국 {GDP_RANK[province.id]}위
            </span>
          </div>
          <div className="mt-1.5 text-lg font-bold text-slate-900">
            {formatUsd(province.gdpPerCapitaUsd)}
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{province.specialMetricLabel}</span>
            <Building2 className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <div className="mt-1.5 text-lg font-bold text-slate-900">
            {province.specialMetricValue}개{' '}
            <span className="text-xs font-normal text-slate-500">
              {province.id === 'bangkok_metropolis' ? '켓(구)' : '암프(군)'}
            </span>
          </div>
        </div>
      </div>

      {/* Signature Highlight Story Banner */}
      <div className="mt-4 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-sky-50 p-4">
        <div className="flex items-start gap-2.5">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
          <p className="text-sm leading-relaxed text-slate-700">{province.highlightStory}</p>
        </div>
      </div>

      {/* City Quick-Selector Tabs */}
      {province.cities.length > 0 && (
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">주요 도시 스포트라이트:</span>
            {province.cities.map((c) => {
              const isActive = activeCity?.id === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelectCity(c.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <MapPin className="h-3 w-3" />
                  <span>{c.nameKo}</span>
                </button>
              );
            })}
          </div>

          {activeCity && (
            <div className="mt-2.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{activeCity.nameKo}</span>
                  <span className="text-xs text-slate-500">{activeCity.nameEn}</span>
                  <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700">
                    {activeCity.role === 'capital_largest'
                      ? '주도 · 최대 도시'
                      : activeCity.role === 'capital'
                      ? '주도 (청사 소재)'
                      : '핵심 거점 도시'}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-600">{activeCity.populationText}</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{activeCity.note}</p>
            </div>
          )}
        </div>
      )}

      {/* 3-Column Dashboard */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Col 1: Geography, Administration & Economy */}
        <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Compass className="h-4 w-4 text-sky-600" />
            <span>지리 · 행정 · 핵심 산업</span>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
              <span className="text-slate-500">주도 (행정 중심)</span>
              <span className="font-semibold text-slate-800">{province.capitalKo}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
              <span className="text-slate-500">최대 도시</span>
              <span className="font-semibold text-slate-800">
                {province.largestCityKo}
                {!province.isCapitalLargest && (
                  <span className="ml-1 text-[10px] text-amber-600">(주도와 다름)</span>
                )}
              </span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-slate-600">{province.characteristicsSummary}</p>
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Factory className="h-3.5 w-3.5 text-slate-500" />
              <span>주력 산업</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {province.keyIndustries.map((ind) => (
                <span
                  key={ind}
                  className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: History & Famous People */}
        <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <History className="h-4 w-4 text-amber-600" />
            <span>역사 · 왕조 · 인물</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-600">{province.historicalRoleSummary}</p>

          <div className="space-y-2.5">
            {province.historicalEvents.map((ev, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200/80 bg-white p-2.5">
                <div className="text-[10px] font-bold text-amber-700">{ev.era}</div>
                <div className="text-xs font-bold text-slate-900">{ev.title}</div>
                <div className="mt-0.5 text-[11px] leading-relaxed text-slate-600">{ev.detail}</div>
              </div>
            ))}
          </div>

          {province.famousPeople.length > 0 && (
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Users className="h-3.5 w-3.5 text-slate-500" />
                <span>대표 인물 · 연고</span>
              </div>
              <div className="space-y-2">
                {province.famousPeople.map((fp, idx) => (
                  <div key={idx} className="rounded-lg bg-white p-2.5 text-xs shadow-sm ring-1 ring-slate-200/70">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-slate-900">{fp.name}</span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                        {fp.role}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600">{fp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Col 3: Landmarks, Culture & Korean Ties */}
        <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Landmark className="h-4 w-4 text-emerald-600" />
            <span>명소 · 문화 · 한-태 인연</span>
          </div>

          <div>
            <div className="mb-1.5 text-xs font-semibold text-slate-700">대표 랜드마크</div>
            <ul className="space-y-1">
              {province.landmarks.map((lm) => (
                <li key={lm} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{lm}</span>
                </li>
              ))}
            </ul>
          </div>

          {province.nationalParksAndHeritage && province.nationalParksAndHeritage.length > 0 && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <Trees className="h-3.5 w-3.5" />
                <span>세계유산 · 국립공원</span>
              </div>
              <ul className="mt-1 space-y-0.5 text-[11px] text-emerald-700">
                {province.nationalParksAndHeritage.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Award className="h-3.5 w-3.5 text-slate-500" />
              <span>특산물 · 지역 문화</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {province.specialtyAndCulture.map((sp) => (
                <span
                  key={sp}
                  className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800 ring-1 ring-amber-200/70"
                >
                  {sp}
                </span>
              ))}
            </div>
          </div>

          {province.koreanHistory && province.koreanHistory.length > 0 && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                <HeartHandshake className="h-3.5 w-3.5" />
                <span>한국과의 인연</span>
              </div>
              <div className="mt-2 space-y-2">
                {province.koreanHistory.map((kh, idx) => (
                  <div key={idx} className="rounded-lg bg-white/90 p-2 text-xs">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-slate-900">{kh.title}</span>
                      <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700">
                        {kh.category}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                      {kh.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
