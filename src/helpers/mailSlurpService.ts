import { MailSlurp } from 'mailslurp-client';
import { api } from "../utils/environment";


export class MailSlurpService {
    
    private client: MailSlurp;

    constructor() {
        this.client = new MailSlurp({ apiKey: api.key.mailSlurp });
    }

    async createInbox() {
        return await this.client.createInbox();
    }
    
    async waitForVerificationEmail(inboxId: string, timeout = 30000) {
        const email = await this.client.waitForLatestEmail(inboxId, timeout);
        const urls = email.body?.match(/https?:\/\/[^\s"]+/g) || [];
        // console.log('Links found:', urls); // TO CHECK URLS IN EMAIL VERIFICATION

        const verificationLink = urls.find(
            u => 
                u.includes('appasiaqa.calcmenu.com') &&
                u.includes('Verify%2FEmail')
        )

        if (!verificationLink) {
            throw new Error("EMAIL VERIFICATION LINK NOT FOUND");
        }

        return verificationLink;
    }

    async waitForResetPasswordEmail(inboxId: string, timeout = 30000) {
        const email = await this.client.waitForLatestEmail(inboxId, timeout);
        const urls = email.body?.match(/https?:\/\/[^\s"]+/g) || [];
        console.log('Links found:', urls); // TO CHECK URLS IN EMAIL VERIFICATION

        const resetPasswordLink = urls.find(
            u => 
                u.includes('appasiaqa.calcmenu.com') &&
                u.includes('Recovery%2FPassword/')
        )

        if (!resetPasswordLink) {
            throw new Error("RESET PASSWORD EMAIL LINK NOT FOUND");
        }

        return resetPasswordLink;
    }

}