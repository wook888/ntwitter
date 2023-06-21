import React from "react";
import { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";


const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
  
    const onDeleteClick = async () => {
      const nweetRef = doc(dbService, "nweets", nweetObj.id);
      await deleteDoc(nweetRef);
    };
  
    const toggleEditing = () => setEditing((prev) => !prev);
  
    const onSubmit = async (event) => {
      event.preventDefault();
      const nweetRef = doc(dbService, "nweets", nweetObj.id);
      await updateDoc(nweetRef, {
        text: newNweet,
      });
      setEditing(false);
    };
  
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
