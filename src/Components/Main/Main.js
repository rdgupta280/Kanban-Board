import React, { useEffect, useState } from "react";
import { Image, User } from "react-feather";
import Board from "../Board/Board";
import "./Main.css";
import { v4 as uuidv4 } from "uuid";
import Editable from "../Editabled/Editable";
import { FastForward } from "react-feather";

function Main() {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("kanbanBoard")) || []
  );

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const addboardHandler = (name) => {
    const tempBoards = [...boards];
    tempBoards.push({
      id: uuidv4(),
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  };

  const removeBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

  const addCardHandler = (id, title) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: uuidv4(),
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("kanbanBoard", JSON.stringify(boards));
  }, [boards]);

  const colors = [
    "#212121",
    "red",
    "#3cb371",
    "#1a1a1a",
    "blue",
    "#333333",
    "green",
    "yellow",
    "#C0C0C0",
    "black",
  ];

  const [color, setColor] = useState("#1a1a1a");
  function handleColorChange() {
    const currentIndex = colors.indexOf(color);
    //console.log(currentIndex)
    const nextIndex = currentIndex + 1;
    setColor(colors[nextIndex]);
  }

  return (
    <div className="main" style={{ backgroundColor: color }}>
      {/* backgroundImage: `url(${backgroundImage})`,  */}
      <div className="main_nav">
        <h1 style={{ color: color }}>𝕂𝕒𝕟𝕓𝕒𝕟 𝔹𝕠𝕒𝕣𝕕</h1>
        <FastForward
          className="background_color"
          style={{ color: color }}
          onClick={handleColorChange}
        />
        <Image className="background_image" />
        <User className="main_user" />
      </div>
      <div className="main_boards_container">
        <div className="main_boards">
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
            />
          ))}
          <div className="main_boards_last">
            <Editable
              displayClass="main_boards_add-board"
              editClass="main_boards_add-board_edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
