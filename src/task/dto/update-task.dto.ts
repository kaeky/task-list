import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsNotEmpty()
    @ApiProperty()
    readonly userfk: User;  
}
