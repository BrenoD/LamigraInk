import React, { createContext, useContext, useState } from 'react';

interface GiftCardData {
  amount: number;
  recipientName: string;
  recipientEmail: string;
  message: string;
}

interface GiftCardContextType {
  giftCardData: GiftCardData;
  setGiftCardData: (data: GiftCardData) => void;
}

const GiftCardContext = createContext<GiftCardContextType | undefined>(undefined);

export const GiftCardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [giftCardData, setGiftCardData] = useState<GiftCardData>({
    amount: 50,
    recipientName: '',
    recipientEmail: '',
    message: ''
  });

  return (
    <GiftCardContext.Provider value={{ giftCardData, setGiftCardData }}>
      {children}
    </GiftCardContext.Provider>
  );
};

export const useGiftCard = () => {
  const context = useContext(GiftCardContext);
  if (!context) {
    throw new Error('useGiftCard deve ser usado dentro de um GiftCardProvider');
  }
  return context;
}; 