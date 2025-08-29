export interface ITransactionType {
  _id: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId:
    | {
        _id: string;
        name: string;
      }
    | string;
  description: string;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  categoryName?: string;
}

export interface Category {
  name: string;
}
export interface CategoryItem extends Category {
  _id: string;
}

// Global dashboard types
export interface DashboardStats {
  currentBalance: number;
  totalExpense: number;
  totalIncome: number;
}

// For Category Breakdown
export interface CategoryBreakdownItem {
  categoryId: string;
  categoryName: string;
  total: number;
}

// For Monthly Summary
export interface MonthlySummary {
  month: string;
  income: number;
  expenses: number;
}

// For Expense Trends chart
export interface ExpenseTrendsChart {
  labels: string[]; // e.g. ["Jan", "Feb", "Mar"]
  monthlyExpenses: {
    values: number[];
  };
  categoryExpenses: {
    categories: string[];
    values: number[];
  };
  categoryTrends: {
    [category: string]: number[]; // category -> values per month
  };
}
