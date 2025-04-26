import { useState } from 'react';

type UsePopUpReturn = {
  isOpen: boolean;
  selectedData: any | null;
  showMemberGoals: boolean;
  openPopUp: (data?: any) => void;
  closePopUp: () => void;
  toggleMemberGoals: () => void;
};

export const usePopUp = (): UsePopUpReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [showMemberGoals, setShowMemberGoals] = useState(false);

  const openPopUp = (data: any = null) => {
    setSelectedData(data);
    setIsOpen(true);
    setShowMemberGoals(false);
  };

  const closePopUp = () => {
    setIsOpen(false);
    setSelectedData(null);
    setShowMemberGoals(false);
  };

  const toggleMemberGoals = () => {
    setShowMemberGoals(!showMemberGoals);
  };

  return {
    isOpen,
    selectedData,
    showMemberGoals,
    openPopUp,
    closePopUp,
    toggleMemberGoals,
  };
};
