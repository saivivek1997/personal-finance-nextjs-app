import { financeData } from "@/data/data";
import {
  BudgetIcon,
  OverviewIcon,
  PotsIcon,
  RecurringBillIcon,
  TransactionIcon,
} from "@/app/components/svgIcon";
import { useAppSelector } from "@/lib/hooks";
import React from "react";

const TABLE_HEADERS = [
  { id: "recipient", headerName: "Recipient/Sender" },
  { id: "category", headerName: "Category" },
  { id: "date", headerName: "Transaction Date" },
  { id: "amount", headerName: "Amount" },
];

const SORT_OPTIONS = {
  LATEST: "Latest",
  OLDEST: "Oldest",
  A_TO_Z: "A to Z",
  Z_TO_A: "Z to A",
  HIGHEST: "Highest",
  LOWEST: "Lowest",
};

const SORT_ITEMS = Object.values(SORT_OPTIONS).map((value, index) => ({
  id: index + 1,
  value,
}));

const CategoryDropdownItems = () => {
  const uniqueCategories = [
    ...new Set(financeData.transactions.map((trans) => trans.category)),
  ];
  return [
    { id: "all", value: "All Transactions" },
    ...uniqueCategories.map((category, index) => ({
      id: `category-${index}`,
      value: category,
    })),
  ];
};

const sidebarItems = [
  {
    id: 1,
    icon: OverviewIcon,
    name: "Overview",
    link: "/",
  },
  {
    id: 2,
    icon: TransactionIcon,
    name: "Transactions",
    link: "/transactions",
  },
  {
    id: 3,
    icon: BudgetIcon,
    name: "Budgets",
    link: "/budgets",
  },
  {
    id: 4,
    icon: PotsIcon,
    name: "Pots",
    link: "/pots",
  },
  {
    id: 5,
    icon: RecurringBillIcon,
    name: "Recurring bills",
    link: "/recurring-bills",
  },
];

export {
  TABLE_HEADERS,
  SORT_OPTIONS,
  SORT_ITEMS,
  CategoryDropdownItems,
  sidebarItems,
};
