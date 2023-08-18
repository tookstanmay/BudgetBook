// wait
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// color
const generateRandomColor = () => {
  const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetsLength * 50} 80% 40%`;
};

//local Storage

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// create Expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// formatting

//   formatting date
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

//   formatting currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

//   formatting percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if budget.id === expense.id
    if (budgetId !== expense.budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};
