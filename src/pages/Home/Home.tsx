import { HomeDivContainer } from "./Home.styles";
import withAuth from "../../Providers/withAuth";
import MyBets from "../MyBets/MyBets";
import MyGroups from "../MyGroups/MyGroups";
import BetLoader from "../../Theme/Loader/loader";

const Home = (): JSX.Element => {
  if (false) {
    return <BetLoader />;
  }

  return (
    <HomeDivContainer>
      <MyBets />
      <MyGroups />
    </HomeDivContainer>
  );
};
// export default withAuth(Home);
export default Home;
