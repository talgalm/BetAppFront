import { HomeDivContainer } from "./Home.styles";
import MyBets from "../MyBets/MyBets";
import MyGroups from "../MyGroups/MyGroups";
import BetLoader from "../../Theme/Loader/loader";
import { useEffect } from "react";
import { UseUser } from "../../Hooks/useGetUser";
import { useAtom } from "jotai";
import { userAtom } from "../../Jotai/atoms";

const Home = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);
  const { data, isLoading, isError, error } = UseUser(user?.username);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <BetLoader />;
  }

  return (
    <HomeDivContainer>
      <MyBets userBets={data?.user.bets || []} />
      <MyGroups userGroups={data?.user.groups || []} />
    </HomeDivContainer>
  );
};

export default Home;
