import 'dotenv/config';

// INVALID CREDENTIALS
export const invalidData = {
    user: {
        invalidEmail: process.env.INVALID_EMAIL!,
        invalidPassword: process.env.INVALID_PASSWORD!,
        unregisteredEmail: process.env.UNREGISTERED_EMAIL!,
    }
}

// SODEXOLU ENTERPRISE
export const sodexoLu = {
    environment: {
        email: process.env.SODEXOLU_EMAIL!,
        password: process.env.SODEXOLU_PASSWORD!,
        stageURL: process.env.SODEXOLU_URL_LOCAL!,
        homeURL: process.env.SODEXOLU_HOME_URL!,
    },
}

