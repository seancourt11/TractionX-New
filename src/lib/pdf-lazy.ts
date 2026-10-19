/**
 * Lazy wrappers around the PDF generators.
 *
 * `@/lib/pdf` pulls in jsPDF (~350KB). Importing it statically put that weight
 * into the initial bundle of every page that renders an estimator, planner or
 * pricing gate. These wrappers defer the import until the user actually clicks
 * a download button.
 */

import type { EstimatorConfig } from "@/lib/estimator";
import type { PlanAnswers } from "@/lib/booth-plan";
import type { PricingRegion } from "@/data/pricing-tiers";

const load = () => import("@/lib/pdf");

export async function generatePricingGuide(
  recipientName?: string,
  region: PricingRegion = "us",
): Promise<void> {
  const m = await load();
  m.generatePricingGuide(recipientName, region);
}

export async function generateEstimateBreakdown(
  config: EstimatorConfig,
  opts?: { name?: string; shareUrl?: string },
): Promise<void> {
  const m = await load();
  m.generateEstimateBreakdown(config, opts);
}

export async function generateBoothPlan(
  answers: PlanAnswers,
  contact?: { name?: string; company?: string; email?: string },
): Promise<void> {
  const m = await load();
  m.generateBoothPlan(answers, contact);
}
