// ================= CATEGORY ARRAYS =================
const incomeCategories = [
  "Parents",
  "Salary",
  "Sale",
  "Grants",
  "Gift",
  "Interest",
];

const expenseCategories = [
  "Food",
  "Beauty",
  "Entertainment",
  "Education",
  "Health",
  "Bills",
  "Shopping",
  "Car",
  "Baby",
  "Sports",
  "Tax",
  "Transportation",
  "Utilities",
  "Other",
];

// ================= NOTES FUNCTIONS =================
function deleteNote(noteId) {
  fetch("/delete-note", {
    method: "POST",
    body: JSON.stringify({ noteId: noteId }),
  }).then((_res) => {
    window.location.href = "/";
  });
}


// ================= EXPENSES FUNCTIONS =================
function loadCategories(type) {
  const categorySelect = document.getElementById("categorySelect");
  if (!categorySelect) return;

  categorySelect.innerHTML = "<option selected>Select category</option>";

  const categories =
    type === "Income" ? incomeCategories : expenseCategories;

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function deleteExpense(expenseId) {
  if (confirm("Are you sure you want to delete this transaction?")) {
    fetch(`/delete-expense/${expenseId}`, {
      method: "POST",
    })
      .then(() => location.reload())
      .catch((error) => console.error("Error:", error));
  }
}

function initializeDashboard() {
  const categorySelect = document.getElementById("categorySelect");
  const incomeRadio = document.getElementById("incomeRadio");
  const expenseRadio = document.getElementById("expenseRadio");
  const expenseForm = document.getElementById("expenseForm");

  if (!categorySelect) return; // Exit if not on dashboard page

  // Default load (Income)
  loadCategories("Income");

  // Event listeners for category switching
  if (incomeRadio) {
    incomeRadio.addEventListener("change", () => loadCategories("Income"));
  }
  if (expenseRadio) {
    expenseRadio.addEventListener("change", () => loadCategories("Expense"));
  }

  // Handle form submission
  if (expenseForm) {
    expenseForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(expenseForm);

      try {
        const response = await fetch("/add-expense", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          location.reload();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
}

// Initialize dashboard when DOM is ready
document.addEventListener("DOMContentLoaded", initializeDashboard);

