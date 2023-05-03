import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // CRUD => Create, Retrieve, Update, Delete
  //Read
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  //Create name: string
  @Post()
  insert(@Body() userBody: CreateUserDTO) {
    return this.usersService.insert(userBody.name);
  }

  //Update => name
  @Patch('/:id')
  update(@Param('id') id: string, @Body() userBody: UpdateUserDTO) {
    return this.usersService.update(+id, userBody.name);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
