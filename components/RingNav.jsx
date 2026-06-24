"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import { useProgress } from "@/app/hooks/useProgress";
import { isGuideComplete } from "@/data/guides";
import { ui } from "@/lib/ui-strings";

const SHORT = {
  "accommodation": "shortHome",
  "bank-account": "shortBank",
  "national-insurance": "shortNI",
};

const CX = 130, CY = 130, R_OUT = 112, R_IN = 64, GAP = 6; // GAP in degrees

const polar = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};
const sectorPath = (a1, a2) => {
  const [x1, y1] = polar(R_OUT, a1);
  const [x2, y2] = polar(R_OUT, a2);
  const [x3, y3] = polar(R_IN, a2);
  const [x4, y4] = polar(R_IN, a1);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${R_OUT} ${R_OUT} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${R_IN} ${R_IN} 0 ${large} 0 ${x4} ${y4} Z`;
};

export default function RingNav({ essentials }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const { progress } = useProgress();

  const isComplete = (g) => isGuideComplete(g, progress);
  const doneCount = essentials.filter(isComplete).length;

  const go = (href) => router.push(href);
  const onKey = (e, href) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(href); }
  };

  return (
    <div className="ring-wrap">
      <svg viewBox="0 0 260 260" className="ring" role="group" aria-label={ui.essentialsLabel[lang]}>
        {essentials.slice(0, 3).map((g, i) => {
          const a1 = -90 + i * 120 + GAP / 2;
          const a2 = -90 + (i + 1) * 120 - GAP / 2;
          const mid = -90 + i * 120 + 60;
          const [lx, ly] = polar((R_OUT + R_IN) / 2, mid);
          const done = isComplete(g);
          const href = `/guides/${g.slug}`;
          const short = ui[SHORT[g.slug]] ? ui[SHORT[g.slug]][lang] : g.title[lang];
          return (
            <g
              key={g.slug}
              className={`ring-seg ${done ? "done" : ""}`}
              role="link"
              tabIndex={0}
              aria-label={`${short}${done ? " - " + ui.completeWord[lang] : ""}`}
              onClick={() => go(href)}
              onKeyDown={(e) => onKey(e, href)}
            >
              <path d={sectorPath(a1, a2)} />
              <text x={lx} y={ly - 2} textAnchor="middle" className="seg-label">{short}</text>
              {done && <text x={lx} y={ly + 15} textAnchor="middle" className="seg-state">{"\u2713"}</text>}
            </g>
          );
        })}

        <g
          className="ring-center"
          role="link"
          tabIndex={0}
          aria-label={ui.dashboard[lang]}
          onClick={() => go("/profile")}
          onKeyDown={(e) => onKey(e, "/profile")}
        >
          <circle cx={CX} cy={CY} r={R_IN - 8} />
          <text x={CX} y={CY - 2} textAnchor="middle" className="center-num">{doneCount}/3</text>
          <text x={CX} y={CY + 16} textAnchor="middle" className="center-label">{ui.progressDone[lang]}</text>
        </g>
      </svg>
    </div>
  );
}
