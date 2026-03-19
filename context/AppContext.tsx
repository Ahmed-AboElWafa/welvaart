'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dataService, AppData, User, Portfolio, Transaction, FiatAccount, StockHolding, CryptoHolding } from '@/services/dataService';

export interface AppContextType {
  user: User | null;
  portfolio: Portfolio | null;
  transactions: Transaction[];
  fiatAccounts: FiatAccount[];
  stockHoldings: StockHolding[] | null;
  cryptoHoldings: CryptoHolding[] | null;
  frozenCards: { usd: boolean; eur: boolean; };
  loading: boolean;
  updateUser: (user: User) => Promise<void>;
  updatePortfolio: (portfolio: Portfolio) => Promise<void>;
  addTransaction: (transaction: Transaction) => Promise<void>;
  addFiatAccount: (account: FiatAccount) => Promise<void>;
  updateFiatAccountBalance: (accountId: string, amountChange: number) => Promise<void>;
  toggleCardFreeze: (cardId: 'usd' | 'eur') => Promise<void>;
  addStockHolding: (stockId: string, additionalShares: number, totalCost: number) => Promise<void>;
  addCryptoHolding: (cryptoId: string, additionalAmount: number, totalCost: number) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const initialData = await dataService.getInitialData();
      setData(initialData);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateUser = async (newUser: User) => {
    if (!data) return;
    const updatedData = { ...data, user: newUser };
    setData(updatedData);
    await dataService.updateData(updatedData);
  };

  const updatePortfolio = async (newPortfolio: Portfolio) => {
    if (!data) return;
    const updatedData = { ...data, portfolio: newPortfolio };
    setData(updatedData);
    await dataService.updateData(updatedData);
  };

  const addTransaction = async (transaction: Transaction) => {
    if (!data) return;
    setLoading(true);
    try {
      const updatedData = await dataService.addTransaction(transaction);
      setData(updatedData);
    } catch (error) {
      console.error('Failed to add transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFiatAccount = async (account: FiatAccount) => {
    if (!data) return;
    setLoading(true);
    try {
      const updatedData = await dataService.addFiatAccount(account);
      setData(updatedData);
    } catch (error) {
      console.error('Failed to add fiat account:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFiatAccountBalance = async (accountId: string, amountChange: number) => {
    if (!data) return;
    setLoading(true);
    try {
      const updatedData = await dataService.updateFiatAccountBalance(accountId, amountChange);
      setData(updatedData);
    } catch (error) {
      console.error('Failed to update fiat account balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCardFreeze = async (cardId: 'usd' | 'eur') => {
    if (!data) return;
    setLoading(true);
    try {
      const updatedData = await dataService.toggleCardFreeze(cardId);
      setData(updatedData);
    } catch (error) {
      console.error('Failed to toggle card freeze:', error);
    } finally {
      setLoading(false);
    }
  };

  const addStockHolding = async (stockId: string, additionalShares: number, totalCost: number) => {
    if (!data) return;
    setLoading(true);
    try {
      const updatedData = await dataService.addStockHolding(stockId, additionalShares, totalCost);
      setData(updatedData);
    } catch (error) {
      console.error('Failed to add stock holding:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCryptoHolding = async (cryptoId: string, additionalAmount: number, totalCost: number) => {
    if (!data) return;
    setLoading(true);
    try {
      const updatedData = await dataService.addCryptoHolding(cryptoId, additionalAmount, totalCost);
      setData(updatedData);
    } catch (error) {
      console.error('Failed to add crypto holding:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  const fiatRates: Record<string, number> = { usd: 1, eur: 1.085, gbp: 1.27, chf: 1.12, aed: 0.272, cad: 0.741, jpy: 0.00667 };
  let dynamicPortfolio = data?.portfolio || null;
  
  const KNOWN_SYMBOLS = ['د.إ', '€', '£', '¥', 'CHF', '$'];
  if (data?.portfolio && data?.fiatAccounts) {
    const totalFiatUSD = data.fiatAccounts.reduce((sum, acc) => {
      let s = acc.balance;
      for (const sym of KNOWN_SYMBOLS) s = s.replaceAll(sym, '');
      const numBalance = parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
      const rate = fiatRates[acc.id] || 1;
      return sum + (numBalance * rate);
    }, 0);
    
    dynamicPortfolio = {
      ...data.portfolio,
      fiat: totalFiatUSD,
      totalValue: totalFiatUSD + data.portfolio.crypto + data.portfolio.stocks + data.portfolio.gold
    };
  }

  return (
    <AppContext.Provider
      value={{
        user: data?.user || null,
        portfolio: dynamicPortfolio,
        transactions: data?.transactions || [],
        fiatAccounts: data?.fiatAccounts || [],
        stockHoldings: data?.stockHoldings || null,
        cryptoHoldings: data?.cryptoHoldings || null,
        frozenCards: data?.frozenCards || { usd: false, eur: false },
        loading,
        updateUser,
        updatePortfolio,
        addTransaction,
        addFiatAccount,
        updateFiatAccountBalance,
        toggleCardFreeze,
        addStockHolding,
        addCryptoHolding,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
