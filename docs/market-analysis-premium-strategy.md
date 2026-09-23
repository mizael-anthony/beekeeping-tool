# Beekeeping Tool — Project & Market Brief

Date: 2026-09-23

## 1. Project summary

**What it is:** Next.js 16 + React 19 + TypeScript web app for beekeepers to score hive risk and track reports. Auth + Postgres backend (currently Supabase — migration planned, see §8). Tailwind v4 + shadcn/Radix UI.

**Current features:**
- Email/password auth.
- Manual risk report per hive: 4 factors (climate, disease, floral availability, colony resilience), each rated 1–3.
- Scoring in [`services/calculateRisk.ts`](../services/calculateRisk.ts): sum of the 4 factors (range 4–12) → Faible (≤6) / Modéré (7–9) / Élevé (>9), each with a fixed French conclusion sentence.
- Dashboard: list/filter reports by hive and risk level, aggregate stats (total, average, count by level), create/edit/delete.
- `beehive` is a free-text field — no real hive/apiary entity, no history per hive, no GPS.

**Structural gaps (pre-premium):**
- No `organization`/`apiary`/`hive` data model — everything is a flat `reports` table keyed by `user_id` and a text field.
- No multi-user / role support (single owner per report).
- Dashboard routes have no server-side auth guard (only the API checks `getUser()`).
- Risk factors are manually guessed, not derived from real data (weather, mite counts, flowering calendars).
- Duplicated/unused code paths (`actions/`, `app/actions/`, untracked `app/actions/actions/`; a duplicated dashboard component).
- Backend is coupled to Supabase (auth, Postgres, RLS) — migration to another provider is planned; target not yet chosen.

## 2. Market evolution (why "premium" is viable now)

- **Colony losses are at record highs and rising.** US beekeepers lost 55.6% of colonies in 2024–2025 (worst on record), driven by varroa mite resistance to standard treatment (amitraz) and vectored viruses (DWV in ~90% of failed colonies). Operations under 50 colonies lose at 2–3× the rate of operations over 500. → Early, non-subjective risk detection has rising, provable value.
- **Traceability has shifted from optional to a market entry requirement.** EU import checks increasingly require defensible origin/quality data; the blockchain/traceability honey-tech market is forecast at ~21% CAGR, with Asia-Pacific (smallholder-heavy, like Madagascar) as the fastest-growing region.
- **Precision-beekeeping adoption is accelerating.** Hive-monitoring systems market ~$0.34B (2026) → ~$0.8B (2034), 12.5% CAGR, but existing players (BeeHero, Arnia, BroodMinder) sell hardware-dependent IoT sensors priced for commercial US/EU pollination fleets — not viable in low-power, low-connectivity smallholder settings.
- **Direct-to-smallholder SaaS pricing does not work in this market.** Established African agritech finding: a $20/month product fails against ~$100/month farmer income. Working models: cooperative-pays, commission/market-access, not individual subscriptions.
- **Madagascar-specific:** honey trade history shows a quality/traceability bottleneck, not a supply bottleneck — the country once exported 65% of a 38,000-tonne harvest (1920s–40s) before losing that market to EU hygiene-standard embargoes (1951, 1996); modern exporters compete on meeting moisture/purity/traceability standards. Madagascar's ecosystems support up to 4 harvests/year vs. the global norm of one — production ceiling is high, the blocker is provable quality/origin.

**Stated problem:** Smallholder beekeepers in climate-exposed regions lose colonies and income because risk isn't detected early and quality can't be proven to buyers; existing software is priced/designed for a beekeeper this market doesn't have.

## 3. Competitive landscape

| Segment | Examples | Model | Fit for this market |
|---|---|---|---|
| Hobbyist logbook | HiveTracks (free ≤5 hives / $9.99/mo), ApiaryBook, Beetight | Per-individual subscription | Partial — record-keeping only, no field-risk intelligence, no org layer |
| IoT sensor platforms | BeeHero, Arnia, BroodMinder | Hardware + per-hive/season, B2B | No — hardware cost/connectivity unrealistic for smallholders |
| Traceability/blockchain | Intertek HoneyTrace, FoodTraze, SourceTrace | Enterprise, sold to processors/exporters | Adjacent — solves export compliance only |
| **This project's gap** | — | Org/cooperative subscription | Combines low-tech risk detection + org-level rollout + export traceability — no found competitor covers all three for this market |

## 4. Target customer (client-pays, not grant-funded)

Demand concentrates in the ~15% of Malagasy beekeepers already integrated with a cooperative/factory (vs. ~50% wild-swarm gatherers, ~35% traditional swarm-hunters, who won't buy software directly) and in the organizations aggregating them.

1. **Primary: regional producer organization / cooperative.** Pays because colony losses and unverifiable honey already cost it money — reducing losses (risk detection) and proving quality (traceability) directly raises what it earns. This must hold true with no NGO/donor involved.
2. **Secondary: exporter** (e.g., Honey of Madagascar, Compagnie du Miel/TBK) — pays for traceability data once cooperatives are producing it, to raise what it can charge EU buyers.
3. Donor/NGO programs (e.g., an FAO/GIZ-type forest-and-farm initiative) can be a distribution **channel** (pilot funding, introductions) but are not the business model — grant-funded usage stops when the grant does.

Note: not every partner logo implies a customer or standards role — verify actual partner relationships before assuming a role (e.g., a university logo indicates a technical/talent partner, not a buyer or certifier).

## 5. Premium feature set

**A. Real risk detection** (replaces guessed 1–3 inputs)
- Climate factor ← live weather at apiary GPS (rain/heat/cyclone risk).
- Disease factor ← varroa mite count per 100 bees (field-measurable), not a guess.
- Floral factor ← regional flowering calendar.
- Trend per hive/apiary over time; flag apiaries needing a visit.

**B. Organization/cooperative management** (how it's sold — B2B)
- `organization → apiary → hive → inspection/treatment → harvest` data model.
- Roles: Owner / Admin / Technician / Beekeeper / Viewer; invite links; activity log.
- Priced per technician-seat or per apiary-under-management, invoiced — not per individual beekeeper.

**C. Traceability & export compliance**
- Hive → harvest → lot linkage with inspection/treatment history.
- Export-ready PDF/CSV reports (moisture, origin, treatment history).

## 6. Pricing tiers

| Tier | Buyer | Includes | Logic |
|---|---|---|---|
| Free | Individual | ≤5 hives, manual reports | Acquisition/demo |
| Pro | Individual with connectivity | Unlimited hives, automated weather risk, alerts | ~comparable to HiveTracks ceiling ($9.99/mo) |
| Organization | Cooperative / exporter | Multi-user management, technician seats, regional dashboards, traceability exports, API | Per-seat or per-apiary, invoiced — main revenue tier |

## 7. AI/LLM fit

No training now — the app has no data of its own yet. Use existing model APIs, no training required:
1. **Photo-based pest/disease triage** (assistive, human-confirmed) — varroa/foulbrood from a photo, via an existing vision-capable model API. Confirmed labels accumulate into a future training set.
2. **Personalized risk guidance** — LLM call over the already-computed risk factors/trend to generate specific French/Malagasy guidance, replacing the current fixed conclusion sentence.

Not a good LLM fit: climate/yield forecasting itself (tabular prediction problem — statistics or a small trained model once real outcome history exists).
Training a specialized model becomes justified only after 1–2 seasons of technician-confirmed field labels/outcomes exist.
Constraint: field connectivity is poor — AI calls need the same offline-queue pattern as other field data capture.

## 8. Roadmap order

**Product split:** web app = dashboard/analysis/org management only, no field data entry. Mobile app = field data capture (inspections, GPS, mite counts, photos) — the source of the real risk-factor data the web dashboard displays.

1. Data model: `organization → apiary → hive → inspection/treatment → harvest` (everything else depends on this).
2. Mobile app for field data capture (offline-first; PWA before native — reuses existing stack, avoids field-connectivity failure). This is what feeds real inspection/mite/GPS data into the risk engine; without it the web dashboard has nothing real to show.
3. Weather-based climate risk (cheapest automated signal; e.g. Open-Meteo, keyed off apiary GPS captured in step 2).
4. Organization/technician layer on the web dashboard (this is the sellable unit).
5. Traceability/export reporting (built from data captured in 1–3).
6. AI features (§7) — photo triage depends on the mobile capture pipeline from step 2.
7. Backend migration off Supabase (target provider TBD — pick with the organization/RLS-by-cooperative model in mind, not as a like-for-like swap).

## Sources
- [Insights from U.S. beekeeper triage surveys following unusually high honey bee colony losses 2024-2025](https://www.biorxiv.org/content/10.1101/2025.08.06.668930.full.pdf)
- [U.S. beekeepers lose 55.6% of honey bee colonies as resistant mites fuel worst die-off on record](https://www.thecooldown.com/green-tech/honeybee-colony-decline-us-survey/)
- [Hive Monitoring Systems Market Research Report 2034](https://marketintelo.com/report/hive-monitoring-systems-market)
- [Blockchain Honey Traceability Market Size to Hit USD 1243.76 Million by 2034](https://growthmarketreports.com/report/blockchain-honey-traceability-market)
- [Beekeeping Software Comparison 2026](https://beekeeping-diary.eu/blog/en/beekeeping-software-comparison-2026/)
- [Cost of Hive Tracks — Beesource forum](https://www.beesource.com/threads/cost-of-hive-tracks.355615/)
- [African agtech: Why selling to smallholders is not a good business model](https://www.agnavigator.com/Article/2026/01/22/african-agtech-why-selling-to-smallholders-is-not-a-good-business-model/)
- [Beekeeping in Madagascar | Naturevolution](https://www.naturevolution.org/en/what-do-we-do/conservation-development/economic-activities/beekeeping-in-madagascar/)
- [About us | Honey of Madagascar](https://www.honeyofmadagascar.com/apropos.php)
