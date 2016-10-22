(function () {
    var nameEl = document.querySelector('#name');
    var backButton = document.querySelector('#back');
    var nextButton = document.querySelector('#next');
    var steps = document.querySelectorAll('.step');
    var textArea0 = document.querySelector('#description');
    var textArea2 = document.querySelector('#ingredients');
    var textArea3 = document.querySelector('#steps');
    var hours = document.querySelector('#hours');
    // currentStep should keep track of the index of current step that is visible.
    var currentStep = 0;

    // `updateButtons` should add the `is-active` class to the back button if
    // the current step is beyond the first step, otherwise remove it. It should
    // also show the next button if the current step is before the last step,
    // otherwise hide it. We call this function at the bottom of the scope to do
    // an initial show/hide.
    function updateButtons() {
        if (currentStep <= 0) {
            backButton.classList.remove('is-active');
        } else {
            backButton.classList.add('is-active');
        };
        if (currentStep < steps.length - 1) {
            nextButton.classList.add('is-active');
        } else {
            nextButton.classList.remove('is-active');
        };
    };

    // `hideCurrentStep` should hide the step that is currently visible using
    // the `currentStep` variable.
    function hideCurrentStep() {
        steps[currentStep].classList.remove('is-active');
    }

    // `next` should validate the inputs on the current step by calling
    // `validate()`.
    // * If `validate` returns true, increment the value of `currentStep`.
    // * If `validate` returns true, the current step should be hidden and
    // the next step should be shown (use the class `is-active`).
    // * `next` should also call `updateButtons` to display the appropriate
    // buttons.
    function next() {
        if(validate() === true) {
            hideCurrentStep();
            currentStep++;
            steps[currentStep].classList.add('is-active');
            updateButtons();
        } 
    }


    // `back` should validate the inputs on the current step by calling
    // `validate()`.
    // * If `validate` returns true, decrement the value of `currentStep`.
    // * If `validate` returns true, the current step should be hidden and
    // the previous step should be shown (use the class `is-active`).
    // * `back` should also call `updateButtons` to display the appropriate
    // buttons.
    function back() {
       if(validate() === true) {
            hideCurrentStep();
            currentStep--;
            steps[currentStep].classList.add('is-active');
            updateButtons();
        }
    }

    
    // Validate should evaluate the input of the inputs in the current step.
    // * The function should start by clearing any errors that were
    // previously there.
    // * If the inputs have the proper input, the function should return
    // true.
    // * If an input does not have valid input, the function should set the
    // `data-error` attribute on the input's containing `.field` element to
    // an error message, add the class `is-error` to the field and
    // ultimately return false.

    function showValidationError(el, msg) {
        el.dataset.error = msg;
        el.classList.add('is-error');
    }

    function validate() {
        var valid = true;

        if (currentStep === 0) {
            if (nameEl.value.length < 3 || nameEl.value.length > 50) {
                showValidationError(nameEl.parentElement, 'Required');
                // nameEl.parentElement.dataset.error = 'Required';
                // nameEl.parentElement.classList.add('is-error');
                valid = false;
            };
            if (textArea0.value.length < 20 || textArea0.value.length > 255) {
                showValidationError(textArea0.parentElement, 'Required');
                // textArea0.parentElement.dataset.error = 'Required';
                // textArea0.parentElement.classList.add('is-error');
                valid = false;
            };

        } else if (currentStep === 1) {
            if (hours.value.length === 0) {
                showValidationError(hours.parentElement, 'Required');
                // hours.parentElement.dataset.error = 'Required';
                // hours.parentElement.classList.add('is-error');
                valid = false;
            }

        } else if (currentStep === 2) {
            if (textArea2.value.length <= 0 || textArea2.value.length > 255) {
                showValidationError(textArea2.parentElement, 'Required');
                valid = false;
            }

        } else if (currentStep === 3) {
            if (textArea3.value.length <= 0 || textArea3.value.length > 255) {
                showValidationError(textArea3.parentElement, 'Required');
                valid = false;
            }
        }

        return valid;
    }

    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        next();
    })

    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        back();
    })

    // Register an event handler for the 'click' event on the next button.
    // The event handler should prevent any default functionality the
    // browser has for `<button>` elements and call the `next` function. 

    // Register an event handler for the 'click' event on the back button.
    // The event handler should prevent any default functionality the
    // browser has for `<button>` elements and call the `back` function. 

    // Call `updateButtons` initially to make sure the proper buttons are
    // visible.
    updateButtons();
})();