import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const auth = getAuth();

  const onLogOutClick = () => {
    signOut(auth)
      .then(() => {
        history.push("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
