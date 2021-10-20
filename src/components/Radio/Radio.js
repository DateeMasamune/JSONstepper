import React from "react";

export const Radio = ({label, value, name}) => {
  return (
    <div>
      <label>
        <input 
          type="radio"
          value={value}
          name={name}
        />
        {label}
      </label>
    </div>
  )
}