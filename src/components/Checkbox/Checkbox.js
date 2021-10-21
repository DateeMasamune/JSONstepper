import React, { useRef } from "react";

export const Checkbox = ({value, label, name, setter}) => {
  const checkbox = useRef(null)
  const handlerCheckboxValue = () => {
    setter((prevState) => {
      if (checkbox.current.checked) {
        return (
          [...prevState, checkbox.current.value]
        )
      } else {
        const deleteValueCheckbox = prevState.filter(item => item !== checkbox.current.value)
        return(
          deleteValueCheckbox
        )
      }
    })
  }
  return (
    <div>
      <label htmlFor={name}>
        <input 
          name={name}
          type="checkbox"
          value={value}
          onClick={handlerCheckboxValue}
          ref={checkbox}
        />{label}
      </label>
    </div>
  )
}