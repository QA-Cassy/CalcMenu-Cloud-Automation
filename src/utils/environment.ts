import 'dotenv/config';

// API KEYS (DO NOT SHARE)
export const api = {
    key: {
        mailSlurp: process.env.MAILSLURP_API_KEY!,
    }
}

// TERMS OF SERVICE
export const termsOfService = {
    link: {
        enURL: process.env.TERMS_OF_SERVICE_EN_URL!,
    }
}

// PRIVACY POLICY
export const privacyPolicy = {
    link: {
        enURL: process.env.PRIVACY_POLICY_EN_URL!,
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

export const sodexoStaging = {
  environment: {
    stagingURL: process.env.SODEXO_STAGING_URL!,
    email: process.env.SODEXO_STAGING_EMAIL !,
    password: process.env.SODEXO_STAGING_PASSWORD !,
    homeURL: process.env.SODEXO_STAGING_HOME_URL!,
  },
};


