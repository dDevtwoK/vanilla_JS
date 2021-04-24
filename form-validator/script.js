const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');

const checkError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
  small.style.visibility = 'visible';
};
const checkSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  formControl.querySelector('small').style.visibility = 'hidden';
};

const isValidEmail = input => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    checkError(input, 'Email is not valid');
  }
};

const checkRequired = inputArr => {
  let isRequired = false;
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      checkError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      checkSuccess(input);
    }
  });

  return isRequired;
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    checkError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  }
  if (input.value.length > max) {
    checkError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  }
  checkSuccess(input);
};

const checkPassword = (input1, input2) => {
  if (input1.value !== input2.value) {
    checkError(input2, 'Passwords do not match');
  }
};
getFieldName = input =>
  input.className.charAt(0).toUpperCase() + input.className.slice(1);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(1);

  if (!checkRequired([username, email, password1, password2])) {
    checkLength(username, 6, 18);
    checkLength(password1, 6, 18);
    isValidEmail(email);
    checkPassword(password1, password2);
  }
});
