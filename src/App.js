import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./redux/slices/counterSlice";
import { Button } from "antd";
import styled from "styled-components";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const Button1 = styled.button`
    color: grey;
  `;
  return (
    <div>
      <div>
        <Button
          type="primary"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span>{count}</span>
        <Button1
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button1>
      </div>
    </div>
  );
}

export default App;
