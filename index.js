let form = document.querySelector("form");
let closeButton = document.getElementsByClassName("button--close")[0];
let outputContainerBox =
  document.getElementsByClassName("container--output")[0];

let grossSalaryInput = document.getElementById("gross--income");
let extraIncomeInput = document.getElementById("extra--income");
let ageDropdown = document.getElementsByClassName("select--age")[0];
let deductionsInput = document.getElementById("deductions");
let taxAmountBox = document.getElementsByClassName("tax--amount")[0];

form.addEventListener("submit", () => {
  let grossSalary = parseFloat(grossSalaryInput.value);
  let extraIncome = parseFloat(extraIncomeInput.value);
  let age = parseInt(ageDropdown.value);
  let deductions = parseFloat(deductionsInput.value);

  const isValid = validateInputs(
    grossSalaryInput,
    extraIncomeInput,
    deductionsInput
  );

  const ageValid = validateAge(ageDropdown);

  if (isValid & ageValid) {
    tax_amount = calculateTax(grossSalary, extraIncome, age, deductions);
    taxAmountBox.innerHTML = grossSalary + extraIncome - tax_amount;

    outputContainerBox.id = "toggle--behav";
  }
});

closeButton.addEventListener("click", () => {
  outputContainerBox.removeAttribute("id");
});

function validateInputs(...args) {
  let isValid = true;
  args.map((arg) => {
    const regex = /^\d+(\.\d+)?$/;
    argValid = regex.test(parseFloat(arg.value));

    if (!argValid) {
      let errorIcon = arg.parentElement.querySelector(".container--icon");
      errorIcon.removeAttribute("id");
    }
    isValid = isValid && regex.test(parseFloat(arg.value));
  });

  return isValid;
}

function validateAge(arg) {
  let errorIcon = arg.parentElement.querySelector(".container--icon");
  if (parseInt(arg.value) !== 0) {
    errorIcon.id = "container--error-icon"; // correct scenario
    return true;
  } else {
    errorIcon.removeAttribute("id");
    return false;
  }
}

[grossSalaryInput, extraIncomeInput, deductionsInput].map((ele) =>
  ele.addEventListener(
    "input",
    debounce(() => {
      const regex = /^\d+(\.\d+)?$/;
      const isValid = regex.test(ele.value);

      let errorIcon = ele.parentElement.querySelector(".container--icon");

      if (isValid || ele.value === "") {
        errorIcon.id = "container--error-icon";
      } else {
        errorIcon.removeAttribute("id");
      }
    }, 300)
  )
);

ageDropdown.addEventListener("change", () => {
  validateAge(ageDropdown);
});

function calculateTax(grossSalary, extraIncome, age, deductions) {
  let netIncome = grossSalary + extraIncome - deductions - 8_00_000;

  if (netIncome > 8_00_000) {
    if (age < 40) {
      return 0.3 * netIncome;
    } else if (age >= 40 && age <= 60) {
      return 0.4 * netIncome;
    } else if (age >= 60) {
      return 0.1 * netIncome;
    }
  }

  return 0;
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Enhance CSS styling for better user experience and accessibility
// For example, improve focus states, add aria attributes for accessibility, etc.
// BEM naming convention, BEM attempts to divide the overall user interface into small reusable components.
//

/***
 *   BEM  :- Block element Modifier.
 *    1. B :-> Block.
 *    2. E :-> Element.   (Child Componenets of Block, __)
 *    3. M :-> Modifier.  (Changing styles, --)
 */
