const inquirer = require('inquirer');
const { consola, createConsola } = require("consola");

enum Action {
  List = "list",
  Add = "add",
  Remove = "remove",
  Quit = "quit"
}

type InquirerAnswers = {
  action: Action
}

const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: InquirerAnswers) => {
    switch (answers.action) {
      case Action.List:
        users.showAll();
        break;
      case Action.Add:
        const user = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }, {
          name: 'age',
          type: 'number',
          message: 'Enter age',
        }]);
        users.add(user);
        break;
      case Action.Remove:
        const name = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }]);
        users.remove(name.name);
        break;
      case Action.Quit:
        Message.showColorized(MessageVariant.Info, "Bye bye!");
        return;
    }

   startApp();
  });
}

startApp();

enum Status {
  List = "list",
  Add = "add",
  Remove = "remove",
  Quit = "quit"
}

enum MessageVariant {
  Success = "success",
  Error = "error",
  Info = "info"
}

type User = {
  name: string;
  age: number;
};

class Message {
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
    if(infoStatus === 'info') return consola.info(infoMsg);
    if(infoStatus === 'success') return consola.success(infoMsg);
    return consola.error(infoMsg);
  }
}

class UsersData {
  private data: User[];

  constructor() {
    this.data = [];
  }

  public showAll() {
    if(this.data.length>0) {
      Message.showColorized(MessageVariant.Info, "User data");
      console.table(this.data);
    }
    else { 
      Message.showColorized(MessageVariant.Info, "No data");
    }
  }

  public add(user: User): void {
    if(user.name && user.age && typeof user.name === "string" && typeof user.age === "number" && user.name.length > 0 && user.age > 0) {
      this.data.push({name: user.name, age: user.age });
      Message.showColorized(MessageVariant.Success, "User has been successfully added!");
    }
    else {
      Message.showColorized(MessageVariant.Error, "Wrong data!");
    }
  }

  public remove(userName: string): void {
    const userAmount = this.data.length;
    this.data = this.data.filter(user => user.name !== userName);
    if(userAmount > this.data.length) {
      Message.showColorized(MessageVariant.Success, "User deleted!");
    } else {
      Message.showColorized(MessageVariant.Error, "User not found...");
    }
  }
}


const users = new UsersData();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(MessageVariant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");
