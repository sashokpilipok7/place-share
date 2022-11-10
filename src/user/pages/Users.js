import React, { useState, useEffect } from "react";

import { useHttpClient } from "shared/hooks/http-hook";
import UsersList from "../components/UsersList";
import ErrorModal from "shared/components/UIElements/ErrorModal";
import LoadingSpinner from "shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { isLoading, error, sendReq, clearError } = useHttpClient();

  useEffect(() => {
    sendReq("users").then((data) => data.users && setUsers(data.users));
  }, [sendReq]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <UsersList users={users} />
    </>
  );
};

export default Users;
