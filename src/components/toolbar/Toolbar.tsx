import styles from "./Toolbar.module.css";

interface ToolbarProps {
  onToolButtonClick: (tool: string) => void;
}

function Toolbar({ onToolButtonClick }: ToolbarProps) {
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
