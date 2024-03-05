export class Register {
    id: string;
    name: string;
    userName: string;
    password: string;
    email: string;
    phoneNumber: string;

    constructor(id: string, name: string, userName: string, password: string, email: string, phoneNumber: string) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}