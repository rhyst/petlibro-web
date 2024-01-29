import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [onClose]);

  const root = document.getElementById("modal-root");

  if (!root || !props.open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={ref}
        className="relative z-10 bg-white dark:bg-[#000000] rounded-sm shadow-lg w-full max-w-lg border border-white p-6"
        {...props}
      >
        {children}
      </div>
    </div>,
    root
  );
};

export default Modal;