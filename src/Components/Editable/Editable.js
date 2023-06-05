import React, { useState } from 'react';
import { X } from "feather-icons-react";
import './Editable.css';

export default function Editable() {
  const [showEdit, setShowEdit] = useState(false);
  const [data, setData] = useState("");
  const [value, setValue] = useState("");

  function handleChange(e) {
    setData(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setValue(data);
    setShowEdit(false)
  }

  return (
    <div className='editable'>
      {showEdit ? (
        <form
          className='editable_edit'
          onSubmit={handleSubmit}
        >
          <input type='text' onChange={handleChange} />
          <div className='editable_edit_footer'>
            <button>Add +</button>
          </div>
          </form>
      ) : (
        <X onClick={() => setShowEdit(true)} /> 
      )}
      <div>{value}</div>
    </div>
  );
}
