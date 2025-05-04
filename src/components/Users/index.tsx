import { FC, ChangeEvent } from "react";
import { Skeleton } from "./Skeleton";
import { User } from "./User";

type UserType = {
  id: number;
  email: string;
  last_name: string;
  first_name: string;
  avatar: string;
};

type UsersProps = {
  searchValue: string;
  items: UserType[];
  isLoading: boolean;
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  onHandleClickPlus: (id: number) => void;
  setSuccess: (success: boolean) => void;
  invitedUsers: UserType[];
};

export const Users: FC<UsersProps> = ({
  searchValue,
  onChangeSearchValue,
  items,
  isLoading,
  setSuccess,
  onHandleClickPlus,
  invitedUsers,
}) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          value={searchValue}
          type="text"
          placeholder="Search for a user..."
          onChange={onChangeSearchValue}
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items
            .filter((item) => {
              const FullName = (item.first_name + item.last_name).toLowerCase();
              return (
                FullName.includes(searchValue.toLowerCase()) ||
                item.email.includes(searchValue.toLowerCase())
              );
            })
            .map((item) => (
              <User
                key={item.id}
                user={item}
                onHandleClickPlus={onHandleClickPlus}
                isInvited={invitedUsers.some((user) => user.id === item.id)}
              />
            ))}
        </ul>
      )}
      {invitedUsers.length > 0 && (
        <button className="send-invite-btn" onClick={() => setSuccess(true)}>
          Invite
        </button>
      )}
    </>
  );
};
