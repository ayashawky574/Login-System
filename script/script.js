// location.pathname.replace('/login%20page/index.html' , "../signup page/signup.html")
//  كاننا بنقوله ب . ان احنا هنغير الباص بس عشان لو شلنا كله وحطينا الباص ده هيبقا غلط: (./) لما بنستخدم

var signupBtn = document.getElementById("signupBtn");
var loginBtn = document.getElementById("loginBtn");
var homeBtn = document.getElementById("homeBtn");
var nameInput = document.getElementById("nameInput");
var passInput = document.getElementById("passInput");
var emailInput = document.getElementById("emailInput");
var finishPragraph = document.querySelector(".finishPragraph");
var item = document.querySelector(".item");
var email = document.getElementById("userEmail");
var password = document.getElementById("userPassword");
var passMsg = document.querySelector(".passMsg");
var emailMsg = document.querySelector(".emailMsg");
var welcomeText = document.querySelector(".welcomeText");
var userName;
var users = [];
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}
var user;

function addUser() {
  if (
    validationInputs["nameInput"] == true &&
    validationInputs["emailInput"] == true &&
    validationInputs["passInput"] == true
  ) {
    if (!FindRepeatedEmail()) {
      user = {
        name: nameInput.value,
        email: emailInput.value,
        pass: passInput.value,
      };
      users.push(user);

      localStorage.setItem("users", JSON.stringify(users));
      finishPragraph.innerHTML = "success";
      finishPragraph.style.color = "green";
      finishPragraph.classList.remove("d-none");
      return true;
    } else {
      Swal.fire({
        title: "This email is already exist!",
        icon: "error",
      });
    }
  } else {
    finishPragraph.classList.remove("d-none");
    return false;
  }
}

function clearInput() {
  nameInput.value = null;
  emailInput.value = null;
  passInput.value = null;
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    if (checkAccount()) {
      location.href = "/Login-System/home/home.html";
      clearInput();
    }
  });
}

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    if (addUser()) {
      finishPragraph.classList.add("d-none");
      location.href = "/Login-System/";
      clearInput();
    }
  });
}

if (homeBtn) {
  homeBtn.addEventListener("click", () => {
    location.href = "/Login-System/";
  });
}

var validationInputs = {
  nameInput: false,
  emailInput: false,
  passInput: false,
};

function validateSignup(e) {
  if (e.target.localName == "input") {
    var element = e.target;

    var regex = {
      nameInput: /^[a-z ]{6,20}$/,
      emailInput: /^[a-zA-z-_0-9]{5,20}@gmail\.com$/,
      passInput: /^[a-zA-Z0-9_]{5,20}$/,
    };
    var msg = element.parentElement.nextElementSibling;
    var isvalid;
    function checkField() {
      var text = element.value;
      isvalid = regex[element.id].test(text);
      if (isvalid) {
        msg.classList.add("d-none");
        validationInputs[element.id] = true;
      } else {
        msg.classList.remove("d-none");
        validationInputs[element.id] = false;
      }
    }
    element.addEventListener("input", checkField);
    element.addEventListener("blur", checkField);
  }
}
if (location.pathname.includes("signup")) {
  item.addEventListener("click", validateSignup);
}

function FindRepeatedEmail() {
  var isRepeated = users.some((user) => {
    return user.email === emailInput.value;
  });

  return isRepeated;
}
function checkAccount() {
  var userEmail;
  userEmail = users.find((user) => {
    return user.email == email.value;
  });
  if (userEmail) {
    if (password.value == userEmail.pass) {
      userName = userEmail.name;
      console.log(userName);
      localStorage.setItem("userName", userName);
      return true;
    } else {
      passMsg.classList.remove("d-none");
      emailMsg.classList.add("d-none");
    }
  } else {
    emailMsg.classList.remove("d-none");
    emailMsg.classList.remove("d-none");
  }
}

if (location.pathname == "/Login-System/home/home.html") {
  welcomeText.innerText = "welcome " + localStorage.getItem("userName");
}
