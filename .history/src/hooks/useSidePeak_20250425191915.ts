import { useState } from 'react';

type UseSidePeakReturn = {
  isOpen: boolean;
  selectedData: any | null;
  openPeak: (data: any) => void;
  closePeak: () => void;
};

export const useSidePeak = (): UseSidePeakReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const openPeak = (data: any) => {
    setSelectedData(data);
    setIsOpen(true);
  };

  const closePeak = () => {
    setIsOpen(false);
    setSelectedData(null);
  };

  return {
    isOpen,
    selectedData,
    openPeak,
    closePeak,
  };
};
