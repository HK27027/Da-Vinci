import { Injectable, ConflictException } from '@nestjs/common';

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

  private isEmailTaken(email: string, excludeUserId?: number): boolean {
    return this.users.some(user => 
      user.email === email && user.id !== excludeUserId
    );
  }

  create(user: any) {
    if (this.isEmailTaken(user.email)) {
      throw new ConflictException('Bu email adresi zaten kullanımda');
    }

    const newUser = { id: Date.now(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUser: any) {
    if (updateUser.email && this.isEmailTaken(updateUser.email, id)) {
      throw new ConflictException('Bu email adresi başka bir kullanıcı tarafından kullanılıyor');
    }

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

  findAllFiltered(searchTerm: string) {
    if (!searchTerm) {
      return this.users;
    }

    const search = searchTerm.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(search) 
    );
  }
}
