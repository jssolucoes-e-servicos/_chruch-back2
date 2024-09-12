export class ManagerCodeHelper {
  static async generateRecoveryCodes() {
    const quantityCaracters = 8;
    const quantityCodes = 10;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const result = [];
    const charactersLength = characters.length;
    for (let i = 0; i < quantityCodes; i++) {
      for (let i = 0; i < quantityCaracters; i++) {
        const insert = {
          position: i + 1,
          code: characters.charAt(Math.floor(Math.random() * charactersLength)),
        };
        result.push(insert);
      }
    }
    return result;
  }
}
