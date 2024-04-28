import styles from "./Toolbar.module.css";
import { CIRCLE_TOOL, RECTANGLE_TOOL, SELECT_TOOL } from "@/lib/constants";
import ToolButton from "../toolButton/ToolButton";

function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <ToolButton toolName={RECTANGLE_TOOL} text={"Create a rectangle shape"} />
      <ToolButton toolName={CIRCLE_TOOL} text={"Create a circle shape"} />
      <ToolButton toolName={SELECT_TOOL} text={"Select an annotation"} />
    </div>
  );
}

export default Toolbar;
