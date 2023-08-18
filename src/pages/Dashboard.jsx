import React from "react";
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../helper";

// react router dom imports
import { Link, useLoaderData } from "react-router-dom";

// components import
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import AddExpenseForm from "../components/AddExpenseForm";

// toastify imports
import { toast } from "react-toastify";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

// action
export async function dashboardAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was problem creating your account!");
    }
  } else if (_action === "createBudget") {
    try {
      // create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Your budget is created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget!");
    }
  } else if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });

      return toast.success(`${values.newExpense} added!`);
    } catch (e) {
      throw new Error("There was a problem adding your Expense!");
    }
  } else if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });

      return toast.success(`Expense deleted!`);
    } catch (e) {
      throw new Error("There was a problem deleting your Expense!");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to={"expenses"} className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Track your expenses by creating a budget.</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
