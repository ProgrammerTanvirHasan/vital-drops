import Banner from "../banner/Banner";
import Donors from "../donors/Donors";
import Events from "../events/Events";
import SuccessStories from "../successStories/SuccessStories";
import Volunteers from "../volunteers/Volunteers";
import WhyDonotsBlood from "../whyDonotsBlood/WhyDonotsBlood";

const HomePage = () => {
  return (
    <div className="space-y-16">
      <Banner></Banner>
      <Donors></Donors>
      <WhyDonotsBlood></WhyDonotsBlood>
      <Volunteers></Volunteers>
      <SuccessStories></SuccessStories>
      <Events></Events>
    </div>
  );
};

export default HomePage;
