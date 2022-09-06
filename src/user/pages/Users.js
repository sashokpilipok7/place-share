import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Max Szwardz",
      image:
        "https://media.cntraveler.com/photos/60596b398f4452dac88c59f8/master/w_4000,h_2667,c_limit/MtFuji-GettyImages-959111140.jpg",
      places: 3,
    },
  ];
  return <UsersList users={USERS} />;
};

export default Users;
