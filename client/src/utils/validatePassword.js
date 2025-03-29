
const validatePassword = (password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error("Passwords do not match.");
    }

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters.");
    }

    if (!/[A-Z]/.test(password)) {
        throw new Error("Password must contain at least one uppercase letter.");
    }

    if (!/[0-9]/.test(password)) {
        throw new Error("Password must contain at least one number.");
    }
};

export default validatePassword;
