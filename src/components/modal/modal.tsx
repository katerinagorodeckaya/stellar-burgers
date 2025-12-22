import { FC, memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '../ui/modal/modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

const modalRoot = document.getElementById('modals');

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children, ...props }) => {
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [onClose]);

    if (!modalRoot) return null;

    return createPortal(
      <>
        <div
          className={styles.modal}
          data-testid='modal' // ← ДОБАВИТЬ
          {...props} // ← ДОБАВИТЬ ЕСЛИ НЕТ
        >
          <div className={styles.header}>
            <h3 className={`${styles.title} text text_type_main-large`}>
              {title}
            </h3>
            <button
              className={styles.button}
              type='button'
              data-testid='modal-close' // ← ДОБАВИТЬ
              onClick={onClose} // ← УБЕДИТЕСЬ ЧТО ЕСТЬ
            >
              <CloseIcon type='primary' />
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
        <ModalOverlayUI
          onClick={onClose}
          data-testid='modal-overlay' // ← ПЕРЕДАЕТСЯ В ModalOverlayUI
        />
      </>,
      modalRoot
    );
  }
);
