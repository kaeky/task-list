import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
      @InjectRepository(Task)
      private taskRepository: Repository<Task>,
    ){}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const newTaskDto = createTaskDto.userfk = user
    createTaskDto = {...createTaskDto, userfk:newTaskDto};
    const taskCreated = await this.taskRepository.save(createTaskDto);  
    return taskCreated
  }

  async findAll(user: User) {
    const taskList = await this.taskRepository.find({
      where:{
        userfk: user
      }
    });

    return taskList;
  }

  async findOne(id_task: number, user: User) {
    const task = await this.taskRepository.findOne({
      where: {
        userfk: user,
        id_task
      }
    })
    return task;
  }
  async findCompleted(user: User) {
    const completedtask = await this.taskRepository.find({
      where: {
        complete: true,
        userfk: user
      }
    })

    return completedtask;
  }

  async findPerPriority(priority: number, user: User){
    const taskList = await this.taskRepository.find({
      where:{
        priority_task: priority,
        userfk: user
      }
    })
    return taskList;
  }
  async update(id: number, updateTaskDto: UpdateTaskDto, user: User) {
    const findid = await this.taskRepository
    .createQueryBuilder()
    .select("userfkIdUser")
    .where("id_Task = :id", {id})
    .getRawOne()
    if(findid!= undefined){
      if(findid.userfkIdUser == user.id_user){
        const update = await this.taskRepository.save({id_task: id, ...updateTaskDto, userfk: user})
        return update;
      }else{
        return {error: "No tiene permiso para realizar esta acción"}
      }
    }else{
      return {error: "No existen tareas para modificar"}
    }
  }
  async updateComplete(id: number, createTaskDto: CreateTaskDto, user: User){
    const complete = await this.taskRepository.find({
      select:{
        complete: true
      },
      where:{
        id_task: id,
        userfk: user
      }
    })
    if(!complete || complete[0].complete){
      const updateComplete = await this.taskRepository.save({id_task: id, ...createTaskDto, userfk: user, complete: false})
      return updateComplete;
     
    }
    else{
      const updateComplete = await this.taskRepository.save({id_task: id, ...createTaskDto, userfk: user, complete: true})
      return updateComplete;
    }
  
  }
 async remove(id: number, user: User) {
    const taskdelete = await this.taskRepository.delete({id_task: id, userfk: user})
    return taskdelete;
  }
}
