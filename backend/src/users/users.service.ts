import { Injectable } from '@nestjs/common';

//chwilowo bo mi sie nie chce z baza laczyc
let tempUsers = [
    { id: 1, name: 'goroncyMati', email: 'goroncymati@example.com' },
    { id: 2, name: 'HotKubus', email: 'hotkubus@example.com' },
];

//tu bedzie kod z baza docelowo

@Injectable() //element wstrzykiwalny
export class UsersService {
    getAll() {
        //tu bedzie jakis madry kodzik
        return tempUsers;
    }

    getByID(id: number) {
        return tempUsers.find((x) => x.id === id);
    }

    add(name: string, email: string) {
        const id = tempUsers[tempUsers.length - 1].id + 1;

        const newUser = { id, name, email };

        tempUsers.push(newUser);
    }

    removeById(id: number) {
        tempUsers = tempUsers.filter((x) => x.id !== id);
    }
}
