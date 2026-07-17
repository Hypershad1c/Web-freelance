"use client";

import { useState, useMemo } from "react";
import { getDictionary } from "@/i18n/dictionaries";

export function MortgageCalculator({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  const [price, setPrice] = useState(2000000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [rate, setRate] = useState(5.5); // annual %, placeholder — verify against current Moroccan bank rates
  const [years, setYears] = useState(20);

  const monthlyPayment = useMemo(() => {
    const downPayment = price * (downPaymentPct / 100);
    const principal = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    if (monthlyRate === 0) return principal / numPayments;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    );
  }, [price, downPaymentPct, rate, years]);

  function formatMAD(n: number) {
    return new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(n) + " DH";
  }

  return (
    <section className="py-24 bg-[#FAF8F4]">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs tracking-[0.3em] text-accent uppercase mb-3 text-center">{t.sections.mortgageSimulation}</p>
        <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3 text-center">
          {t.sections.mortgageTitle}
        </h2>
        <p className="text-sm text-stone-500 text-center mb-10">
          {t.sections.mortgageDisclaimer}
        </p>

        <div className="rounded-2xl bg-white p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <Field label={t.sections.mortgagePropertyPrice} value={price} onChange={setPrice} min={100000} max={20000000} step={50000} />
            <Field label={t.sections.mortgageDownPayment} value={downPaymentPct} onChange={setDownPaymentPct} min={0} max={90} step={5} suffix="%" />
            <Field label={t.sections.mortgageRate} value={rate} onChange={setRate} min={1} max={10} step={0.1} suffix="%" />
            <Field label={t.sections.mortgageDuration} value={years} onChange={setYears} min={5} max={30} step={1} />
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl bg-primary p-8 text-center">
            <p className="text-xs text-white/60 uppercase tracking-wide mb-2">{t.sections.mortgageMonthly}</p>
            <p className="font-heading text-3xl text-accent">{formatMAD(monthlyPayment)}</p>
            <p className="text-xs text-white/40 mt-2">{t.sections.perMonth}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <label className="text-stone-500">{label}</label>
        <span className="text-primary font-medium">
          {new Intl.NumberFormat("fr-MA").format(value)}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent"
      />
    </div>
  );
}
