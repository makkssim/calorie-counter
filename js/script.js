
const genderMale = document.querySelector('#gender-male');
const genderFemale = document.querySelector('#gender-female');

const genderSwitcher = document.querySelector('.switcher');

const inputAge = document.querySelector('#age');
const inputHeight = document.querySelector('#height');
const inputWeight = document.querySelector('#weight');

const chboxMinimal = document.querySelector('#activity-minimal');
const chboxLow = document.querySelector('#activity-low');
const chboxMedium = document.querySelector('#activity-medium');
const chboxHigh = document.querySelector('#activity-high');
const chboxMaximal = document.querySelector('#activity-maximal');

const form = document.querySelector('.counter__form');
const submitButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');

const resultBlock = document.querySelector('.counter__result');
const caloriesNorm = resultBlock.querySelector('#calories-norm');
const caloriesMinimal = resultBlock.querySelector('#calories-minimal');
const caloriesMaximal = resultBlock.querySelector('#calories-maximal');

const controlSubmit = () => {
    if (inputAge.value !== '' && inputHeight.value !== '' && inputWeight.value !== '') {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
};

const controlReset = () => {
    if (inputAge.value !== '' || inputHeight.value !== '' || inputWeight.value !== '') {
        resetButton.disabled = false;
    } else {
        resetButton.disabled = true;
    }
};

inputAge.addEventListener('input', () => {
    controlSubmit();
    controlReset();
});

inputHeight.addEventListener('input', () => {
    controlSubmit();
    controlReset();
});

inputWeight.addEventListener('input', () => {
    controlSubmit();
    controlReset();
});

const setActivityCoeff = () => {
    let activityCoeff;
    if (chboxMinimal.checked) {
        activityCoeff = 1.2;
    } else if (chboxLow.checked) {
        activityCoeff = 1.375
    } else if (chboxMedium.checked) {
        activityCoeff = 1.55;
    } else if (chboxHigh.checked) {
        activityCoeff = 1.725;
    } else {
        activityCoeff = 1.9;
    }
    return activityCoeff;
};

resetButton.addEventListener('click', () => {
    genderMale.checked = true;
    genderFemale.checked = false;
    inputAge.value = '';
    inputHeight.value = '';
    inputWeight.value = '';
    chboxMinimal.checked = true;
    chboxLow.checked = false;
    chboxMedium.checked = false;
    chboxHigh.checked = false;
    chboxMaximal.checked = false;
    resetButton.disabled = true;
    submitButton.disabled = true;
    resultBlock.classList.add('counter__result--hidden');
});

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const activityCoeff = setActivityCoeff();
    const genderNumber = genderMale.checked ? 5 : -161;
    const age = inputAge.value;
    const height = inputHeight.value;
    const weight = inputWeight.value;
    const result = ((10 * weight) + (6.25 * height) - (5 * age) + genderNumber) * activityCoeff;
    const resultMinimal = result - result * 0.15;
    const resultMaximal = result + result * 0.15;
    resultBlock.classList.remove('counter__result--hidden');
    caloriesNorm.textContent = Math.ceil(result);
    caloriesMinimal.textContent = Math.ceil(resultMinimal);
    caloriesMaximal.textContent = Math.ceil(resultMaximal);
});