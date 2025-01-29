import { useAtom } from 'jotai';
import { groupAtom } from '../../Jotai/atoms';
import Button from '../../components/Button - deprected/Button';

const GroupPage = () => {
  const [group] = useAtom(groupAtom);

  return (
    <div>
      <h1>Group Page</h1>
      <p>Group ID: {group.groupId}</p>
      <p>Group Users: {group.users?.length}</p>
      <Button label="Create New Bet" />
    </div>
  );
};

export default GroupPage;
