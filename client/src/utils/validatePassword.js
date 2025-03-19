const validatePassword = (formValues) => {
    let errors = [];

    if (formValues.password !== formValues.repeatPassword) {
        errors.push("Passwords do not match.");
    }

    if (formValues.password.length < 8) {
        errors.push("Password must be at least 8 characters.");
    }

    if (!/[A-Z]/.test(formValues.password)) {
        errors.push("Password must contain at least one uppercase letter.");
    }

    if (!/[0-9]/.test(formValues.password)) {
        errors.push("Password must contain at least one number.");
    }

    return errors;
};

export default validatePassword;
