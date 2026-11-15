import React, { useState } from 'react';
import { Crown, GitBranch, Layers, X } from 'lucide-react';
import {
  ADMIN_TIERS,
  CORRIDORS,
  DYNASTY_CAPITALS,
  MACRO_REGION_ORDER,
  MACRO_REGIONS,
  TOPONYM_ROOTS,
} from '../data/atlasData';

interface HierarchyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProvince: (id: string) => void;
}

export const HierarchyModal: React.FC<HierarchyModalProps> = ({
  isOpen,
  onClose,
  onSelectProvince,
}) => {
  const [tab, setTab] = useState<'signature' | 'admin' | 'corridors'>('signature');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
          <div>
            <h2 className="text-lg font-bold">태국 행정체계 · 왕조 수도 · 지명 어원 백과</h2>
            <p className="text-xs text-slate-300">
              방콕 특별시(BMA) + 76개 짱왓(주)의 구조와 태국 지명 해독 매트릭스
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-200 bg-slate-50 px-6 py-2.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab('signature')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition ${
              tab === 'signature' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Crown className="h-3.5 w-3.5" />
            <span>왕조 수도 변천 &amp; 지명 해독</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('admin')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition ${
              tab === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>지방행정 4계층 (짱왓→무반)</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('corridors')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition ${
              tab === 'corridors' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <GitBranch className="h-3.5 w-3.5" />
            <span>6대 권역 &amp; 경제·철도 회랑</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'signature' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  1. 태국 5대 왕조 수도 변천사 (남하하는 역사의 축)
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  수도를 클릭하면 해당 주의 상세 페이지로 바로 이동합니다.
                </p>
                <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="px-3.5 py-2.5 font-bold">왕조 / 시대</th>
                        <th className="px-3.5 py-2.5 font-bold">존속 기간</th>
                        <th className="px-3.5 py-2.5 font-bold">수도</th>
                        <th className="px-3.5 py-2.5 font-bold">성격 및 유산</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {DYNASTY_CAPITALS.map((row) => (
                        <tr key={row.eraKo} className="hover:bg-slate-50">
                          <td className="px-3.5 py-3 font-bold text-slate-900">
                            <div>{row.eraKo}</div>
                            <div className="text-[11px] font-normal text-slate-400">{row.eraLocal}</div>
                          </td>
                          <td className="whitespace-nowrap px-3.5 py-3 font-medium text-amber-700">
                            {row.period}
                          </td>
                          <td className="px-3.5 py-3">
                            <button
                              type="button"
                              onClick={() => {
                                onSelectProvince(row.provinceId);
                                onClose();
                              }}
                              className="font-bold text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-800"
                            >
                              {row.capitalKo}
                            </button>
                          </td>
                          <td className="px-3.5 py-3 text-slate-600">
                            <div className="font-semibold text-slate-800">{row.character}</div>
                            <div className="mt-0.5 text-[11px]">{row.legacy}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  2. 태국 주(짱왓) 이름 어원 해독 매트릭스
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  태국 지명에 반복되는 산스크리트·팔리어·란나어 접두사/접미사를 알면 지리가 한눈에 들어옵니다.
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {TOPONYM_ROOTS.map((r) => (
                    <div
                      key={r.prefixKo}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-indigo-700">{r.prefixKo}</span>
                        <span className="rounded bg-white px-2 py-0.5 font-medium text-slate-600 shadow-sm">
                          {r.thaiRoot}
                        </span>
                      </div>
                      <div className="mt-1 font-bold text-slate-900">의미: {r.meaning}</div>
                      <div className="mt-1 text-[11px] text-slate-700">
                        <span className="font-semibold">대표 주:</span> {r.examples}
                      </div>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">{r.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'admin' && (
            <div className="space-y-4">
              <p className="text-xs leading-relaxed text-slate-600">
                태국은 단일국가(Unitary State)로서 중앙 내무부가 각 주에 주지사를 임명하는 중앙집권 체제를 기본으로 하되, 방콕(BMA)과 파타야시에만 특별 자치권을 부여합니다.
              </p>
              <div className="space-y-3">
                {ADMIN_TIERS.map((t) => (
                  <div
                    key={t.tier}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-bold text-white">
                          {t.tier}
                        </span>
                        <span className="text-sm font-bold text-slate-900">{t.nameKo}</span>
                        <span className="text-slate-400">{t.nameLocal}</span>
                      </div>
                      <span className="rounded bg-indigo-100 px-2 py-0.5 font-bold text-indigo-800">
                        {t.count}
                      </span>
                    </div>
                    <div className="mt-2 font-semibold text-slate-700">단체장: {t.headTitle}</div>
                    <p className="mt-1 leading-relaxed text-slate-600">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'corridors' && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-bold text-slate-900">태국 6대 지리 권역</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {MACRO_REGION_ORDER.map((rid) => {
                    const m = MACRO_REGIONS[rid];
                    return (
                      <div
                        key={rid}
                        className={`rounded-xl border p-3.5 text-xs ${m.softBg} ${m.border}`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: m.color }}
                          />
                          <span className="text-sm font-bold text-slate-900">{m.nameKo}</span>
                          <span className="text-slate-500">{m.nameLocal}</span>
                        </div>
                        <p className="mt-1.5 leading-relaxed text-slate-700">{m.summary}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold text-slate-900">5대 국가 경제 · 철도 회랑</h3>
                <div className="space-y-2.5">
                  {CORRIDORS.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded px-2 py-0.5 text-[10px] font-bold text-white"
                          style={{ backgroundColor: c.color }}
                        >
                          {c.code}
                        </span>
                        <span className="text-sm font-bold text-slate-900">{c.nameKo}</span>
                      </div>
                      <p className="mt-1 text-slate-600">{c.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
