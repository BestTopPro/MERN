import React from "react";
import UserList from "../components/UserList";

const Users = () => {

    const USERS = [
        {
            id:'u1',
            name: 'wahed farhad',
            image: 'https://loremflickr.com/320/240/man',
            places: 3
        }
    ]
  return <UserList items={USERS}/>;
};

export default Users;
