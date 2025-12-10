import DashboardCardWrapper from "./components/DashboardCardWrapper";
import LatestVideos from "./components/LatestVideos";
import PopularVideoCategories from "./components/PopularVideoCategories";
import PopularVideos from "./components/PopularVideos";

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <DashboardCardWrapper
        title="Trending Now!"
        description="Top films that users love the most."
      >
        <PopularVideos />
      </DashboardCardWrapper>

      <DashboardCardWrapper
        title="Latest Films"
        description="Freshly added movies just for you."
      >
        <LatestVideos />
      </DashboardCardWrapper>

      <DashboardCardWrapper
        title="Popular Categories"
        description="Film categories with the most purchases."
      >
        <PopularVideoCategories />
      </DashboardCardWrapper>
    </div>
  );
}
