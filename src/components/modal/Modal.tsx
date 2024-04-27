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
        console.log("escape pressed");
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
      //   className="modal modalOverlay absolute top-0 bottom-0 left-0 right-0 bg-transparent backdrop-blur-md z-10 flex flex-col items-center"
      className={styles.modal}
      onClick={(evt) => closeModalOnClickOutside(evt)}>
      <button
        className="absolute top-0 right-0 w-[55px] h-[55px]"
        onClick={onClose}>
        <span className="block w-[25px] h-[25px] bg-no-repeat bg-center bg-contain bg-[url('../../public/close-button.svg')]"></span>
      </button>
      <div
        className="p-5 m-14  bg-gray-700 rounded max-w-[960px]"
        onClick={(evt) => {
          evt.stopPropagation();
        }}>
        <div>
          <h2>{heading}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
