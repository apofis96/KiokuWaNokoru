export const emailValidation = {
    required: {
        value: true,
        message: 'Email is required',
    },
    pattern: {
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: 'Invalid email format',
    },
};
