import { ReactNode, SyntheticEvent, useEffect } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  heading: string;
}

function Modal({ onClose, children, heading }: ModalProps) {
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  function closeModalOnClickOutside(evt: SyntheticEvent) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.currentTarget.classList.contains("modalOverlay") && onClose();
  }

  return (
    <div
      className={styles.modal}
      onClick={(evt) => closeModalOnClickOutside(evt)}>
      <button onClick={onClose}>
        <span className=""></span>
      </button>
      <div
        className={styles.contentContainer}
        onClick={(evt) => {
          evt.stopPropagation();
        }}>
        <h2 className={styles.heading}>{heading}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
