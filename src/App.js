import React, {useState} from 'react';
import './App.css';
import InputRangeText from './input-range-text';

const MIN_VALUE = 0;
const MAX_VAlUE = 15;
const STEP = 1;

function validationFn(nextValue) {
  return true;
}

function App() {

  const [count, setCount] = useState(5);
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <h1 className="test-class">Input range number</h1>
      <ul>
        <li>
          Just click by element for use it like usual input number
        </li>
        <li>
          Or hold and drag for use it like range input
        </li>
      </ul>
      <div className="example-optional">
        <input
          type='checkbox'
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          id="cheese"
        /> 
        <label htmlFor="cheese">Disable this element</label>
      </div>
      <div className="example-wrapper">
        <InputRangeText
          min={MIN_VALUE}
          max={MAX_VAlUE}
          precision={3}
          unit={"USD"}
          step={STEP}
          value={count}
          onChange={setCount}
          validation={validationFn}
          disabled={checked}
        />
      </div>
    </div>
  );
}

export default App;
