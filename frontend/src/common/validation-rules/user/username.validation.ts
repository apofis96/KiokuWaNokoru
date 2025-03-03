export const usernameValidation = {
    required: {
        value: true,
        message: 'Username is required',
    },
    minLength: {
        value: 3,
        message: 'Username should be at least 3 characters long',
    },
};
