import React from "react";
import "./index.css";
import { Success } from "./components/Success";
import { Users } from "./components/Users";
import axios from "axios";

type UserType = {
  id: number;
  email: string;
  last_name: string;
  first_name: string;
  avatar: string;
};

const App: React.FC = () => {
  const [users, setUsers] = React.useState<UserType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);
  const [invitedUsers, setInvitedUsers] = React.useState<UserType[]>([]);

  React.useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=1", {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onHandleClickPlus = (id: number) => {
    const isAlreadyInvited = invitedUsers.some((user) => user.id === id);

    if (isAlreadyInvited) {
      setInvitedUsers((prev) => prev.filter((user) => user.id !== id));
    } else {
      const userToAdd = users.find((user) => user.id === id);
      if (userToAdd) {
        setInvitedUsers((prev) => [...prev, userToAdd]);
      }
    }
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invitedUsers.length} />
      ) : (
        <Users
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          items={users}
          isLoading={isLoading}
          setSuccess={setSuccess}
          onHandleClickPlus={onHandleClickPlus}
          invitedUsers={invitedUsers}
        />
      )}
    </div>
  );
};

export default App;
