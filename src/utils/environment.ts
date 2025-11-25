import 'dotenv/config';

// API KEYS (DO NOT SHARE)
export const api = {
    key: {
        mailSlurp: process.env.MAILSLURP_API_KEY!,
    }
}

// INVALID CREDENTIALS
export const invalidData = {
    user: {
        invalidEmail: process.env.INVALID_EMAIL!,
        invalidPassword: process.env.INVALID_PASSWORD!,
        unregisteredEmail: process.env.UNREGISTERED_EMAIL!,
    }
}

// CMC GENERIC
export const generic = {
    environment: {
        stageURL: process.env.GENERIC_URL_STAGE!,
        homeURL: process.env.GENERIC_HOME_URL!,
    },
}

// SODEXOLU ENTERPRISE
export const sodexoLu = {
    environment: {
        email: process.env.SODEXOLU_EMAIL!,
        password: process.env.SODEXOLU_PASSWORD!,
        localURL: process.env.SODEXOLU_URL_LOCAL!,
        homeURL: process.env.SODEXOLU_HOME_URL!,
    },
}

