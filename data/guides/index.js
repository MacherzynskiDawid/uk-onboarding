import { beforeArrival } from "./before-arrival";
import { accommodation } from "./accommodation";
import { bankAccount } from "./bank-account";
import { nationalInsurance } from "./national-insurance";
import { nhsRegistration } from "./nhs-registration";
import { drivingLicence } from "./driving-licence";
import { citizenship } from "./citizenship";

const all = [
  beforeArrival,
  accommodation,
  bankAccount,
  nationalInsurance,
  nhsRegistration,
  drivingLicence,
  citizenship,
];

export const guidesInOrder = [...all].sort((a, b) => a.order - b.order);
export const guidesBySlug = Object.fromEntries(all.map((g) => [g.slug, g]));
export const getGuide = (slug) => guidesBySlug[slug];

export const stepCount = (g) =>
  g.sections ? g.sections.reduce((n, s) => n + s.steps.length, 0) : (g.steps ? g.steps.length : 0);

// Progress key for one path of a path-choice guide (each path tracked separately).
export const pathKey = (g, i) => `${g.slug}__p${i}`;

// A path-choice guide is complete when ANY one path is fully done.
export const isGuideComplete = (g, progress) => {
  if (g.pathChoice && g.sections) {
    return g.sections.some((sec, i) => (progress[pathKey(g, i)]?.length || 0) >= sec.steps.length);
  }
  const total = stepCount(g);
  return total > 0 && (progress[g.slug]?.length || 0) >= total;
};

// {done, total} for display. For path-choice guides, report the path with the most progress.
export const guideProgress = (g, progress) => {
  if (g.pathChoice && g.sections) {
    let best = { done: 0, total: g.sections[0]?.steps.length || 0 };
    g.sections.forEach((sec, i) => {
      const done = Math.min(progress[pathKey(g, i)]?.length || 0, sec.steps.length);
      if (done >= best.done) best = { done, total: sec.steps.length };
    });
    return best;
  }
  const total = stepCount(g);
  return { done: Math.min(progress[g.slug]?.length || 0, total), total };
};
