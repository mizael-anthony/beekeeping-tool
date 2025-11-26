# Beekeeping Tool

Application Next.js 16 pour suivre les ruches, anticiper la production de miel et qualifier les risques sanitaires/environnementaux via des rapports scorés.

## Fonctionnalités
- Authentification Supabase (email/mot de passe) et sessions gérées côté serveur.
- Tableau de bord des rapports avec filtres (ruche, niveau de risque) et statistiques instantanées (totaux, moyenne, répartition des niveaux).
- Création/édition/suppression d’un rapport avec calcul automatique du score global et d’une conclusion guidée.
- Calcul du risque basé sur 4 facteurs (climat, maladies, floraison, résilience) notés de 1 à 3 ; seuils : >9 Élevé, >6 Modéré, sinon Faible.
- Interface responsive en Tailwind v4 + composants shadcn/radix, cohérente avec la charte ambrée du projet.

## Pile technique
- Next.js 16 (App Router) • React 19 • TypeScript strict
- Tailwind CSS v4 + shadcn UI/Radix + Lucide icons
- Supabase (auth + Postgres) avec clients SSR/edge/browser
- next-safe-action pour les actions serveur typées

## Démarrage rapide
1. Installer les dépendances : `pnpm install`
2. Créer `.env.local` à la racine :
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
3. Lancer le dev server : `pnpm dev` puis ouvrir http://localhost:3000
4. Lint (recommandé avant PR) : `pnpm lint`
5. Build/preview prod : `pnpm build` puis `pnpm start`

## Modèle Supabase
Créer la table `reports` (adapter les noms de schéma si besoin) :
```sql
create table if not exists public.reports (
  id bigserial primary key,
  beehive text not null,
  climatic_impact int not null,
  disease_impact int not null,
  floral_availability int not null,
  colony_resilience int not null,
  score numeric not null,
  conclusion text,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

-- (Optionnel mais recommandé) RLS par utilisateur
alter table public.reports enable row level security;
create policy "User owns their reports"
  on public.reports for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

## Structure utile
- `app/` : routes App Router (accueil, auth, dashboard, API `/api/reports`).
- `components/` : UI shadcn + formulaires (auth, rapports, dashboard).
- `services/calculateRisk.ts` : logique de scoring et niveaux de risque.
- `lib/supabase/` : clients Supabase (browser, server, middleware).
- `types/` : schémas Zod et types partagés.

## Parcours utilisateur
1) Créer un compte depuis `/sign-up` ou se connecter via `/sign-in`.  
2) Depuis `/dashboard`, filtrer ou créer un rapport (`Nouveau rapport`).  
3) Saisir les 4 facteurs (1=faible, 3=élevé) : le score et la conclusion sont calculés automatiquement.  
4) Modifier ou supprimer un rapport via la liste du tableau de bord.  

## Scripts npm
- `pnpm dev` : serveur de développement.
- `pnpm lint` : lint Next.js + TypeScript.
- `pnpm build` / `pnpm start` : build et preview production.
