import { getGraphProfileVisits } from "@/actions/dashboard/get-graph-clicks";
import { getLinksCount } from "@/actions/dashboard/get-url-count";
import { auth } from "@/auth";
import { Dashboard } from "@/components/dashboard/Dashboard";
export default async function DashboardPage() {

  const session = await auth();

  const visits = await getGraphProfileVisits(session?.user.id);
  const getUrlData = await getLinksCount(session?.user.id);

  return (
    <>
      <Dashboard chartData={visits} urlData={getUrlData} />
    </>
  );
}