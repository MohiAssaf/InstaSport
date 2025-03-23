const validatePassword = (password, repeatPassword) => {
    let errors = [];

    if (password !== repeatPassword) {
        errors.push("Passwords do not match.");
    }

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters.");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter.");
    }

    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number.");
    }

    return errors;
};

export default validatePassword;
