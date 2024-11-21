import React, { useState, useEffect } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import ReactDOM from "react-dom";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({
    top: "0",
    left: "0",
  });

  // Close emoji picker when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showEmojiPicker &&
        !event.target.closest(".emoji-picker-container") &&
        !event.target.closest(".emoji")
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showEmojiPicker]);

  // Handle "Enter" key to close emoji picker
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && showEmojiPicker) {
      setShowEmojiPicker(false);
    }
  };

  // Toggle emoji picker visibility and set position
  const handleEmojiPickerhideShow = (e) => {
    setShowEmojiPicker((prev) => !prev);
    if (!showEmojiPicker) {
      const rect = e.target.getBoundingClientRect();
      setEmojiPickerPosition({
        top: rect.top - 250, // Adjust as necessary
        left: rect.left - 10, // Adjust as necessary
      });
    }
  };

  // Handle emoji click and append to message
  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji; // Access the emoji property correctly
    setMsg(message);
  };

  // Handle chat submission
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  // Render the emoji picker at the specified position
  const renderEmojiPicker = () => {
    if (showEmojiPicker) {
      return ReactDOM.createPortal(
        <div className="emoji-picker-container">
          <Picker
            onEmojiClick={(emojiObject) => handleEmojiClick(emojiObject)}
            style={{
              position: "absolute",
              top: emojiPickerPosition.top + "px",
              left: emojiPickerPosition.left + "px",
              zIndex: "9999", // Ensure the picker is on top
              backgroundColor: "transparent", // Transparent background for the picker
            }}
          />
        </div>,
        document.body
      );
    }
    return null;
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {renderEmojiPicker()}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          onKeyDown={handleKeyDown} // Add keydown event listener for Enter
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    position: relative;

    .emoji {
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
