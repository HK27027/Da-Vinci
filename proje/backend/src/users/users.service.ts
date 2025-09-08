import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Hüseyin', username: 'hkarasu', email: 'huseyin@example.com' },
    { id: 2, name: 'Ali', username: 'ali', email: 'ali@example.com' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  create(user: any) {
    const newUser = { id: Date.now(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUser: any) {
    const index = this.users.findIndex(u => u.id === id);
    if (index > -1) {
      this.users[index] = { ...this.users[index], ...updateUser };
      return this.users[index];
    }
    return null;
  }

  remove(id: number) {
    this.users = this.users.filter(u => u.id !== id);
    return { deleted: true };
  }
}
