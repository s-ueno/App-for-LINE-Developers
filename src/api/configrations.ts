export class configrations {
    public static botInfoUri = getValue("configrations.botInfoUri", "https://api.line.me/v2/bot/info");

}

function getValue(key: string, defaultValue: string) {
    try {
        return process.env["key"];
    } catch (error) {
        return defaultValue;;
    }
}