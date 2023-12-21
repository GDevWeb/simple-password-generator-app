// Variables DOM:
const inputDisplay: HTMLElement | null = document.querySelector("p#display");
const inputRangePassword: HTMLInputElement | null =
  document.querySelector("input");
const inputDisplayNumberOfCharacters: HTMLElement | null =
  document.querySelector("span#displayNumberOfCharacters");
const generateButton: HTMLInputElement | null =
  document.querySelector("#generateButton");
const copyButton: HTMLInputElement | null =
  document.querySelector("#copyButton");
const resetButton: HTMLInputElement | null =
  document.querySelector("#resetButton");

let passwordLevel: number; // Niveau de complexité du mot de passe
let concatDigits: string = "";

// Fonction qui génère un mot de passe:
function generatePassword() {
  const digits: string | number =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_@";

  // Séparation des caractères
  const splittedDigits = digits.split("");
  // Réinitialisation du mot de passe :
  concatDigits = "";
  // Boucle de génération :
  let i = 0;
  while (i + 1 <= passwordLevel) {
    // Sélection aléatoire des caractères :
    const random = Math.floor(Math.random() * splittedDigits.length);

    if (splittedDigits[random] !== undefined) {
      concatDigits += splittedDigits[random];
      i++;
    }
  }

  // Affichage du mot de passe généré
  if (copyButton) {
    copyButton.style.visibility = "visible";
  }
  displayPassword(concatDigits);
}

// Fonction qui affiche le mot de passe dans le DOM :
function displayPassword(data: string) {
  const displayData = concatDigits;
  if (inputDisplay) {
    inputDisplay.innerText = displayData;
  }
}

// Fonction qui copie le mot de passe dans le presse-papiers :
function copyPassword() {
  const copyPasswordElement = document.querySelector(
    "p#display"
  ) as HTMLParagraphElement | null;

  // Vérifier si le mot de passe est vide
  if (copyPasswordElement?.innerText === "") {
    // Si le mot de passe est vide, masquer le bouton de copie
    if (copyButton) {
      copyButton.style.visibility = "hidden";
    }
  }

  // Copier le mot de passe dans le presse-papiers
  if (copyPasswordElement) {
    const range = document.createRange();
    range.selectNode(copyPasswordElement);

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      showToast("Mot de passe copié avec succès !");
      selection.removeAllRanges();
    }
  }
}

// Réinitialiser le mot de passe et les éléments associés :
function resetPassword() {
  if (inputDisplay) {
    inputDisplay.innerText = "";
  }

  // Réinitialiser le niveau de complexité du mot de passe :
  passwordLevel = 8;

  // Réinitialiser le champ de saisie inputRangePassword :
  if (inputRangePassword) {
    inputRangePassword.value = String(passwordLevel);
  }

  // Réinitialiser l'affichage du nombre de caractères :
  if (inputDisplayNumberOfCharacters) {
    inputDisplayNumberOfCharacters.innerText = String(passwordLevel);
  }

  // Masquer le bouton de copie après la réinitialisation
  if (copyButton) {
    copyButton.style.visibility = "hidden";
  }
}

// Écouteurs d'événements :
if (inputRangePassword) {
  inputRangePassword.addEventListener("input", (e) => {
    const targetInputElement = e.target as HTMLInputElement;

    // Mettre à jour le niveau de complexité du mot de passe
    const inputValueAsNumber = parseInt(targetInputElement.value, 10);
    if (!isNaN(inputValueAsNumber)) {
      passwordLevel = inputValueAsNumber;
    }

    // Mettre à jour l'affichage du nombre de caractères
    if (inputDisplayNumberOfCharacters) {
      inputDisplayNumberOfCharacters.innerText = targetInputElement.value;
    }
  });
}

// Events :
generateButton?.addEventListener("click", generatePassword);
copyButton?.addEventListener("click", copyPassword);
resetButton?.addEventListener("click", resetPassword);

// Fonction pour afficher un toast d'informations :
function showToast(message: string) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;

  // Ajout du toast au DOM :
  document.body.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("show");
  }, 10);

  setTimeout(function () {
    toast.remove();
  }, 3000);
}

// Date dynamique du Footer :
const currentYearElement: HTMLElement | null =
  document.getElementById("currentYear");
const currentYear: number = new Date().getFullYear();
if (currentYearElement) {
  currentYearElement.textContent = currentYear.toString();
}
