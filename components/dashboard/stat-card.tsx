"use client";

import { Card } from "@/components/ui/card";

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description?: boolean;
};

export function StatCard({ icon, label, value, description }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-amber-700">{label}</p>
        <p
          className={
            description
              ? "text-base font-semibold text-amber-900"
              : "text-2xl font-bold text-amber-900"
          }
        >
          {value}
        </p>
      </div>
      <div className="rounded-lg bg-amber-100 p-3 sm:ml-auto sm:self-center">{icon}</div>
    </Card>
  );
}
