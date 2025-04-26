import { useState } from 'react';

type PopUpType = 'center' | 'left';

type UsePopUpReturn = {
  isOpen: boolean;
  popUpType: PopUpType;
  selectedData: any | null;
  openPopUp: (type: PopUpType, data?: any) => void;
  closePopUp: () => void;
};

export const usePopUp = (): UsePopUpReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [popUpType, setPopUpType] = useState<PopUpType>('center');
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const openPopUp = (type: PopUpType = 'center', data: any = null) => {
    setPopUpType(type);
    setSelectedData(data);
    setIsOpen(true);
  };

  const closePopUp = () => {
    setIsOpen(false);
    setSelectedData(null);
  };

  return {
    isOpen,
    popUpType,
    selectedData,
    openPopUp,
    closePopUp,
  };
};
