import ActivityList from "../components/home/ActivityList";
import OverviewDashboard from "../components/home/OverviewDashboard";
import PageHeader from "../components/home/PageHeader";

export default function Home() {
  return (
    <>
      <PageHeader />
      <div className="mt-8">
        <OverviewDashboard />
        <ActivityList />
      </div>
    </>
  );
}
