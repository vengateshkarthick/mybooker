import React, { useCallback, useState } from 'react'

export default function useToggle() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return [toggleOpen, isOpen] as const;
}