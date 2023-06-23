import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import NweetFactory from "../components/NweetFactory";
import Nweet from "../components/Nweet";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    let unsubscribe;

    const getNweets = async () => {
      const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const nweetArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArr);
      });
    };

    const checkAuthState = () => {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
 
          unsubscribe();
        }
      });
    };

    getNweets();
    checkAuthState();

    return () => {

      unsubscribe();
    };
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
