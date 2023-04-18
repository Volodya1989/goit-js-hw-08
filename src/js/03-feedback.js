var throttle = require('lodash.throttle');

const formData = {};
const formEl = document.querySelector('.feedback-form');
const emailInputEl = document.querySelector("input[name='email']");
const textInputEl = document.querySelector("textarea[name='message']");
const gettingFormData = JSON.parse(localStorage.getItem('feedback-form-state'));

const updateFormData = () => {
  if (gettingFormData !== null) {
    emailInputEl.value =
      gettingFormData.email.length > 0 ? gettingFormData.email : '';
    textInputEl.value =
      gettingFormData.message.length > 0 ? gettingFormData.message : '';
    formData['email'] = emailInputEl.value;
    formData['message'] = textInputEl.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }
};
const onInput = e => {
  formData[e.target.name.trim()] = e.target.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));

  if (formData.email === undefined) {
    formData.email = '';
  }
  if (formData.message === undefined) {
    formData.message = '';
  }
};
const onSubmit = e => {
  e.preventDefault();
  localStorage.removeItem('feedback-form-state');
  formEl.reset();
  console.log(formData);
};

document.addEventListener('DOMContentLoaded', throttle(updateFormData, 500));
formEl.addEventListener('input', throttle(onInput, 500));
formEl.addEventListener('submit', onSubmit);
