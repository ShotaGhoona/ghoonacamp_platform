import { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type SidePeakProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const SidePeak = ({ isOpen, onClose, children }: SidePeakProps) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}; 