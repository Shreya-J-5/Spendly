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




document.addEventListener("DOMContentLoaded", function () {
    // 1. Load Data from LocalStorage
    let accountsData = JSON.parse(localStorage.getItem('myAccounts')) || [];
    const accountsGrid = document.getElementById("dashboardAccountsGrid");
    const totalBalanceEl = document.getElementById("displayTotalBalance");
    const accountSelect = document.getElementById("modalAccountSelect");

    // 2. Render Accounts on Dashboard & Calculate Total
    function renderDashboardAccounts() {
        if (!accountsGrid) return; // Error safety
        
        accountsGrid.innerHTML = "";
        let grandTotal = 0;

        if (accountsData.length === 0) {
            accountsGrid.innerHTML = `<div class="col-12 text-secondary">No accounts found. Please add accounts first.</div>`;
        } else {
            accountsData.forEach(acc => {
                // Calculate Total Logic
                grandTotal += parseFloat(acc.amount);

                // Create Card HTML
                const html = `
                <div class="col-md-3 col-6">
                    <div class="glass-card p-3 h-100">
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <div class="fs-4">${acc.icon}</div>
                            <div class="text-truncate fw-bold">${acc.name}</div>
                        </div>
                        <div class="fs-5 fw-bold text-light">₹ ${Number(acc.amount).toLocaleString()}</div>
                    </div>
                </div>`;
                accountsGrid.innerHTML += html;

                // Fill Dropdown Logic (Step 3 wala)
                if (accountSelect) {
                    const option = document.createElement("option");
                    option.value = acc.name; // Backend will receive Account Name
                    option.setAttribute('data-id', acc.id); // Store ID for JS logic
                    option.innerText = `${acc.icon} ${acc.name} (₹${acc.amount})`;
                    accountSelect.appendChild(option);
                }
            });
        }

        // 3. Update Dashboard Total Balance
        if (totalBalanceEl) {
            totalBalanceEl.innerText = "₹ " + grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 });
        }
    }

    // Run Render Function
    renderDashboardAccounts();

    // 4. Handle Form Submission (Update Balance Logic)
    const expenseForm = document.getElementById("expenseForm");
    if (expenseForm) {
        expenseForm.addEventListener("submit", function (e) {
            // Note: Hum e.preventDefault() NAHI karenge kyunki hum chahte hain form Flask par submit ho.
            // Hum bas submit hone se pehle LocalStorage update karenge.

            const type = document.querySelector('input[name="type"]:checked').value; // Income or Expense
            const amount = parseFloat(document.querySelector('input[name="amount"]').value);
            const selectBox = document.getElementById("modalAccountSelect");
            const selectedOption = selectBox.options[selectBox.selectedIndex];
            const accountId = selectedOption.getAttribute('data-id');

            if (accountId && !isNaN(amount)) {
                // Find account in array
                const accIndex = accountsData.findIndex(acc => acc.id == accountId);

                if (accIndex !== -1) {
                    if (type === "Expense") {
                        // Check for sufficient balance (Optional)
                        if (accountsData[accIndex].amount < amount) {
                            alert("Warning: Insufficient balance in this account!");
                            // e.preventDefault(); return; // Uncomment to stop transaction
                        }
                        accountsData[accIndex].amount -= amount;
                    } else {
                        // Income
                        accountsData[accIndex].amount = parseFloat(accountsData[accIndex].amount) + amount;
                    }

                    // Save updated balance to LocalStorage
                    localStorage.setItem('myAccounts', JSON.stringify(accountsData));
                }
            }
            // Ab form Flask server par submit hoga aur page reload hoga
        });
    }
});


