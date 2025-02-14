import Banner from "../banner/Banner";
import Donors from "../donors/Donors";
import SuccessStories from "../successStories/SuccessStories";
import WhyDonotsBlood from "../whyDonotsBlood/WhyDonotsBlood";

const HomePage = () => {
  return (
    <div className="space-y-16">
      <Banner></Banner>
      <Donors></Donors>
      <WhyDonotsBlood></WhyDonotsBlood>
      <SuccessStories></SuccessStories>
    </div>
  );
};

export default HomePage;
