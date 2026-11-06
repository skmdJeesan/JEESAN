"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { Calendar, GitBranch, GitCommit, Star } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { animate } from "motion";
import Reveal from "@/utils/Reveal";

interface Props { username: string; }

interface GithubStats {
  user: { totalContribution: number; };
  contributions: {
    count: number;
    date: string;
  }[];
}

interface ContrubutionProps {
  day: { count: number; date: string };
  level_class: string;
}

const CountUp = ({ to, decimals = 0, duration = 1.2, className }: {
  to: number, decimals?: number,
  duration?: number, className?: string
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const in_view = useInView(ref, { once: true, amount: 0.5 })
  const reduce_motion = useReducedMotion()
  const [value, set_value] = useState(0)

  useEffect(() => {
    if (!in_view) return
    if (reduce_motion) return
    const controls = animate(0, to, { duration, ease: 'easeOut', onUpdate: set_value })
    return () => controls.stop()
  }, [in_view, to, duration, reduce_motion])

  const display_value = reduce_motion && in_view ? to : value

  return (
    <span ref={ref} className={className}>
      {display_value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  )
}

const ContributionCell = ({ day, level_class }: ContrubutionProps) => {
  const [open, setOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const label = `${day.count} contribution${day.count === 1 ? "" : "s"} on ${new Date(
    day.date
  ).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;

  useLayoutEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const button = buttonRef.current?.getBoundingClientRect();
      const tooltip = tooltipRef.current?.getBoundingClientRect();
      if (!button || !tooltip) return;

      const left = Math.max(
        8,
        Math.min(
          button.left + button.width / 2 - tooltip.width / 2,
          window.innerWidth - tooltip.width - 8
        )
      );
      const above = button.top - tooltip.height - 8;
      const top =
        above >= 8
          ? above
          : Math.min(button.bottom + 8, window.innerHeight - tooltip.height - 8);

      setTooltipPosition({ left, top: Math.max(8, top) });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
        onPointerLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          // touch screens have no hover, so a tap toggles the tooltip
          if ((e.nativeEvent as PointerEvent).pointerType === "touch") setOpen((o) => !o);
        }}
        className={`block h-6 w-6 rounded-sm transition-colors duration-300 hover:bg-white hover:scale-110 sm:h-8 sm:w-8 ${level_class}`}
      />

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            className="pointer-events-none fixed z-50 max-w-[calc(100vw-1rem)] whitespace-nowrap bg-slate-200 px-2 py-1 text-xs font-semibold text-zinc-900 shadow-lg"
            style={tooltipPosition}
          >
            {label}
          </div>,
          document.body
        )}
    </div>
  );
};

const GithubStats = ({ username }: Props) => {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const response = await fetch(`/api/github?username=${username}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`)
        }
        const data = await response.json();
        setStats(data)
      } catch (error) {
        setError("failed to fetch github stats")
        console.error(error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchGithubStats();
  }, [username])

  if (loading) {
    return (
      <div className="p-4 lg:p-6">
        <div className="space-y-4">
          <div className="h-4 bg-zinc-700 rounded w-3/4" />
          <div className="h-8 bg-zinc-700 rounded " />
          <div className="h-32 bg-zinc-700 rounded " />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-slate-200/20 bg-zinc-800/50 p-4 sm:p-6">
        <p className="text-slate-300">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  // Calculate current streak
  const currentStreak = stats.contributions.slice().reverse().reduce((streak, day, index) => {
    if (index === 0 && day.count === 0) return 0;
    if (day.count > 0) return streak + 1;
    return streak;
  }, 0)

  // Calculate max contributions in a day
  const maxContributions = Math.max(...stats.contributions.map(day => day.count));

  // Calculate contribution levels
  const getContributionLevel = (count: number) => {
    if (count === 0) return "bg-zinc-700";
    const percentage = (count / maxContributions) * 100;

    if (percentage <= 25) return "bg-slate-400";
    if (percentage <= 50) return "bg-slate-200";
    if (percentage <= 75) return "bg-slate-100";

    return "bg-slate-200";
  }

  return (
    <div className="overflow-hidden bg-zinc-900/40 p-1">
      <div className="space-y-2 sm:space-y-3">
        <Reveal className="relative w-full">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-slate-200/10">
              <GitCommit className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">
              Contribution Activity
            </h3>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3">
          <Reveal className="relative h-full w-full overflow-hidden" motionClassName="h-full">
            <div className="group h-full border border-slate-200/20 bg-zinc-800/60 p-4 transition-colors duration-300 hover:bg-slate-200 hover:text-zinc-900">
              <Calendar className="mb-2 h-4 w-4 text-slate-300 group-hover:text-zinc-700 sm:h-5 sm:w-5" />
              <p className="text-sm text-slate-300 group-hover:text-zinc-700">Current Streak</p>
              <p className="text-xl sm:text-2xl font-bold">
                <CountUp to={currentStreak} /> days
              </p>
            </div>
          </Reveal>

          <Reveal className="relative h-full w-full overflow-hidden" motionClassName="h-full">
            <div className="group h-full   border border-slate-200/20 bg-zinc-800/60 p-4 transition-colors duration-300 hover:bg-slate-200 hover:text-zinc-900">
              <GitBranch className="mb-2 h-4 w-4 text-slate-300 group-hover:text-zinc-700 sm:h-5 sm:w-5" />
              <p className="text-sm text-slate-300 group-hover:text-zinc-700">Total Contributions</p>
              <p className="text-xl sm:text-2xl font-bold">
                <CountUp to={stats.user.totalContribution} duration={1.6} />
              </p>
            </div>
          </Reveal>

          <Reveal className="relative h-full w-full overflow-hidden sm:col-span-2 lg:col-span-1" motionClassName="h-full">
            <div className="group h-full   border border-slate-200/20 bg-zinc-800/60 p-4 transition-colors duration-300 hover:bg-slate-200 hover:text-zinc-900">
              <Star className="mb-2 h-4 w-4 text-slate-300 group-hover:text-zinc-700 sm:h-5 sm:w-5" />
              <p className="text-sm text-slate-300 group-hover:text-zinc-700">Best Day</p>
              <p className="text-xl sm:text-2xl font-bold">
                <CountUp to={maxContributions} /> commits
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative w-full">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-200/70">Last 30 days</h4>
            <div className="overflow-x-auto scrollbar-hide pb-4">
              <div className="grid grid-rows-1 grid-flow-col gap-1 min-w-150">
                {stats.contributions.slice(-30).map((day) => (
                  <ContributionCell
                    key={day.date}
                    day={day}
                    level_class={getContributionLevel(day.count)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};

export default GithubStats;