import React from "react";
import "./UsersList.css";

import UserItem from "./UserItem";

function UsersList({ users }) {
  if (users.lenght === 0) {
    return (
      <div className="center">
        <h2>No users found!</h2>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {users.map(({ id, image, name, places }) => (
        <UserItem
          key={id}
          id={id}
          image={image}
          name={name}
          placeCount={places}
        />
      ))}
    </ul>
  );
}

export default UsersList;
