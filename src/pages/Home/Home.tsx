import { HomeDivContainer } from "./Home.styles";
import withAuth from "../../Providers/withAuth";
import MyBets from "../MyBets/MyBets";
import MyGroups from "../MyGroups/MyGroups";

const Home = (): JSX.Element => {  

  return (
    <HomeDivContainer>
      <MyBets />
      <MyGroups />
    </HomeDivContainer>
  );
};
// export default withAuth(Home);
export default Home;
