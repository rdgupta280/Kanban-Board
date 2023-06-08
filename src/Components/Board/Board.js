import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

import "./Board.css";

function Board(props) {
  
const [showDropdown, setShowDropdown] = useState(false);
const [edit,SetEdit]=useState(true)
const [inputValue, setInputValue]= useState(props.board?.title)


function handletitle(){
  console.warn(props?.board?.title)
     SetEdit(false)
  }

function handleSubmit(e){
  e.preventDefault()
  SetEdit(true)
}
  return (
    <div className="board">
      <div className="board_header">
<div className="board_header_title">

     { edit ? <p  onClick={handletitle}>
          {inputValue}
          {/* <span>{props.board?.cards?.length || 0}</span> */}
        </p>: <form onSubmit={handleSubmit}><input value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/></form> 
        }</div>



        <div
          className="board_header_title_more"
          onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }} 
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
    // </div>
  );
}

export default Board;
