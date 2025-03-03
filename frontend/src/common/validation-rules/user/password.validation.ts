export const passwordValidation = {
    required: {
        value: true,
        message: 'Password is required',
    },
    pattern: {
        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
        message: 'Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and should be at least 8 characters long',
    },
};
