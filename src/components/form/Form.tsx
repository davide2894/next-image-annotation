import { SyntheticEvent, useState } from "react";
import styles from "./Form.module.css";

interface FormProps {
  onFormSubmit: (labelString: string) => void;
}

function Form({ onFormSubmit }: FormProps) {
  const [value, setValue] = useState("");

  function submitHandler(evt: SyntheticEvent) {
    evt.preventDefault();
    console.log(evt);
    onFormSubmit(value);
  }

  return (
    <div>
      <form onSubmit={(evt) => submitHandler(evt)}>
        <div className="">
          <label htmlFor="nameInput">
            Label:
            <input
              autoFocus={true}
              type="text"
              name="name"
              required
              id="nameInput"
              value={value}
              onChange={(evt) => {
                setValue(evt.target.value);
              }}
            />
          </label>
        </div>
        <button type="submit" value="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
