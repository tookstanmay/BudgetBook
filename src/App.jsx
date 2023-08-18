import * as React from "react";

// rrd imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Library imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages imports
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

// layouts imports
import Main, { mainLoader } from "./layouts/Main";

// actions imports
import { logoutAction } from "./actions/logout";
import { deleteBudgetAction } from "./actions/deleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudgetAction,
          },
        ],
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
