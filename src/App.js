import React, {useState} from 'react';
import './App.css';
import InputRangeText from './input-range-text';

const MIN_VALUE = 0;
const MAX_VAlUE = 15;
const STEP = 1;

function validationFn(nextValue) {
  if (Number(nextValue.toFixed(0)) === Number(nextValue)) {
    return true;
  }
  return false;
}

function App() {

  const [count, setCount] = useState(2);

  return (
    <div>
      <h1 className="test-class">Input range number</h1>
      <ul>
        <li>
          <b>Удерживай мышку зажатой и передвигай</b> для грубой настройки
          используюя input range
        </li>
        <li>
          Обычнй <b>клик</b> и ввод нового значения для точного ввода
        </li>
      </ul>
      <div className="example-wrapper">
        <InputRangeText
          min={MIN_VALUE}
          max={MAX_VAlUE}
          step={STEP}
          value={count}
          onChange={setCount}
          validation={validationFn}
          disabled={true}
        />
      </div>
    </div>
  );
}

export default App;
