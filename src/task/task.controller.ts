import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { stringify } from 'querystring';
import path, { parse } from 'path';

@ApiBearerAuth()
@ApiTags('task')
@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {


  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Res() res, @Body() createTaskDto: CreateTaskDto, @GetUser() user: any) {
    const task = await this.taskService.create(createTaskDto, user);
    return res.status(HttpStatus.OK).json({
      message: 'task created.',
      product: task
    });
  }
  
  @Get()
  async findAll(@GetUser() user: User) {
    return await this.taskService.findAll(user);
  }
    
  @Get('completed')
  async findCompleted(@GetUser() user: User) {
    return await this.taskService.findCompleted(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    return await this.taskService.findOne(+id, user);
  }

  @Get('prio/:priority')
  async findPerPriority(@Param('priority') priority: string, @GetUser() user: User) {
    return await this.taskService.findPerPriority(+priority, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @GetUser() user: User) {
    return this.taskService.update(+id, updateTaskDto, user);
  }

  @Patch('complete/:id')
  updateComplete(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto, @GetUser() user: User){
    return this.taskService.updateComplete(+id, createTaskDto, user);
  }
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.remove(+id, user);
  }
}
