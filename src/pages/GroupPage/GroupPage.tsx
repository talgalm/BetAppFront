import { useAtom } from 'jotai';
import { groupAtom } from '../../Jotai/atoms';

const GroupPage = () => {
  const [group] = useAtom(groupAtom);

  return (
    <div>
      <h1>Group Page</h1>
      <p>Group ID: {group.id}</p>
      <p>Group Users: {group.users?.length}</p>
    </div>
  );
};

export default GroupPage;
