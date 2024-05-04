const { consola } = require("consola");
import { MessageVariant } from "./MessageVariant";

export class Message {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  public show() {
    console.log(this.content);
  }

  public capitalize() {
    this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase();
  }

  public toUpperCase() {
    this.content = this.content.toUpperCase();
  }

  public toLowerCase() {
    this.content = this.content.toLowerCase();
  }

  public static showColorized(infoStatus: MessageVariant, infoMsg: string): void {
    if (infoStatus === MessageVariant.Info) return consola.info(infoMsg);
    if (infoStatus === MessageVariant.Success) return consola.success(infoMsg);
    return consola.error(infoMsg);
  }
}

