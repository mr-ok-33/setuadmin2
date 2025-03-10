import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import "./ChipInput.css";

const ChipInput = ({ label, value = [], onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddChip = () => {
    if (inputValue.trim()) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveChip = (index) => {
    const newChips = value.filter((_, i) => i !== index);
    onChange(newChips);
  };

  return (
    <div className="chip-input">
      <div className="chips-container">
        {(value || []).map((chip,index) => (
          <div key={index} className="chip">
            {chip}
            <button
              type="button"
              className="chip-remove"
              onClick={() => handleRemoveChip(index)}
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
      <div className="chip-input-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          placeholder="Type and click '+' to add"
        />
        <button
          type="button"
          className="chip-add-btn"
          onClick={handleAddChip}
          disabled={!inputValue.trim()}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ChipInput;
