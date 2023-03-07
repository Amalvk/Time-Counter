import React, { useEffect, useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [minut, setMinut] = useState(0);
  const [bminut, setbMinut] = useState(0);
  const [second, setSecond] = useState(0);
  const [bsecond, setbSecond] = useState(0);
  const [val, setTrigger] = useState(false);
  const [milli, setmilli] = useState(val ? 59 : 0);

  var timer;
  useEffect(() => {
    timer = setInterval(() => {
      counter();
    }, 10);
    return () => clearInterval(timer);
  });
  const counter = () => {
    if (val) {
      setmilli(milli-1);
      if (milli == 0) {
        setmilli(59);
        setSecond(second - 1);
      }
      if (second == 0 && minut != 0) {
        setSecond(59);
        setMinut(minut - 1);
      }
      if (second == 0 && minut == 0) {
        setMinut(0);
        setSecond(0);
        setmilli(0);
        setTrigger(false);
      }
    }
  };
  const restartCount = () => {
    setMinut(bminut);
    setSecond(bsecond);
    setmilli(59);
    setTrigger(true);
  };

  const formsubmit = (e) => {
    e.preventDefault();
    setTrigger(!val);
  };

  return (
    <div className="item">
      <div className="item-body">
        <h4>Count Down</h4>
        <form
          onSubmit={(e) => {
            formsubmit(e);
          }}
          class="form-group mx-sm-3 mb-2"
        >
          <FormGroup role="form" className="input-block">
            <input
              type="number"
              onChange={(e) => {setMinut(e.target.value); setbMinut(e.target.value)}}
              class="form-control"
              placeholder="Minute"
              required
            />{" "}
            <br />
            <input
              type="number"
              onChange={(e) => {setSecond(e.target.value); setbSecond(e.target.value)}}
              class="form-control"
              placeholder="Second"
            />
            <br />
            <h4>
            {minut > 9 ? minut : "0" + minut}:
            {second > 9 ? second : "0" + second}:
            {milli > 9 ? milli : "0" + milli}
            </h4>
            <div className="button-block">
              <div>
                <Button variant={val?"danger":"success"} type="submit">
                  {val?"Stop" : "Start"}
                </Button>
                </div>
                <div>
                <Button variant="primary" onClick={restartCount} >
                  Restart
                </Button>
                </div>
            </div>
          </FormGroup>
        </form>
      </div>
    </div>
  );
}

export default App;