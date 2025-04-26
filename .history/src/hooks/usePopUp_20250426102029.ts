import { useState } from 'react';

type PopUpMode = 'edit' | 'view';

type UsePopUpReturn = {
  isOpen: boolean;
  mode: PopUpMode;
  selectedData: any | null;
  openPopUp: (mode: PopUpMode, data?: any) => void;
  closePopUp: () => void;
};

export const usePopUp = (): UsePopUpReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<PopUpMode>('edit');
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const openPopUp = (mode: PopUpMode, data: any = null) => {
    setMode(mode);
    setSelectedData(data);
    setIsOpen(true);
  };

  const closePopUp = () => {
    setIsOpen(false);
    setSelectedData(null);
  };

  return {
    isOpen,
    mode,
    selectedData,
    openPopUp,
    closePopUp,
  };
};
