import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { User } from "src/auth/entities/user.entity";

export class CreateTaskDto {
    @IsNotEmpty()
    @ApiProperty()
    task: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(3)
    @ApiProperty()
    priority_task: number;
    
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty()
    endline_task: Date;

    @IsNotEmpty()
    @ApiProperty()
    userfk: User;

}
