export class configrations {
    public static botInfoUri = getValue("configrations.botInfoUri", "https://api.line.me/v2/bot/info");

}

function getValue(key: string, defaultValue: string) {
    try {
        const value = process.env[key];
        if (value) {
            return value;
        }
        return defaultValue;
    } catch {
        return defaultValue;;
    }
}