var expense = [
  { expenseName: "Safari", cost: "240", amount: "1" },
  { expenseName: "Villa", cost: "240", amount: 1 },
  { expenseName: "Baniyan", cost: "110", amount: "3" },
];

var targetExpenseName = document.getElementById("expenseName");
var targetExpenseCost = document.getElementById("expenseCost");
var targetExpenseAmount = document.getElementById("expenseAmount");

document
  .getElementById("addExpense")
  .addEventListener("click", addExpenseToArray);

function addExpenseToArray() {
  var expenseName = targetExpenseName.value;
  var expenseCost = targetExpenseCost.value;
  var expenseAmount = targetExpenseAmount.value;

  if (expenseName && expenseCost && expenseAmount) {
    // expense.push();
    expense = expense.concat([
      { expenseName, cost: expenseCost, amount: expenseAmount },
    ]);
  }

  localStorage.setItem("ExpenseStore", JSON.stringify(expense));

  const history = localStorage.getItem("ExpenseStore");
  const expenseHistory = JSON.parse(history);

  var str = "";
  var totalAmountSpent = 0;
  expenseHistory.map((item) => {
    str += `<li><span><b>${item.expenseName}</b></span> <span><b>Amount - </b>${item.amount}</span> <span><b>Rs - </b>${item.cost}</span></li>`;
    totalAmountSpent += `+${item.cost}* ${item.amount}`;
  });

  const totalMoney = eval(totalAmountSpent);
  document.getElementById("totalAmountSpent").innerText = totalMoney;
  document.getElementById("listOfExpense").innerHTML = str;

  targetExpenseName.value = "";
  targetExpenseCost.value = "";
  targetExpenseAmount.value = "";
}

// localStorage.setItem(1, JSON.stringify(expense));
