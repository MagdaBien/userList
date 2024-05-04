import { Message } from "./Message";
import { MessageVariant } from "./MessageVariant";

function measurePerformance(target: any, name: string, descriptor: any) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any) {
        const start = performance.now()
        const result = originalMethod.apply(this, args)
        const finish = performance.now()
        console.info(`${name} execution time is ${finish - start} milliseconds`)
        return result;
    }
}

type User = {
    name: string;
    age: number;
};

export class UsersData {
    private data: User[];

    constructor() {
        this.data = [];
    }

    public showAll() {
        if (this.data) {
            Message.showColorized(MessageVariant.Info, "User data");
            return console.table(this.data);
        }
        Message.showColorized(MessageVariant.Info, "No data");
    }

    @measurePerformance
    public add(user: User): void {
        if (user.name && user.age && typeof user.name === "string" && typeof user.age === "number" && user.age > 0) {
            this.data.push({ name: user.name, age: user.age });
            return Message.showColorized(MessageVariant.Success, "User has been successfully added!");
        }
        Message.showColorized(MessageVariant.Error, "Wrong data!");
    }

    @measurePerformance
    public remove(userName: string): void { 
        if (this.data.find(({ name }) => name === userName)) {
            this.data = this.data.filter(user => user.name !== userName);
            return Message.showColorized(MessageVariant.Success, "User deleted!");
        }
        Message.showColorized(MessageVariant.Error, "User not found...");
    }
}
