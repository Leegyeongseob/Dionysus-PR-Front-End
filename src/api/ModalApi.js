import React, { useEffect } from "react";
import ReactModal from "react-modal";
import styles from "../style/loginstyle/ModalApi.module.css";
import { BiSolidDrink } from "react-icons/bi"; // 성공 이미지
import { MdNoDrinks } from "react-icons/md"; // 실패 이미지
const ModalApi = {
  SuccessModal: ({ isOpen, onClose, modalTitle, modalText }) => {
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          onClose();
        }
      };

      if (isOpen) {
        window.addEventListener("keydown", handleKeyDown);
      } else {
        window.removeEventListener("keydown", handleKeyDown);
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, onClose]);

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <div className={styles.container}>
          <div>
            <h2 className={styles.modalTitle}>{modalTitle}</h2>
          </div>
          <div>
            <BiSolidDrink size="100" color="rgb(8,64,62)" />
          </div>
          <div>
            <h2 className={styles.modalText}>{modalText}</h2>
          </div>
          <div>
            <button className={styles.closeButton} onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </ReactModal>
    );
  },
  FailModal: ({ isOpen, onClose, modalTitle, modalText }) => {
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          onClose();
        }
      };

      if (isOpen) {
        window.addEventListener("keydown", handleKeyDown);
      } else {
        window.removeEventListener("keydown", handleKeyDown);
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, onClose]);

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <div className={styles.container}>
          <div>
            <h2 className={styles.modalTitle}>{modalTitle}</h2>
          </div>
          <div>
            <MdNoDrinks size="100" color="rgb(82,1,32)" />
          </div>
          <div>
            <h2 className={styles.modalText}>{modalText}</h2>
          </div>
          <div>
            <button className={styles.closeButton} onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </ReactModal>
    );
  },
};

export default ModalApi;
