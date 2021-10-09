function editNav() {
   var x = document.getElementById("myTopnav");
   if (x.className === "topnav") {
      x.className += " responsive";
   } else {
      x.className = "topnav";
   }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModal = document.querySelector(".close");

// DOM Elements, form data verification :
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locations = document.getElementsByName("location");
let locationChecked = false;
const termsOfUse = document.getElementById("checkbox1");
const confirmationMessage = document.querySelector("#form-popup");

// Regex :
const textValidation =
   /^[a-zA-ZÀ-ÖØ-öø-ÿ_][a-zA-ZÀ-ÖØ-öø-ÿ._ -]*[a-zA-ZÀ-ÖØ-öø-ÿ_]$/;
const emailValidation =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Closing modal event
closeModal.addEventListener("click", closingModal);

// Launch modal form
function launchModal() {
   modalbg.style.display = "block";
}

// Closing modal form
function closingModal() {
   modalbg.style.display = "none";
}

// Launch popup (<= notification of the sending of the form)
function launchPopUp() {
   confirmationMessage.style.display = "block";
   document.querySelector(".message-popup").innerHTML =
      "Merci ! Votre réservation a été reçue.";
}

// Closing popup
function closingPopUp() {
   confirmationMessage.style.display = "none";
}

// Resetting fields after form submission
function resetFields() {
   document.querySelectorAll("#form input").forEach(function (input) {
      if (input.type !== "submit" && input.type !== "checkbox") {
         input.value = "";
      }
   });
}

// ----------------------------------------
//  FORM
// ----------------------------------------
document
   .querySelector("#btn-submit")
   .addEventListener("click", function (formEvent) {
      formEvent.preventDefault();
      let errors = 0;

      // First name field :
      if (
         firstName.value.length <= 1 ||
         firstName.value.length > 30 ||
         !firstName.value.match(textValidation)
      ) {
         document.getElementById("firstNameError").innerHTML =
            "Veuillez saisir 2 lettres ou plus";
         errors++;
      } else {
         document.getElementById("firstNameError").style.display = "none";
      }

      // Last name field :
      if (
         lastName.value.length <= 1 ||
         lastName.value.length > 30 ||
         !lastName.value.match(textValidation)
      ) {
         document.getElementById("lastNameError").innerHTML =
            "Veuillez saisir 2 lettres ou plus";
         errors++;
      } else {
         document.getElementById("lastNameError").style.display = "none";
      }

      // Email field :
      if (!email.value.match(emailValidation)) {
         document.getElementById("emailError").innerHTML =
            "Veuillez saisir une adresse électronique valide";
         errors++;
      } else {
         document.getElementById("emailError").style.display = "none";
      }

      // Birthdate field :
      if (birthdate.value === "" || !birthdate.value.length == 10) {
         document.getElementById("birthdateError").innerHTML =
            "Veuillez entrer votre date de naissance";
         errors++;
      } else {
         document.getElementById("birthdateError").style.display = "none";
      }

      // Number of contests field :
      if (
         quantity.value === "" ||
         quantity.value >= 100 ||
         quantity.value.length >= 3
      ) {
         document.getElementById("quantityError").innerHTML =
            "Veuillez sélectionner un nombre entre 0 et 99";
         errors++;
      } else {
         document.getElementById("quantityError").style.display = "none";
      }

      // Checkbox of locations :
      for (let i = 0, l = locations.length; i < l; i++) {
         if (locations[i].checked) {
            locationChecked = true;
            break;
         }
      }

      if (locationChecked) {
         document.getElementById("locationsError").style.display = "none";
      } else {
         document.getElementById("locationsError").innerHTML =
            "Veuillez choisir une ville";
         errors++;
      }

      // Checkbox of terms of use field :
      if (!termsOfUse.checked) {
         document.getElementById("termsOfUseError").innerHTML =
            "Veuillez vérifier que vous acceptez les conditions d'utilisation";
         errors++;
      } else {
         document.getElementById("termsOfUseError").style.display = "none";
      }

      // Verification of the total number of user errors found in each field :
      console.log("Error found with form fields : " + errors);
      if (errors === 0) {
         closingModal();
         resetFields();

         // Confirmation popup. Form submission confirmation message :
         launchPopUp();
         setTimeout(closingPopUp, 4000);
      }
   });
