// rrd imports
import { redirect } from "react-router-dom";

// helper imports
import { deleteItem, getAllMatchingItems } from "../helper";

// library imports
import { toast } from "react-toastify";

export async function deleteBudgetAction({ params }) {
  try {
    // delete from local storage
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Your Budget is deleted!");

    // redirect to home page
  } catch (e) {
    throw new Error("Error deleting budget!");
  }

  return redirect("/");
}
