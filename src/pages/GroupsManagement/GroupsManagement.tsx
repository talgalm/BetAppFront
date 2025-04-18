import { useForm, SubmitHandler } from 'react-hook-form';

import withAuth from '../../Providers/withAuth';
import { useGetUsers } from '../../Hooks/useGetUsers';
import { useGroupCreation } from '../../Hooks/useCreateGroup';
import { useAtom } from 'jotai';
import { userAtom } from '../../Jotai/atoms';
import { useLogout } from '../../Providers/LogoutProvider';
import UserAutocomplete from '../../components/UserAutocomplete/UserAutocomplete';
import { useGetGroupsByUser } from '../../Hooks/useGetGroupsByUser';
import {
  HomeDivContainer,
  InnerCustomDiv,
  FormContainer,
  FormStyled,
  AutocompleteContainer,
  ButtonContainer,
} from './GroupsManagement.styles';
import { useNavigate } from 'react-router-dom';
import { Group } from '../../api/interfaces';

type GroupFormInputs = {
  groupName: string;
  users: string[];
};

const GroupsManagement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GroupFormInputs>({
    defaultValues: {
      groupName: '',
      users: [],
    },
  });

  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const { logout } = useLogout();
  const { users } = useGetUsers();
  const { mutate, isPending } = useGroupCreation();
  const { groups } = useGetGroupsByUser(user.id);

  // useEffect(() => {
  //   setCurrentGroup({ groupId: '', groupName: '', users: [] });
  // }, [setCurrentGroup]);

  const onSubmit: SubmitHandler<GroupFormInputs> = ({ groupName, users }) => {
    users = [...users, user.id];

    mutate(
      { groupName, users },
      {
        onSuccess: () => {
          alert('Group created successfully!');
          setValue('groupName', '');
          setValue('users', []);
        },
        onError: (err) => {
          console.error('Group creation failed:', err);
          alert('An error occurred while creating the group. Please try again later.');
        },
      }
    );
  };

  const onGroupClick = (group: Group) => {
    // setCurrentGroup(group);
    navigate(`/groups/${group.id}`);
  };

  return (
    <HomeDivContainer>
      <InnerCustomDiv>
        {user.id}
        {/* <Button type="submit" label="Logout" onClick={logout} /> */}
      </InnerCustomDiv>
      <InnerCustomDiv>
        <div>Here are all the users group</div>
        {groups?.map((group, index) => (
          <div
            key={index}
            onClick={() => onGroupClick(group)}
            style={{
              cursor: 'pointer',
              padding: '10px',
              border: '1px solid #ccc',
              margin: '5px',
            }}
          >
            {group.name}
          </div>
        ))}
      </InnerCustomDiv>
      <InnerCustomDiv>
        <div>Create new group</div>
        <FormContainer>
          <FormStyled onSubmit={handleSubmit(onSubmit)}>
            {/* Group Name Field */}

            {/* <AutocompleteContainer>
              <UserAutocomplete
                options={
                  users
                    ? users.filter((u) => u.id !== user?.id).map((u) => u.id)
                    : []
                }
                value={watch('users') || []}
                onChange={(event, newValue) => setValue('users', newValue)}
              />
              {errors.users && <p className="error">{errors.users.message}</p>}
            </AutocompleteContainer> */}

            {/* Submit Button */}
            {/* <ButtonContainer>
              <Button
                type="submit"
                label={isPending ? 'Creating...' : 'Create'}
                disabled={isPending}
              />
            </ButtonContainer> */}
          </FormStyled>
        </FormContainer>
      </InnerCustomDiv>
    </HomeDivContainer>
  );
};

export default withAuth(GroupsManagement);
