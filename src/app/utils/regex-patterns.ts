export const regex = {
    userName: /^(\d{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MOBILE: /^\d{10}$/,
    OTP:/^\d{6}$/,

    PASSWORD_RULES:{
        MIN_LENGTH_PASSWORD: 8,
        UPPERCASE_PASSWORD: /(?=.*[A-Z])/,
        LOWERCASE_PASSWORD: /(?=.*[a-z])/,
        NUMBER_PASSWORD: /(?=.*\d)/,
        SPECIAL_PASSWORD: /(?=.*[^A-Za-z0-9])/,
        STRONG_PASSWORD:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    }
    
};