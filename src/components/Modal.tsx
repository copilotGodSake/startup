import React from "react";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div>
        <div>
          <button onClick={onClose}>&times;</button>
          {children}
        </div>
      </div>
    </>
  );
};
