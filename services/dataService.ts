const STORAGE_KEY = 'globalfin_data_v2';

export interface User {
  name: string;
  avatarUrl: string;
  isPremium: boolean;
}

export interface FiatAccount {
  id: string;
  name: string;
  currency: string;
  balance: string;
  flag: string;
  holder: string;
  swift: string;
  label: string;
  accountId: string;
}

export interface StockHolding {
  id: string;
  shares: number;
  purchasePrice: number;
}

export interface CryptoHolding {
  id: string;
  amount: number;
  purchasePrice: number;
}

export interface Portfolio {
  totalValue: number;
  todayChange: number;
  fiat: number;
  crypto: number;
  stocks: number;
  gold: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'fiat' | 'crypto' | 'stocks' | 'gold';
  description: string;
  details: string;
  amount: number;
  currency?: string;
  value: number;
}

export interface AppData {
  user: User;
  portfolio: Portfolio;
  transactions: Transaction[];
  fiatAccounts: FiatAccount[];
  stockHoldings: StockHolding[];
  cryptoHoldings: CryptoHolding[];
  frozenCards: { usd: boolean; eur: boolean; };
}

const initialData: AppData = {
  user: {
    name: '',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZldJBPCcKjFC93-Z-E8sgG-K1jIWqItCd7YJ-oPmQIhg6qrJHJAUEyDlGKHHAY8kA1SkYLTEUMc5hbcypFPuijXc5cUJ_1miP2i6pS5Dnv7i9RUMBEu0p7-MtDPVla9WTw-UqSNuYpJEtS0OPy4LAsXvexhEW5oa-lyZy1muA-_4QJjhrV3WB3KTEB9goB8TODzAFDs1-Z3KUr0zs80nUKMZ8V5KYceVNg1qmVwd8m2qVTPSdFfVobZ3JvFHIjqi_LsbZYqBr_Em2',
    isPremium: true,
  },
  portfolio: {
    totalValue: 119718.12,
    todayChange: 2.4,
    fiat: 52430,
    crypto: 24138.88,
    stocks: 16928.68,
    gold: 14000,
  },
  fiatAccounts: [
    {
      id: 'usd',
      name: 'USD Account',
      currency: 'United States Dollar',
      balance: '$42,150.00',
      flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGTHDIVw5DJytsPq7_46JmZGEI-KVW3Raa9wLXY22WapssM_oAelaLJSZFgqgmXnHNu3PX3IuKmfgZfSiQtRa52L0Gat_bTyQGM1qfEqQ1vn_-f7DjYE_MYkJCjQXsaIGAmBeX4GTyZCqGbd1KVlLkDwQ5Q2uKEB9bRPvjB2qH6kNlaJSKYmJrmw6HfUiu_4pFGgbO0_1pGuxi8TCJ97_A9qOqCUfmn_OImG3JXF3_WaTjpyVrvZcV_BQ1yt7tS8ji_Vk14GkVhLJm',
      holder: 'Alex Sterling',
      swift: 'CHASEUS33',
      label: 'IBAN',
      accountId: 'GB55 1820 6016 1347 6008',
    },
    {
      id: 'eur',
      name: 'EUR Account',
      currency: 'Euro',
      balance: '€9,380.00',
      flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqf1ek9Bt_Z3ZGMqWXV5qLa1VBeJeFdXzIBNRs4AzyfYoiXm5DV-olRN1Mx9oyLuHKbi-Q4bUp1lXbr1L4BzO3SiPA0U7W5PwrToD_bz96ODIYI7yiO_suwCk41eNS1T3L05Cdf9lwcNbX4Y1CCNwJwbUIjjSyqpm08rq4neYQKDlaQtoLpbXD5MewO5WtaXxddQfiGAMOY78DrON5eaCVboK0BUIMb4yz1mX9YpxiHbXKlsFXUlD75efyGwgGUzflKFWVw-tvg_eI',
      holder: 'Alex Sterling',
      swift: 'REVOLEU21',
      label: 'IBAN',
      accountId: 'LT88 3500 0122 9384 5510',
    },
  ],
  stockHoldings: [
    { id: 'aapl', shares: 24.8, purchasePrice: 162.4 },
    { id: 'tsla', shares: 5.0, purchasePrice: 210.0 },
    { id: 'nvda', shares: 8.2, purchasePrice: 620.0 },
    { id: 'msft', shares: 10.0, purchasePrice: 380.0 },
  ],
  cryptoHoldings: [
    { id: 'btc', amount: 0.145, purchasePrice: 42000 },
    { id: 'eth', amount: 2.4, purchasePrice: 2100 },
    { id: 'sol', amount: 45.0, purchasePrice: 85 },
  ],
  transactions: [
    {
      id: '1',
      date: new Date().toISOString(),
      type: 'stocks',
      description: 'Bought Apple Stock',
      details: 'AAPL • 10:24 AM',
      amount: 0.42,
      currency: 'AAPL',
      value: -98.40,
    },
    {
      id: '2',
      date: new Date().toISOString(),
      type: 'crypto',
      description: 'Received Bitcoin',
      details: 'External Wallet • 08:15 AM',
      amount: 0.0024,
      currency: 'BTC',
      value: 152.20,
    },
    {
      id: '3',
      date: new Date(Date.now() - 86400000).toISOString(),
      type: 'fiat',
      description: 'Card Purchase',
      details: 'Coffee Shop • 04:30 PM',
      amount: -4.50,
      value: -4.50,
    },
    {
      id: '4',
      date: new Date(Date.now() - 86400000).toISOString(),
      type: 'gold',
      description: 'Gold Purchase',
      details: 'Market Order • 11:05 AM',
      amount: 5.00,
      currency: 'GOLD',
      value: -325.00,
    },
  ],
  frozenCards: {
    usd: false,
    eur: false,
  },
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dataService = {
  async getInitialData(): Promise<AppData> {
    await delay(300 + Math.random() * 200);
    if (typeof window === 'undefined') return initialData;
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        return {
          ...initialData,
          ...parsed,
          frozenCards: parsed.frozenCards || initialData.frozenCards,
        };
      } catch (e) {
        console.error('Failed to parse stored data', e);
        return initialData;
      }
    }
    // Initialize localStorage with initialData
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  },

  async updateData(data: AppData): Promise<void> {
    await delay(100 + Math.random() * 100);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  },

  async addStockHolding(stockId: string, additionalShares: number, totalCost: number): Promise<AppData> {
    await delay(300);
    const currentData = await this.getInitialData();
    const currentHoldings = currentData.stockHoldings || [];

    // Check if user already holds this stock
    const existingIndex = currentHoldings.findIndex(h => h.id === stockId);
    let newHoldings = [...currentHoldings];

    if (existingIndex >= 0) {
      const existing = currentHoldings[existingIndex];
      const previousTotalCost = existing.shares * existing.purchasePrice;
      const newTotalShares = existing.shares + additionalShares;
      const newAveragePrice = (previousTotalCost + totalCost) / newTotalShares;

      newHoldings[existingIndex] = {
        ...existing,
        shares: newTotalShares,
        purchasePrice: newAveragePrice,
      };
    } else {
      newHoldings.push({
        id: stockId,
        shares: additionalShares,
        purchasePrice: totalCost / additionalShares,
      });
    }

    const updatedData = {
      ...currentData,
      stockHoldings: newHoldings,
    };
    await this.updateData(updatedData);
    return updatedData;
  },

  async addCryptoHolding(cryptoId: string, additionalAmount: number, totalCost: number): Promise<AppData> {
    await delay(300);
    const currentData = await this.getInitialData();
    const currentHoldings = currentData.cryptoHoldings || [];

    const existingIndex = currentHoldings.findIndex(h => h.id === cryptoId);
    let newHoldings = [...currentHoldings];

    if (existingIndex >= 0) {
      const existing = currentHoldings[existingIndex];
      const previousTotalCost = existing.amount * existing.purchasePrice;
      const newTotalAmount = existing.amount + additionalAmount;
      const newAveragePrice = (previousTotalCost + totalCost) / newTotalAmount;

      newHoldings[existingIndex] = {
        ...existing,
        amount: newTotalAmount,
        purchasePrice: newAveragePrice,
      };
    } else {
      newHoldings.push({
        id: cryptoId,
        amount: additionalAmount,
        purchasePrice: totalCost / additionalAmount,
      });
    }

    const updatedData = {
      ...currentData,
      cryptoHoldings: newHoldings,
    };
    await this.updateData(updatedData);
    return updatedData;
  },

  async addTransaction(transaction: Transaction): Promise<AppData> {
    await delay(500);
    const currentData = await this.getInitialData();
    const updatedData = {
      ...currentData,
      transactions: [transaction, ...currentData.transactions],
      portfolio: {
        ...currentData.portfolio,
        totalValue: currentData.portfolio.totalValue + transaction.value,
        [transaction.type]: currentData.portfolio[transaction.type] + transaction.value,
      },
    };
    await this.updateData(updatedData);
    return updatedData;
  },

  async addFiatAccount(account: FiatAccount): Promise<AppData> {
    await delay(300);
    const currentData = await this.getInitialData();
    const updatedData = {
      ...currentData,
      fiatAccounts: [...(currentData.fiatAccounts || []), account],
    };
    await this.updateData(updatedData);
    return updatedData;
  },

  async updateFiatAccountBalance(accountId: string, amountToAdd: number): Promise<AppData> {
    await delay(100);
    const currentData = await this.getInitialData();
    let updatedAccounts = currentData.fiatAccounts || [];
    const accExists = updatedAccounts.find(a => a.id === accountId);

    if (accExists) {
      updatedAccounts = updatedAccounts.map(acc => {
        if (acc.id === accountId) {
          // parse balance
          const numBalance = parseFloat(acc.balance.replace(/د\.إ/g, '').replace(/[^0-9.-]+/g, '')) || 0;
          const newBalance = numBalance + amountToAdd;
          // Prefix with basic detection
          const prefix = acc.balance.includes('€') ? '€' : acc.balance.includes('£') ? '£' : acc.balance.includes('د.إ') ? 'د.إ ' : acc.balance.includes('¥') ? '¥' : '$';

          return {
            ...acc,
            balance: `${prefix}${newBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          };
        }
        return acc;
      });
    } else {
      const prefix = accountId === 'eur' ? '€' : accountId === 'gbp' ? '£' : accountId === 'aed' ? 'د.إ ' : accountId === 'jpy' ? '¥' : '$';
      let flag = '';
      if (accountId === 'aed') flag = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmKQYx3-Bi6PDFa9bBpV0fURACWaaNRoEtnPA2jv5lfPL9vYSE5kxmn5NR7tbN6fHcbuAO4o3Iv_opPnJke1sDOSQnoGM_7vtid4OWcS1HxE82v8CW7PMp7aiEy53YB--wmv503PlGREkG6D0CZjWuA5p7ACeg8cpxxnd-wMLQnbTGK7iISPHMdEKbaU4lNP6BWnNLfrNt87wTEdvAEH-pv53hoWOZkahDONy_d_ycydw2Rpt4df_sQUiDH43-ThxfT-g_r9aXh9va';
      if (accountId === 'cad') flag = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWxan2EygZoeJrGD5JPj5v9eHxUa2d0Jyyopxls-kSVP-qsP_86w7JqajZIICJmoDIj3QucUJ2U5mfWo-3C0il6di7aEtojVpnkzLiP96ADuCek0xfP4bPYbhSq3ILDz2QtvlwjHQTzfWHtqZT7dJxOB7XsHebxir7q4wtYciuuIM6pqmVg1tcArC-hlCjLj5VnkPbgjBCARtK_uEFqorBQG_wZOtDxc9oZNkZ7AdG92uTiCtUAXH51Onauu7-xQZAqeifMXkKaWtD';
      if (accountId === 'jpy') flag = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE9xDoj25nKVbvve9IUlUY4UqnvsexC0DLGa7UqVkBCkIPtgJ0cRbghBe_gG8WDHnJE--zOELzI0jaMCVOABFs5lC42Tz_fDhYHBxRYbORtELgTXAgKhw2dDrPY8Z6Iqc9aQ274OnOkNdo0Lgk3c_XWz8KjDJzWxqxGvHNs_MZytXzNo07UcIROwpdY5BSqO7p6P8pvaKaXIo5RSc5nYix9nk-8YsatMv_gQO7qtqgGRbTPzzubUiuYHd1oUBT2mV7exB7jepARoXL';

      updatedAccounts.push({
        id: accountId,
        name: `${accountId.toUpperCase()} Account`,
        currency: accountId.toUpperCase(),
        balance: `${prefix}${amountToAdd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        flag: flag,
        holder: 'Alex Sterling',
        swift: `SYS${accountId.toUpperCase()}21`,
        label: 'Account No',
        accountId: Math.floor(10000000 + Math.random() * 90000000).toString(),
      });
    }

    const updatedData = {
      ...currentData,
      fiatAccounts: updatedAccounts,
    };
    await this.updateData(updatedData);
    return updatedData;
  },

  async toggleCardFreeze(cardId: 'usd' | 'eur'): Promise<AppData> {
    await delay(100);
    const currentData = await this.getInitialData();
    const currentFrozen = currentData.frozenCards || { usd: false, eur: false };
    const updatedData = {
      ...currentData,
      frozenCards: {
        ...currentFrozen,
        [cardId]: !currentFrozen[cardId],
      },
    };
    await this.updateData(updatedData);
    return updatedData;
  },
};
