import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({
  onClick,
  ...props // ← ДОБАВИТЬ ЭТО
}: {
  onClick: () => void;
}) => (
  <div
    className={styles.overlay}
    onClick={onClick}
    {...props} // ← ДОБАВИТЬ ЭТО
    data-testid='modal-overlay' // ← ДОБАВИТЬ ЭТО
  />
);
