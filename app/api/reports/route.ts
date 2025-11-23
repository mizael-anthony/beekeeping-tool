import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { levelFromScore } from "@/services/calculateRisk";
import { Report } from "@/types/report";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const numericId = id ? Number(id) : null;
    if (id && Number.isNaN(numericId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    let query = supabase
      .from("reports")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (numericId !== null) {
      query = query.eq("id", numericId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const reports: Report[] = (data ?? []).map((row) => ({
      id: row.id,
      beehive: row.beehive,
      conclusion: row.conclusion,
      climate: row.climatic_impact,
      disease: row.disease_impact,
      floral: row.floral_availability,
      resilience: row.colony_resilience,
      score: row.score,
      level: levelFromScore(row.score),
      created_at: row.created_at ?? undefined,
    }));

    return NextResponse.json({ data: reports });
  } catch (err) {
    console.error("Error fetching reports", err);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des rapports" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const numericId = id ? Number(id) : null;
    if (numericId === null || Number.isNaN(numericId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const { error } = await supabase
      .from("reports")
      .delete()
      .eq("id", numericId)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting report", err);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du rapport" },
      { status: 500 }
    );
  }
}
