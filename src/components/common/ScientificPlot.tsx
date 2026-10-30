/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 628 AEROSPACE — MICROGRAVITY FIRE INTELLIGENCE
 * High-Precision SVG Scientific Plotting Engine
 */

import React, { useState, useId } from 'react';
import { MetricSeries, DataPoint } from '../../types/research';

interface ScientificPlotProps {
  title: string;
  subtitle?: string;
  series: MetricSeries[];
  height?: number;
  width?: number | string;
  sourceAttribution?: string;
  notes?: string;
}

export const ScientificPlot: React.FC<ScientificPlotProps> = ({
  title,
  subtitle,
  series,
  height = 340,
  sourceAttribution,
  notes
}) => {
  const plotId = useId();
  const [activeSeriesIndices, setActiveSeriesIndices] = useState<number[]>(
    series.map((_, i) => i)
  );
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    seriesName: string;
    screenX: number;
    screenY: number;
    label?: string;
  } | null>(null);

  // Filter visible series
  const visibleSeries = series.filter((_, idx) => activeSeriesIndices.includes(idx));

  // Determine global bounds
  let allPoints: DataPoint[] = [];
  visibleSeries.forEach(s => {
    allPoints = allPoints.concat(s.data);
  });

  if (allPoints.length === 0) {
    return (
      <div className="bg-[#10151D] border border-[#1E2736] p-6 text-center text-sm text-[#8793A3] rounded">
        No active data series selected for display.
      </div>
    );
  }

  const xValues = allPoints.map(p => p.x);
  const yValues = allPoints.map(p => p.y);

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  // Margins
  const paddingLeft = 68;
  const paddingRight = 32;
  const paddingTop = 32;
  const paddingBottom = 54;
  const svgWidth = 720;
  const svgHeight = height;

  const plotWidth = svgWidth - paddingLeft - paddingRight;
  const plotHeight = svgHeight - paddingTop - paddingBottom;

  // Add a slight margin to axes for visual breathing room
  const xSpan = (maxX - minX) === 0 ? 1 : (maxX - minX);
  const ySpan = (maxY - minY) === 0 ? 1 : (maxY - minY);
  const axisMinX = Math.max(0, minX - xSpan * 0.05);
  const axisMaxX = maxX + xSpan * 0.08;
  const axisMinY = Math.max(0, minY - ySpan * 0.05);
  const axisMaxY = maxY + ySpan * 0.12;

  const scaleX = (val: number) => paddingLeft + ((val - axisMinX) / (axisMaxX - axisMinX)) * plotWidth;
  const scaleY = (val: number) => paddingTop + plotHeight - ((val - axisMinY) / (axisMaxY - axisMinY)) * plotHeight;

  // Ticks
  const numXTicks = 6;
  const numYTicks = 5;
  const xTicks = Array.from({ length: numXTicks }, (_, i) => axisMinX + (i / (numXTicks - 1)) * (axisMaxX - axisMinX));
  const yTicks = Array.from({ length: numYTicks }, (_, i) => axisMinY + (i / (numYTicks - 1)) * (axisMaxY - axisMinY));

  // Default color palette
  const colors = ['#00D9FF', '#64E8D2', '#FFB800', '#FF5C5C', '#A78BFA'];

  // Toggle series visibility
  const toggleSeries = (index: number) => {
    setActiveSeriesIndices(prev => 
      prev.includes(index)
        ? prev.length > 1 ? prev.filter(i => i !== index) : prev
        : [...prev, index]
    );
  };

  // CSV export handler
  const handleExportCSV = () => {
    let csv = `Series,${series[0]?.xLabel || 'X'} (${series[0]?.xUnit || ''}),${series[0]?.yLabel || 'Y'} (${series[0]?.yUnit || ''}),Annotation\n`;
    series.forEach(s => {
      s.data.forEach(d => {
        csv += `"${s.seriesName}",${d.x},${d.y},"${d.label || ''}"\n`;
      });
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_data.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const primaryX = series[0]?.xLabel || 'Independent Variable';
  const primaryXUnit = series[0]?.xUnit || '';
  const primaryY = series[0]?.yLabel || 'Dependent Variable';
  const primaryYUnit = series[0]?.yUnit || '';

  return (
    <div className="bg-[#10151D] border border-[#1E2736] rounded p-4 flex flex-col gap-3 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E2736]/70 pb-3">
        <div>
          <h4 className="text-sm font-semibold text-[#E8EDF3] tracking-wide flex items-center gap-2">
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs text-[#8793A3] mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="text-[11px] font-mono text-[#8793A3] hover:text-[#00D9FF] hover:border-[#00D9FF]/40 border border-[#1E2736] px-2.5 py-1 rounded transition-colors whitespace-nowrap"
            title="Download verified plot points as CSV"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Series Toggles / Legend */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[#8793A3] font-mono text-[11px] mr-1">SERIES:</span>
        {series.map((s, idx) => {
          const isActive = activeSeriesIndices.includes(idx);
          const color = s.color || (s.isBaseline1g ? '#8793A3' : colors[idx % colors.length]);
          return (
            <button
              key={idx}
              onClick={() => toggleSeries(idx)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-all border whitespace-nowrap ${
                isActive
                  ? 'border-[#2A364A] bg-[#151C26] text-[#E8EDF3]'
                  : 'border-[#1E2736] bg-transparent text-[#8793A3] opacity-40 line-through'
              }`}
            >
              <span
                className="w-2.5 h-0.5 inline-block"
                style={{
                  backgroundColor: color,
                  borderBottom: s.isBaseline1g ? '1px dashed #8793A3' : 'none'
                }}
              />
              <span>{s.seriesName}</span>
              {s.isBaseline1g && <span className="text-[10px] text-[#8793A3]">(1g Baseline)</span>}
            </button>
          );
        })}
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full overflow-x-auto select-none bg-[#080B10] border border-[#1E2736]/80 rounded p-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-w-full"
          style={{ minWidth: '480px' }}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Subtle Hairline Grid */}
          <g className="grid-lines" stroke="#1E2736" strokeDasharray="2,2" strokeWidth="0.8">
            {xTicks.map((x, i) => (
              <line
                key={`grid-x-${i}`}
                x1={scaleX(x)}
                y1={paddingTop}
                x2={scaleX(x)}
                y2={paddingTop + plotHeight}
              />
            ))}
            {yTicks.map((y, i) => (
              <line
                key={`grid-y-${i}`}
                x1={paddingLeft}
                y1={scaleY(y)}
                x2={paddingLeft + plotWidth}
                y2={scaleY(y)}
              />
            ))}
          </g>

          {/* Axes Lines */}
          <line
            x1={paddingLeft}
            y1={paddingTop}
            x2={paddingLeft}
            y2={paddingTop + plotHeight}
            stroke="#2A364A"
            strokeWidth="1.2"
          />
          <line
            x1={paddingLeft}
            y1={paddingTop + plotHeight}
            x2={paddingLeft + plotWidth}
            y2={paddingTop + plotHeight}
            stroke="#2A364A"
            strokeWidth="1.2"
          />

          {/* X-Axis Ticks & Labels */}
          {xTicks.map((x, i) => {
            const sx = scaleX(x);
            return (
              <g key={`xtick-${i}`}>
                <line
                  x1={sx}
                  y1={paddingTop + plotHeight}
                  x2={sx}
                  y2={paddingTop + plotHeight + 5}
                  stroke="#8793A3"
                  strokeWidth="1"
                />
                <text
                  x={sx}
                  y={paddingTop + plotHeight + 18}
                  fill="#8793A3"
                  fontSize="10"
                  fontFamily="IBM Plex Mono"
                  textAnchor="middle"
                >
                  {x.toFixed(xSpan < 10 ? 1 : 0)}
                </text>
              </g>
            );
          })}

          {/* Y-Axis Ticks & Labels */}
          {yTicks.map((y, i) => {
            const sy = scaleY(y);
            return (
              <g key={`ytick-${i}`}>
                <line
                  x1={paddingLeft - 5}
                  y1={sy}
                  x2={paddingLeft}
                  y2={sy}
                  stroke="#8793A3"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={sy + 3.5}
                  fill="#8793A3"
                  fontSize="10"
                  fontFamily="IBM Plex Mono"
                  textAnchor="end"
                >
                  {y.toFixed(ySpan < 5 ? 2 : ySpan < 20 ? 1 : 0)}
                </text>
              </g>
            );
          })}

          {/* Axis Titles */}
          <text
            x={paddingLeft + plotWidth / 2}
            y={paddingTop + plotHeight + 40}
            fill="#E8EDF3"
            fontSize="11"
            fontFamily="IBM Plex Sans"
            textAnchor="middle"
            fontWeight="500"
          >
            {primaryX} {primaryXUnit ? `[${primaryXUnit}]` : ''}
          </text>
          <text
            transform={`rotate(-90)`}
            x={-(paddingTop + plotHeight / 2)}
            y={18}
            fill="#E8EDF3"
            fontSize="11"
            fontFamily="IBM Plex Sans"
            textAnchor="middle"
            fontWeight="500"
          >
            {primaryY} {primaryYUnit ? `[${primaryYUnit}]` : ''}
          </text>

          {/* Data Series Curves */}
          {series.map((s, idx) => {
            if (!activeSeriesIndices.includes(idx)) return null;
            const color = s.color || (s.isBaseline1g ? '#8793A3' : colors[idx % colors.length]);

            // Construct smooth line path
            const pathData = s.data.reduce((acc, point, pIdx) => {
              const xPos = scaleX(point.x);
              const yPos = scaleY(point.y);
              return pIdx === 0 ? `M ${xPos} ${yPos}` : `${acc} L ${xPos} ${yPos}`;
            }, '');

            return (
              <g key={`series-${idx}`}>
                <path
                  d={pathData}
                  fill="none"
                  stroke={color}
                  strokeWidth={s.isBaseline1g ? "1.5" : "2.2"}
                  strokeDasharray={s.isBaseline1g ? "4,4" : "none"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Point nodes */}
                {s.data.map((point, pIdx) => {
                  const px = scaleX(point.x);
                  const py = scaleY(point.y);
                  const isHovered = hoveredPoint?.x === point.x && hoveredPoint?.y === point.y && hoveredPoint?.seriesName === s.seriesName;

                  return (
                    <g key={`point-${pIdx}`}>
                      <circle
                        cx={px}
                        cy={py}
                        r={isHovered ? 5.5 : 3.5}
                        fill={isHovered ? '#FFFFFF' : color}
                        stroke="#080B10"
                        strokeWidth="1.5"
                        className="cursor-crosshair transition-all"
                        onMouseEnter={() => {
                          setHoveredPoint({
                            x: point.x,
                            y: point.y,
                            seriesName: s.seriesName,
                            screenX: px,
                            screenY: py,
                            label: point.label
                          });
                        }}
                      />
                      {/* Optional inline label for critical transitions */}
                      {point.label && (
                        <g>
                          <line
                            x1={px}
                            y1={py - 6}
                            x2={px}
                            y2={py - 18}
                            stroke={color}
                            strokeWidth="1"
                            strokeDasharray="2,2"
                          />
                          <text
                            x={px}
                            y={py - 22}
                            fill="#E8EDF3"
                            fontSize="9"
                            fontFamily="IBM Plex Mono"
                            textAnchor="middle"
                            className="bg-[#151C26] font-medium"
                          >
                            {point.label}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Interactive Crosshair & Tooltip Overlay */}
          {hoveredPoint && (
            <g pointerEvents="none">
              {/* Vertical Crosshair */}
              <line
                x1={hoveredPoint.screenX}
                y1={paddingTop}
                x2={hoveredPoint.screenX}
                y2={paddingTop + plotHeight}
                stroke="#00D9FF"
                strokeWidth="0.8"
                strokeDasharray="3,3"
                opacity="0.8"
              />
              {/* Horizontal Crosshair */}
              <line
                x1={paddingLeft}
                y1={hoveredPoint.screenY}
                x2={paddingLeft + plotWidth}
                y2={hoveredPoint.screenY}
                stroke="#00D9FF"
                strokeWidth="0.8"
                strokeDasharray="3,3"
                opacity="0.8"
              />
            </g>
          )}
        </svg>

        {/* Floating Telemetry HUD Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute top-3 right-3 bg-[#151C26]/95 border border-[#00D9FF]/40 rounded p-2.5 text-xs shadow-lg backdrop-blur-sm pointer-events-none"
            style={{ minWidth: '180px' }}
          >
            <div className="text-[10px] font-mono text-[#00D9FF] tracking-wider uppercase border-b border-[#1E2736] pb-1 mb-1.5">
              {hoveredPoint.seriesName}
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-[11px]">
              <span className="text-[#8793A3]">{primaryX}:</span>
              <span className="text-[#E8EDF3] text-right font-medium">
                {hoveredPoint.x} {primaryXUnit}
              </span>
              <span className="text-[#8793A3]">{primaryY}:</span>
              <span className="text-[#00D9FF] text-right font-bold">
                {hoveredPoint.y} {primaryYUnit}
              </span>
            </div>
            {hoveredPoint.label && (
              <div className="mt-1.5 pt-1.5 border-t border-[#1E2736] text-[10px] text-[#64E8D2] font-mono">
                {hoveredPoint.label}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer / Provenance info */}
      {(sourceAttribution || notes) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#8793A3] font-mono border-t border-[#1E2736]/60 pt-2 gap-1">
          {sourceAttribution && (
            <span>DATA SOURCE: <span className="text-[#E8EDF3]">{sourceAttribution}</span></span>
          )}
          {notes && (
            <span className="text-[#8793A3]/80 italic">{notes}</span>
          )}
        </div>
      )}
    </div>
  );
};
