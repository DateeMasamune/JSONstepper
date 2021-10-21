import React, { useEffect, useState } from 'react';
import './App.css';
import { Checkbox } from './components/Checkbox/Checkbox';
import { Number } from './components/Number/Number';
import { Radio } from './components/Radio/Radio';
import { String } from './components/String/String';

import form from './JSON/form.json';
import inputs from './JSON/inputs.json';

const typeInputs = {
  RADIO: Radio,
  CHECKBOX: Checkbox,
  STRING: String,
  NUMBER: Number,
}

function App() {

  const [step, setStep] = useState(0) /**текущий шаг */
  const [numInputs, setNumInputs] = useState([]) /**массив в котором лежат все типы и имена инпутов  */
  const [Input, setInput] = useState([]) /**собираем необходимые компоненты */

  const[radio, setRadio] = useState('')
  const[checkbox, setCheckbox] = useState([])
  const[string, setString] = useState('')
  const[number, setNumber] = useState('')

  const formStep = form.filter((stepForm, index) => index ===  step) /**фильтруем текущий шаг */
  const inputsForStep = inputs.filter(input => input.step === formStep[0].groupName)/**фильтруем текущий инпут */
  const currentStepForm = [...formStep,...inputsForStep] /** объединяем в 1 массив */
  const arrayNewComponents = []

  const handlerPrev = () => {
    if (step === 0) {
      setStep(step)
    } else {
      setStep(step - 1)
    }
  }

  const handlerNext = () => {
    if (step >= form.length - 1) {
      setStep(step)
    } else {
      setStep(step + 1)
    }
  }
  
  useEffect(() => {
    setNumInputs(currentStepForm[0].items) /**при первом рендере записываем текущее значение и типы инпутов */
  },[step])

  useEffect(() => {
    numInputs.map(type => { /**бегу по массиву с типами инпутов */
      currentStepForm.map(option => { /**бегу по общему массиву */
        if (Array.isArray(option.options)) { /**ищу в нем опшены */
          option.options.map(opt => { /**бегу по массиву опшинов */
            let objectTest = {}
            console.log(type)
            const newComponent = typeInputs[type.type] /**создаю компоненты */
            if (opt.label) {
              objectTest.label = opt.label
            }
            if (opt.value) {
              objectTest.value = opt.value
            }
            if (type.name) {
              objectTest.name = type.name
            }
            if (newComponent) {
              objectTest.inputComponent = newComponent
            }
            if (type.conditions) {
              objectTest.conditions = type.conditions
            }
            switch (type.type) {
              case "RADIO":
                objectTest.setter = setRadio
                break;
              case "CHECKBOX":
                objectTest.setter = setCheckbox
                break;
              case "STRING":
                objectTest.setter = setString
                break;
              case "NUMBER":
                objectTest.setter = setNumber
                break;
            }
            arrayNewComponents.push(objectTest) /**добавляю в массив */
          })
        }
      })
      setInput(arrayNewComponents)
    })
  },[numInputs, step])

  return (
    <div className="App">
      {
        currentStepForm.map(item => ( /**мапим текущую форму */
          <div className="form">
            <h1 className="formName">{item.groupName}</h1>
          </div>
        ))
      }
      {
        <div>
        {
          Input.map(Inp => ( /**мапим массив с компонентами */
            <div>
              <Inp.inputComponent
                value={Inp.value}
                label={Inp.label}
                name={Inp.name}
                setter={Inp.setter}
              />
            </div>
          ))
        }
      </div>
      }
      <button onClick={handlerPrev}>Prev</button>
      <button onClick={handlerNext}>Next</button>
    </div>
  );
}

export default App;
