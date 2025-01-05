import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Input from "../../components/Input - deprected/Input";
import Button from "../../components/Button - deprected/Button";
import withAuth from "../../Providers/withAuth";
import { useGetUsers } from "../../Hooks/useGetUsers";
import { useGroupCreation } from "../../Hooks/useCreateGroup";
import { useAtom } from "jotai";
import { groupAtom, userAtom } from "../../Jotai/atoms";
import { useLogout } from "../../Providers/LogoutProvider";
import UserAutocomplete from "../../components/UserAutocomplete/UserAutocomplete";
import { useGetGroupsByUser } from "../../Hooks/useGetGroupsByUser";
import {
  HomeDivContainer,
  InnerCustomDiv,
  FormContainer,
  FormStyled,
  AutocompleteContainer,
  ButtonContainer,
} from "./GroupsManagement.styles";
import { useNavigate } from "react-router-dom";
import { Group } from "../../api/interfaces";

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
      groupName: "",
      users: [],
    },
  });

  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const [_, setCurrentGroup] = useAtom(groupAtom);
  const { logout } = useLogout();
  const { users } = useGetUsers();
  const { mutate, isPending } = useGroupCreation();
  const { groups, isLoading, isError } = useGetGroupsByUser(user.username);

  useEffect(() => {
    setCurrentGroup({ groupId: "", groupName: "", users: [] });
  }, []);

  const onSubmit: SubmitHandler<GroupFormInputs> = ({ groupName, users }) => {
    users = [...users, user.username];

    mutate(
      { groupName, users },
      {
        onSuccess: () => {
          alert("Group created successfully!");
          setValue("groupName", "");
          setValue("users", []);
        },
        onError: (err) => {
          console.error("Group creation failed:", err);
          alert(
            "An error occurred while creating the group. Please try again later."
          );
        },
      }
    );
  };

  const onGroupClick = (group: Group) => {
    setCurrentGroup(group);
    navigate(`/groups/${group.groupId}`);
  };

  return (
    <HomeDivContainer>
      <InnerCustomDiv>
        {user.username}
        <Button type="submit" label="Logout" onClick={logout} />
      </InnerCustomDiv>
      <InnerCustomDiv>
        <div>Here are all the users group</div>
        {groups?.map((group, index) => (
          <div
            key={index}
            onClick={() => onGroupClick(group)}
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #ccc",
              margin: "5px",
            }}
          >
            {group.groupName}
          </div>
        ))}
      </InnerCustomDiv>
      <InnerCustomDiv>
        <div>Create new group</div>
        <FormContainer>
          <FormStyled onSubmit={handleSubmit(onSubmit)}>
            {/* Group Name Field */}
            <Input
              type="text"
              placeholder="Group Name"
              register={register}
              name="groupName"
              validation={{
                required: "Group name is required",
                minLength: {
                  value: 3,
                  message: "Group name must be at least 3 characters long",
                },
              }}
              error={errors.groupName?.message}
            />

            <AutocompleteContainer>
              <UserAutocomplete
                options={
                  users
                    ? users
                        .filter((u) => u.username !== user?.username)
                        .map((u) => u.username)
                    : []
                }
                value={watch("users") || []}
                onChange={(event, newValue) => setValue("users", newValue)}
              />
              {errors.users && <p className="error">{errors.users.message}</p>}
            </AutocompleteContainer>

            {/* Submit Button */}
            <ButtonContainer>
              <Button
                type="submit"
                label={isPending ? "Creating..." : "Create"}
                disabled={isPending}
              />
            </ButtonContainer>
          </FormStyled>
        </FormContainer>
      </InnerCustomDiv>
    </HomeDivContainer>
  );
};

export default withAuth(GroupsManagement);
