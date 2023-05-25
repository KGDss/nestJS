import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUsers } from './interface/users.interface';

@Injectable()
export class UsersService {
  users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Sarah' },
  ];

  constructor(private prisma: PrismaService) {}

  findAll(): IUsers[] {
    return this.users;
  }

  insert(data: User) {
    // const id = this.users[this.users.length - 1].id + 1;
    // const user = { id, name };
    // this.users.push(user);
    // return { message: 'success' };
    return this.prisma.user.create({ data });
  }

  update(id: number, name: string) {
    // const user = this.users.filter((user) => user.id === id)[0]; ใช้ได้แต่ไม่ถูกจุดประสงค์
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users[index].name = name;
    return { message: 'Updated successfully' };
  }

  delete(id: number): { message: string } {
    this.users = this.users.filter((user) => user.id !== id);
    return { message: `Deleted user id ${id} successfully` };
  }
}
