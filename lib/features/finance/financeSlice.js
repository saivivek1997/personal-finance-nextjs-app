import { financeData } from "@/data/data";
import { createSlice } from "@reduxjs/toolkit";

export const financeSlice = createSlice({
  name: "finance",
  initialState: {
    financeData: financeData,
    budgetData: [],
  },
  reducers: {
    setBudgetData: (state, action) => {
      const updatedTransactions = structuredClone(financeData.transactions);
      const filteredLatestDateWithCategory = updatedTransactions
        .filter((trans) => trans.category === action.payload.category)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      const isCurrentMonth = (date) => {
        const now = new Date();
        const transactionDate = new Date(date);
        return (
          transactionDate.getMonth() === 7 &&
          transactionDate.getFullYear() === now.getFullYear()
        );
      };

      const filterCurrentMonthTransactions = () => {
        return filteredLatestDateWithCategory.filter(
          (transaction) =>
            isCurrentMonth(transaction.date) && transaction.amount < 0
        );
      };
      console.log(filterCurrentMonthTransactions(), "transactions");
      let spentMoney = filterCurrentMonthTransactions().reduce(
        (acc, curr) => acc + curr.amount,
        0
      );

      const percentage =
        (Math.abs(spentMoney) / Math.abs(action.payload.maximum)) * 100;
      const latestThreeTransaction = filteredLatestDateWithCategory.slice(0, 3);
      const isIdFound = state?.budgetData?.find(
        (budget) => budget.id === action.payload.id
      )?.id;
      if (isIdFound) {
        state.budgetData = state.budgetData.map((budgetData) =>
          budgetData.id === action.payload.id
            ? {
                ...budgetData,
                maximum: action.payload.maximum,
                theme: action.payload.theme,
                category: action.payload.category,
              }
            : budgetData
        );
      } else {
        state.budgetData = state.budgetData.concat({
          category: action.payload.category,
          theme: action.payload.theme,
          maximum: action.payload.maximum,
          spentMoney: Math.abs(spentMoney),
          percentage,
          latestThreeTransaction,
          id: action.payload.id,
        });
      }
    },
    addBudgetDataInFinanceData: (state, action) => {
      state.financeData.budgets = state.financeData.budgets.concat(
        action.payload
      );
    },
    editBudgetDataInFinanceData: (state, action) => {
      const { id, category, maximum, theme } = action.payload;
      state.financeData.budgets = state.financeData.budgets.map((budget) =>
        budget.id === id
          ? {
              id,
              category,
              maximum,
              theme,
            }
          : budget
      );
    },

    deleteBudgetCategory: (state, action) => {
      state.financeData.budgets = state.financeData.budgets.filter(
        (budget) => budget.id !== action.payload
      );
    },

    // ==============pots==================
    addNewPot: (state, action) => {
      state.financeData.pots = state.financeData.pots.concat(action.payload);
    },
    editNewPot: (state, action) => {
      const { id, name, target, theme, total } = action.payload;
      state.financeData.pots = state.financeData.pots.map((pot) =>
        pot.id === id
          ? {
              id,
              name,
              target,
              theme,
              total,
            }
          : pot
      );
    },
    addMoneyOrWithdrawToBalance: (state, action) => {
      const { type, amount, id } = action.payload;
      if (type === "add") {
        state.financeData.balance.current -= +amount;
        state.financeData.pots = state.financeData.pots.map((pot) =>
          pot.id === id ? { ...pot, total: pot.total + +amount } : pot
        );
      } else {
        state.financeData.balance.current += +amount;
        state.financeData.pots = state.financeData.pots.map((pot) =>
          pot.id === id ? { ...pot, total: pot.total - +amount } : pot
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addBudgetDataInFinanceData,
  setBudgetData,
  editBudgetDataInFinanceData,
  deleteBudgetCategory,
  addNewPot,
  editNewPot,
  addMoneyOrWithdrawToBalance,
} = financeSlice.actions;

export default financeSlice.reducer;
