import { SELECT_TOOL } from "@/lib/constants";
import {
  setTool,
  enableDrawing,
} from "@/lib/store/features/canvas/canvasSlice";
import { useAppSelector } from "@/lib/store/store";
import { Tool } from "@/lib/types";
import { useDispatch } from "react-redux";
import styles from "./ToolButton.module.css";
import { disableEditingMode } from "@/lib/store/features/annotation/annotationSlice";

interface ToolButtonProps {
  toolName: Tool;
  text: string;
}

function ToolButton({ toolName, text }: ToolButtonProps) {
  const activeTool = useAppSelector((state) => state.canvasReducer.tool);
  const activeAnnotation = useAppSelector((state) =>
    state.annotationReducer.annotations.find(
      (annotation) => annotation.isEditing === true
    )
  );
  const dispatch = useDispatch();

  function onToolButtonClick(toolToActivate: string) {
    dispatch(setTool(toolToActivate));

    if (toolToActivate !== SELECT_TOOL) {
      dispatch(enableDrawing());
      if (activeAnnotation) {
        dispatch(disableEditingMode(activeAnnotation.id));
      }
    }
  }

  return (
    <button
      className={`${styles.toolButton} ${
        activeTool === toolName ? styles.activeButton : ""
      }`}
      onClick={() => onToolButtonClick(toolName)}>
      {text}
    </button>
  );
}

export default ToolButton;
