import styles from "./Toolbar.module.css";
import { CIRCLE, RECTANGLE, SELECT_TOOL } from "@/lib/constants";
import ToolButton from "../toolButton/ToolButton";

function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <ToolButton toolName={RECTANGLE} text={"Create a rectangle shape"} />
      <ToolButton toolName={CIRCLE} text={"Create a circle shape"} />
      <ToolButton toolName={SELECT_TOOL} text={"Select an annotation"} />
    </div>
  );
}

export default Toolbar;
