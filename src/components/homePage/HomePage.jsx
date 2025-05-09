import About from "../AboutPage/AboutPage";
import Banner from "../banner/Banner";
import DonorChart from "../donarChart/page";

import Events from "../events/Events";
import ProcessPage from "../ProcessPage";
import SuccessStories from "../successStories/SuccessStories";
import Volunteers from "../volunteers/Volunteers";
import WhoCanDonot from "../whoCanDonot/WhoCanDonot";
import WhyDonotsBlood from "../whyDonotsBlood/WhyDonotsBlood";

const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <WhyDonotsBlood></WhyDonotsBlood>
      <WhoCanDonot></WhoCanDonot>
      <ProcessPage></ProcessPage>
      <Volunteers></Volunteers>
      <SuccessStories></SuccessStories>
      <Events></Events>
      <DonorChart></DonorChart>
    </div>
  );
};

export default HomePage;
