import EditReportPage from "@/components/report/edit-report-page";

type EditReportRouteProps = {
  params: { id: string | string[] };
};

export default function EditReportRoute({ params }: EditReportRouteProps) {
  const reportId = Array.isArray(params.id) ? params.id[0] : params.id;
  return <EditReportPage reportId={reportId} />;
}
