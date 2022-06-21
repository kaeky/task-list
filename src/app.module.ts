import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';


const defaultOptions: any = {
  type: 'mysql',
  port: 3306,
  username: 'root',
  database: 'tasklist',
  synchronize: true,
}
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...defaultOptions,
      host: 'localhost',
      entities: [Task, User],
    }),
    TaskModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
