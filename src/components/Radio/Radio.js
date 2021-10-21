import React, { useRef } from "react";

export const Radio = ({label, value, name, setter}) => {
  const inputRadio = useRef(null)
  const handlerRadioValue = () => {
    setter(inputRadio.current.value)
  }
  return (
    <div>
      <label>
        <input 
          type="radio"
          value={value}
          name={name}
          onClick={handlerRadioValue}
          ref={inputRadio}
        />
        {label}
      </label>
    </div>
  )
}