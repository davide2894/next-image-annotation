import { useDispatch } from "react-redux";
import styles from "./Toolbar.module.css";
import {
  enableDrawing,
  setTool,
} from "@/lib/store/features/canvas/canvasSlice";
import { SELECT_TOOL } from "@/lib/constants";

function Toolbar() {
  const dispatch = useDispatch();

  function onToolButtonClick(toolToActivate: string) {
    dispatch(setTool(toolToActivate));
    if (toolToActivate !== SELECT_TOOL) {
      dispatch(enableDrawing());
    }
  }

  return (
    <div className={styles.toolbar}>
      <button onClick={() => onToolButtonClick("rectangle")}>
        Create a rectangle shape
      </button>
      <button onClick={() => onToolButtonClick("circle")}>
        Create a circle shape
      </button>
      <button onClick={() => onToolButtonClick("select")}>
        Select an annotation
      </button>
    </div>
  );
}

export default Toolbar;
