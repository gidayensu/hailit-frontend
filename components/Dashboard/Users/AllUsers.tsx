'use client'
import { useState } from "react";
import UserDetails from "./UserDetails";
import AllUsersTable from "./AllUsersTable";

export default function AllUsers () {
    const [showUser, setShowUser] = useState<boolean>(false);

    const handleShowUser = (show:boolean):void => {
        setShowUser(show)
    }
        return (
            <>
            {!showUser &&
            <AllUsersTable showUser={handleShowUser}/>
            }
            {showUser &&
            <UserDetails showUser={handleShowUser} />}
            </>
        )
}