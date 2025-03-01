import { HomeDivContainer } from './Home.styles';
import MyBets from '../MyBets/MyBets';
import MyGroups from '../MyGroups/MyGroups';
import BetLoader from '../../Theme/Loader/loader';
import { useEffect } from 'react';
import { UseUser } from '../../Hooks/useGetUser';
import { useAtom } from 'jotai';
import { userAtom } from '../../Jotai/atoms';

const Home = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);
  const { data, isLoading } = UseUser(user?.id);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <BetLoader />;
  }

  return (
    <HomeDivContainer>
      <MyBets userBets={user.bets || []} />
      <MyGroups userGroups={user.groups || []} />
    </HomeDivContainer>
  );
};

export default Home;
