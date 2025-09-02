export interface Category {
  name: string;
}
export interface CategoryItem extends Category {
  _id: string;
}

export interface DashboardStats {
  currentBalance: number;
  totalExpense: number;
  totalIncome: number;
}

export interface CategoryBreakdownItem {
  categoryId: string;
  categoryName: string;
  total: number;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expenses: number;
}
export interface MonthlySummaryItem {
  month: string;
  income: number;
  expenses: number;
}

export interface DashboardResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface ExpenseTrendsChart {
  monthlyExpenses: {
    values: number[];
  };
  categoryExpenses: {
    categories: string[];
    values: number[];
  };
  categoryTrends: Record<string, number[]>;
  labels: string[];
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface TransactionInput {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  categoryId: string;
  date: string;
}

export interface ITransactionType {
  _id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  categoryId: string;
  categoryName?: string;
  date: string;
  userId: string;
}
