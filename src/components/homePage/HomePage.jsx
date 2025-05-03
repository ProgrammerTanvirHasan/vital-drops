import Banner from "../banner/Banner";
import Events from "../events/Events";
import SuccessStories from "../successStories/SuccessStories";
import Volunteers from "../volunteers/Volunteers";
import WhoCanDonot from "../whoCanDonot/WhoCanDonot";
import WhyDonotsBlood from "../whyDonotsBlood/WhyDonotsBlood";

const HomePage = () => {
  return (
    <div >
      <Banner></Banner>
      <WhyDonotsBlood></WhyDonotsBlood>
      <WhoCanDonot></WhoCanDonot>
      <Volunteers></Volunteers>
      <SuccessStories></SuccessStories>
      <Events></Events>
    </div>
  );
};

export default HomePage;
