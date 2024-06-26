import {
  Controller,
  Request,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@Request() req): Promise<User[]> {
    console.log('req: ', req.user);

    try {
      return this.userService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'An internal server error occurred',
      );
    }
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    try {
      return this.userService.findOne(Number(id));
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'An internal server error occurred',
      );
    }
  }

  @Patch('user/:id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Body() user: Partial<User>,
    @Param('id') id: string,
  ): Promise<User> {
    try {
      return this.userService.updateUser(Number(id), user);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'An internal server error occurred',
      );
    }
  }

  @Delete('user/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string): Promise<void> {
    try {
      return this.userService.deleteUser(Number(id));
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'An internal server error occurred',
      );
    }
  }
}
