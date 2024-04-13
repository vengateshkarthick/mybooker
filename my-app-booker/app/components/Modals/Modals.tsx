"use client";

import React, { useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalInterface extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  content?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disable?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

export default function Modal({
  open,
  onClose,
  onSubmit,
  secondaryAction,
  secondaryLabel,
  footer,
  content,
  children,
  title,
  actionLabel,
  disable,
}: ModalInterface) {
  const [showModal, setShowModal] = React.useState<boolean>(open);

  React.useEffect(() => {
    setShowModal(open);
  }, [open]);

  const handleClose = React.useCallback(() => {
    if (disable) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disable]);

  const handleSubmit = useCallback(() => {
    if (disable) return;

    onSubmit();
  }, [disable, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disable) return;

    secondaryAction?.();
  }, [disable, secondaryAction]);

  if (!open) return null;

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 fixed">
        <div className="relative w-ful md:w-[35vw] lg:w-[20vw] xl:w-3/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div
            className={`translate duration-300 h-full ${
              showModal
                ? "translate-y-0 opcatity-100"
                : "translate-y-full opacity-0"
            }` }
          >
            <div className="translate h-full md:h-auto lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none bg-white focus:outline-none">
              <div className="flex items-center p-6 rounde-t justify-center relative border-b">
                <button
                  className="p-1 border-0 hover:opactiy-70 transistion absolute left-9"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-2xl font-semibold">{title}</div>
              </div>
              <div className="relative p-6 flex-auto">{children}</div>
              <div className="flex flex-col gap-2  p-6">
                <div className="flex flex-col items-center gap-4 w-full">
                  {secondaryAction && secondaryLabel && (
                    <Button
                      disable={disable}
                      label={secondaryLabel as string}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}

                  <Button
                    disable={disable}
                    label={actionLabel}
                    onClick={onSubmit}
                  />
                </div>
                {footer}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
