import React, { useEffect, useState } from "react";
import {
  addToGroup,
  leaveGroup,
  removeFromGroup,
  renameGroup,
} from "../../apis/api";
import "./groupDetailsModal.css";

const GroupDetailsModal = ({
  selectedChat,
  currentUser,
  closeModal,
  onGroupUpdate,
}) => {
  const [groupName, setGroupName] = useState(selectedChat.chatName);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setGroupName(selectedChat.chatName);
  }, [selectedChat]);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleNewUserEmailChange = (e) => {
    setNewUserEmail(e.target.value);
  };

  const handleUpdateGroupName = async () => {
    try {
      await renameGroup({ chatId: selectedChat._id, chatName: groupName });
      onGroupUpdate();
      closeModal();
    } catch (error) {
      console.error("Failed to update group name", error);
      setError("Failed to update group name");
    }
  };

  const handleAddUserToGroup = async () => {
    try {
      if (selectedChat.users.some((user) => user.email === newUserEmail)) {
        setError("User already in group");
        return;
      }
      await addToGroup({ chatId: selectedChat._id, userEmail: newUserEmail });
      onGroupUpdate();
      closeModal();
    } catch (error) {
      console.error("Failed to add user to group", error);
      setError("Failed to add user to group");
    }
  };

  const handleRemoveUser = async (userId) => {
    if (selectedChat.groupAdmin !== currentUser._id) {
      setError("Only the group admin can remove users");
      return;
    }

    try {
      await removeFromGroup({ chatId: selectedChat._id, userId });
      onGroupUpdate();
      closeModal();
    } catch (error) {
      console.error("Failed to remove user from group", error);
      setError("Failed to remove user from group");
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup({ chatId: selectedChat._id, userId: currentUser._id });
      onGroupUpdate();
      closeModal();
    } catch (error) {
      console.error("Failed to leave group", error);
      setError("Failed to leave group");
    }
  };

  return (
    <div className="group-details-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>
          ×
        </button>
        <h2>{groupName}</h2>
        <div className="group-users">
          {selectedChat.users.map((user) => (
            <div key={user._id} className="user-tag">
              {user.firstName} {user.lastName}
              {selectedChat.groupAdmin === currentUser._id &&
                user._id !== currentUser._id && (
                  <button
                    className="remove-user-btn"
                    onClick={() => handleRemoveUser(user._id)}
                  >
                    ×
                  </button>
                )}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder="Chat Name"
          className="input-field"
        />
        <button onClick={handleUpdateGroupName} className="update-btn">
          Update
        </button>
        <input
          type="text"
          value={newUserEmail}
          onChange={handleNewUserEmailChange}
          placeholder="Add User to group"
          className="input-field"
        />
        <button onClick={handleAddUserToGroup} className="add-user-btn">
          Add User
        </button>
        <button onClick={handleLeaveGroup} className="leave-group-btn">
          Leave Group
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default GroupDetailsModal;