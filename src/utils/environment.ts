import 'dotenv/config';

// SODEXOLU ENTERPRISE
export const sodexoLu = {
    environment: {
        email: process.env.SODEXOLU_EMAIL!,
        password: process.env.SODEXOLU_PASSWORD!,
        stageURL: process.env.SODEXOLU_URL_STAGE!,
        homeURL: process.env.SODEXOLU_HOME_URL!,
    },
}

