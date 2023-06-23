import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { auth } from "fbase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const handleAuthStateChanged = (user) => {
      if (user) {
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
          updateProfile(user, {
            displayName: name,
          });
        }
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    };

    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsubscribe();
  }, []);

  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({ ...user });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "초기화 진행 중..!"
      )}
    </>
  );
}

export default App;
