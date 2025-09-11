import React, { useMemo, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { CheckCircle2, ChevronRight } from "lucide-react";
// Import local JSON data (enabled via tsconfig resolveJsonModule)
import rawData from "../../LayKetQuaThuHutDauTu.json";
import { useIsMobile } from "@/hooks/use-mobile";

type InvestmentRow = {
  nam: string;
  thuTu: number;
  soDuAnFDI: number;
  soDuAnDDI: number;
  vonDauTuFDI: number; // triệu USD
  vonDauTuDDI: number; // tỷ đồng (will be displayed as chục tỷ đồng => divide by 10)
};

/**
 * Lightweight responsive SVG bar chart with two series
 */
type ChartLabels = {
  legendFDI: string;
  legendDDI: string;
  unitFDI: string; // e.g., "triệu USD" | "million USD"
  unitDDI: string; // e.g., "tỷ VND" | "billion VND"
  projects: string; // e.g., "dự án" | "projects"
};

function DualSeriesBarChart({
  data,
  theme,
  labels,
  isMobile,
}: {
  data: InvestmentRow[];
  theme: "light" | "dark";
  labels: ChartLabels;
  isMobile: boolean;
}) {
  const chart = useMemo(() => {
    // Normalize and prepare values
    const years = data.map((d) => d.nam);
    const fdiValues = data.map((d) => d.vonDauTuFDI); // triệu USD
    const ddiValues = data.map((d) => Number((d.vonDauTuDDI / 10).toFixed(1))); // chục tỷ đồng (hiển thị)
    const ddiOriginal = data.map((d) => d.vonDauTuDDI); // tỷ đồng (tooltip)
    const fdiProjects = data.map((d) => d.soDuAnFDI);
    const ddiProjects = data.map((d) => d.soDuAnDDI);

    const maxValue = Math.max(
      ...fdiValues,
      ...ddiValues,
      100 // ensure at least 100 for a nice axis
    );
    const paddedMax = Math.ceil(maxValue / 100) * 100; // round to the next 100

    return { years, fdiValues, ddiValues, ddiOriginal, fdiProjects, ddiProjects, max: paddedMax };
  }, [data]);

  const width = 1920; // internal viewport width
  const height = 840; // internal viewport height
  const margin = { top: 20, right: 20, bottom: 80, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const groupWidth = innerWidth / chart.years.length;
  const minBarWidth = isMobile ? 42 : 32;
  const barWidth = Math.min(67, Math.max(minBarWidth, (groupWidth - 2) / 2));

  const scaleY = (v: number) => (1 - v / chart.max) * innerHeight;

  // Stronger contrast colors for clarity
  const fdiColor = theme === "dark" ? "#19DBCF" : "#1E3A8A"; // cyan (dark) / blue-800 (light)
  const ddiColor = "#F59E0B"; // amber-500 for both themes for high contrast
  const gridColor = theme === "dark" ? "#455A64" : "#DCDCDC";
  const axisText = theme === "dark" ? "#FFFFFF" : "#000000";

  // Tooltip state
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    label: string;
    value: string;
    year: string;
    color: string;
  } | null>(null);

  const formatNumberVN = (num: number) => {
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (parts[1]) {
      return parts[0] + "," + parts[1];
    }
    return parts[0];
  };

  const tickStep = isMobile ? 200 : 100;
  const yTicks = Array.from({ length: Math.floor(chart.max / tickStep) + 1 }, (_, i) => i * tickStep);

  return (
    <div className="w-full overflow-x-auto relative" ref={containerRef}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: isMobile ? 360 : 560 }}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Frame */}
          <rect x={0} y={0} width={innerWidth} height={innerHeight} fill="none" stroke={gridColor} rx={8} />
          {/* Grid lines & Y ticks */}
          {yTicks.map((t) => (
            <g key={`grid-${t}`}> 
              <line
                x1={0}
                x2={innerWidth}
                y1={scaleY(t)}
                y2={scaleY(t)}
                stroke={gridColor}
                strokeDasharray="3 4"
                strokeWidth={1}
              />
              <text
                x={-10}
                y={scaleY(t) + 4}
                textAnchor="end"
                fontSize={isMobile ? 14 : 18}
                fill={axisText}
              >
                {t}
              </text>
            </g>
          ))}

          {/* Bottom axis */}
          <line x1={0} x2={innerWidth} y1={innerHeight} y2={innerHeight} stroke={gridColor} strokeWidth={1.5} />

          {/* Bars */}
          {chart.years.map((year, i) => {
            const groupX = i * groupWidth + groupWidth / 2;
            const fdiH = innerHeight - scaleY(chart.fdiValues[i]);
            const ddiH = innerHeight - scaleY(chart.ddiValues[i]);
            return (
              <g key={`grp-${year}`} transform={`translate(${groupX},0)`}>
                {/* FDI */}
                <rect
                  x={-barWidth - 4}
                  y={scaleY(chart.fdiValues[i])}
                  width={barWidth}
                  height={fdiH}
                  fill={fdiColor}
                  rx={3}
                  onMouseMove={(e) => {
                    if (!containerRef.current) return;
                    const rect = containerRef.current.getBoundingClientRect();
                    setTooltip({
                      x: e.clientX - rect.left + 12,
                      y: e.clientY - rect.top - 12,
                      label: "FDI",
                      value: `${formatNumberVN(chart.fdiValues[i])} ${labels.unitFDI}`,
                      year,
                      color: fdiColor,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
                {/* FDI projects label */}
                {!isMobile && (
                  <text
                    x={-barWidth - 4 + barWidth / 2}
                    y={Math.max(12, scaleY(chart.fdiValues[i]) - 10)}
                    textAnchor="middle"
                    fontSize={15}
                    fill={axisText}
                    fontWeight={600 as unknown as any}
                  >
                    {chart.fdiProjects[i]} {labels.projects}
                  </text>
                )}
                {/* DDI */}
                <rect
                  x={4}
                  y={scaleY(chart.ddiValues[i])}
                  width={barWidth}
                  height={ddiH}
                  fill={ddiColor}
                  rx={3}
                  onMouseMove={(e) => {
                    if (!containerRef.current) return;
                    const rect = containerRef.current.getBoundingClientRect();
                    setTooltip({
                      x: e.clientX - rect.left + 12,
                      y: e.clientY - rect.top - 12,
                      label: "DDI",
                      value: `${formatNumberVN(chart.ddiOriginal[i])} ${labels.unitDDI}`,
                      year,
                      color: ddiColor,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
                {/* DDI projects label */}
                {!isMobile && (
                  <text
                    x={4 + barWidth / 2}
                    y={Math.max(12, scaleY(chart.ddiValues[i]) - 10)}
                    textAnchor="middle"
                    fontSize={15}
                    fill={axisText}
                    fontWeight={600 as unknown as any}
                  >
                    {chart.ddiProjects[i]} {labels.projects}
                  </text>
                )}
                {/* Year label */}
                <text
                  x={0}
                  y={innerHeight + 28}
                  textAnchor="middle"
                  fontSize={isMobile ? 14 : 18}
                  fill={axisText}
                >
                  {year}
                </text>
              </g>
            );
          })}
        </g>

        {/* Axis title / Legend */}
        <g transform={`translate(${margin.left}, ${height - 20})`}>
          <rect x={0} y={0} width={18} height={18} fill={fdiColor} rx={6} />
          <text x={24} y={14} fontSize={isMobile ? 18 : 24} fill={axisText}>
            {labels.legendFDI}
          </text>
          <rect x={376} y={0} width={18} height={18} fill={ddiColor} rx={6} />
          <text x={400} y={14} fontSize={isMobile ? 18 : 24} fill={axisText}>
            {labels.legendDDI}
          </text>
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 rounded-md px-3 py-2 text-sm shadow-md"
          style={{
            left: Math.min(tooltip.x, (containerRef.current?.clientWidth || 0) - 160),
            top: Math.max(0, tooltip.y - 36),
            background: theme === "dark" ? "#1F2937" : "#FFFFFF",
            color: theme === "dark" ? "#FFFFFF" : "#111827",
            border: `1px solid ${gridColor}`,
            minWidth: 140,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded" style={{ background: tooltip.color }} />
            <span className="font-semibold">{tooltip.year}</span>
            <span className="opacity-70">{tooltip.label}</span>
          </div>
          <div className="mt-1 font-medium">{tooltip.value}</div>
        </div>
      )}
    </div>
  );
}

/**
 * Investment Attraction Results section
 */
const InvestmentAttractionResults: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  // Ensure data sorted by "thuTu"
  const rows = useMemo(() => {
    const arr = (rawData as InvestmentRow[]).slice();
    return arr.sort((a, b) => (a.thuTu || 0) - (b.thuTu || 0));
  }, []);

  const isDark = theme === "dark";
  const bg = isDark ? "bg-[#1D262E]" : "bg-dseza-light-secondary";
  const cardBg = isDark ? "bg-[#2C3640]" : "bg-[#F9FAFB]";
  const titleColor = isDark ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const subColor = isDark ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";

  // Localized strings
  const isEN = language === 'en';
  const text = {
    title: isEN ? 'INVESTMENT ATTRACTION RESULTS' : 'KẾT QUẢ THU HÚT ĐẦU TƯ',
    situation: isEN ? 'Investment attraction situation' : 'Tình hình thu hút đầu tư',
    subtitle: isEN ? 'High-tech park, centralized IT zone, industrial zones' : 'Khu công nghệ cao, Khu CNTT tập trung, các khu công nghiệp',
    fdiTitle: isEN ? '(1) FOREIGN DIRECT INVESTMENT (FDI)' : '(1) THU HÚT ĐẦU TƯ TRỰC TIẾP NƯỚC NGOÀI (FDI)',
    fdiLine1: isEN
      ? 'In the first 3 months of 2025, 02 FDI projects were attracted with a total investment capital of 18.5 million USD'
      : '3 tháng đầu năm 2025, đã thu hút 02 dự án FDI, tổng vốn đầu tư 18,5 triệu USD',
    fdiLine2: isEN
      ? 'Accumulated until the end of March 2025: 128 FDI projects with a total registered investment capital of 2,169.1 million USD.'
      : 'Lũy kế đến hết tháng 3/2025 thu hút 128 dự án FDI, với tổng vốn đầu tư đăng ký 2.169,1 triệu USD.',
    ddiTitle: isEN ? '(2) DOMESTIC DIRECT INVESTMENT (DDI)' : '(2) THU HÚT ĐẦU TƯ TRONG NƯỚC (DDI)',
    ddiLine1: isEN
      ? 'In the first 3 months of 2025, 02 projects were attracted with a total investment capital of 6,293.7 billion VND'
      : '3 tháng đầu năm 2025, đã thu hút 02 dự án, tổng vốn đầu tư 6.293,7 tỷ đồng',
    ddiLine2: isEN
      ? 'Accumulated until the end of March 2025: 399 domestic projects with a total registered investment capital of 42,040.7 billion VND.'
      : 'Lũy kế đến hết tháng 3/2025, thu hút 399 dự án trong nước với tổng vốn đầu tư đăng ký 42.040,7 tỷ đồng.',
    chartTitle: isEN ? 'STATISTICAL CHART' : 'BIỂU ĐỒ THỐNG KÊ',
    labels: {
      legendFDI: isEN ? 'FDI investment (million USD)' : 'Vốn đầu tư FDI (triệu USD)',
      legendDDI: isEN ? 'DDI investment (tens of billion VND)' : 'Vốn đầu tư DDI (chục tỷ đồng)',
      unitFDI: isEN ? 'million USD' : 'triệu USD',
      unitDDI: isEN ? 'billion VND' : 'tỷ VND',
      projects: isEN ? 'projects' : 'dự án',
    } as ChartLabels,
  };

  return (
    <section className={cn("py-8 md:py-12 px-4 sm:px-6 lg:px-8", bg)}>
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className={cn("font-montserrat font-bold text-2xl md:text-3xl", titleColor)}>
            {text.title}
          </h2>
          <p className={cn("mt-4 text-base md:text-lg font-semibold", titleColor)}>
            {text.situation}
          </p>
          <p className={cn("mt-1 text-sm md:text-base", subColor)}>
            {text.subtitle}
          </p>
        </div>

        {/* Content */}
        {/* Two summary cards side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* FDI card */}
          <div className={cn("rounded-xl p-5 shadow-sm", cardBg)}>
            <div>
              <p className={cn("font-semibold text-sm md:text-base", titleColor)}>
                {text.fdiTitle}
              </p>
              <div className="mt-3 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={cn("w-5 h-5 mt-0.5", isDark ? "text-dseza-dark-primary" : "text-dseza-light-primary")} />
                  <p className={cn("italic", subColor)}>
                    {text.fdiLine1}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ChevronRight className={cn("w-5 h-5 mt-0.5", isDark ? "text-dseza-dark-accent" : "text-dseza-light-accent")} />
                  <p className={cn("italic", subColor)}>
                    {text.fdiLine2}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DDI card */}
          <div className={cn("rounded-xl p-5 shadow-sm", cardBg)}>
            <div>
              <p className={cn("font-semibold text-sm md:text-base", titleColor)}>
                {text.ddiTitle}
              </p>
              <div className="mt-3 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={cn("w-5 h-5 mt-0.5", isDark ? "text-dseza-dark-primary" : "text-dseza-light-primary")} />
                  <p className={cn("italic", subColor)}>
                    {text.ddiLine1}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ChevronRight className={cn("w-5 h-5 mt-0.5", isDark ? "text-dseza-dark-accent" : "text-dseza-light-accent")} />
                  <p className={cn("italic", subColor)}>
                    {text.ddiLine2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart full width below */}
        <div className={cn("rounded-xl p-5 shadow-sm mt-8", cardBg)}>
          <p className={cn("font-semibold mb-3", titleColor)}>{text.chartTitle}</p>
          <DualSeriesBarChart data={rows as InvestmentRow[]} theme={isDark ? "dark" : "light"} labels={text.labels} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
};

export default InvestmentAttractionResults;


