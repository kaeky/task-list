import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MaxLength, MinLength } from "class-validator";


export class LoginAuthDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @MinLength(5)
    @MaxLength(16)
    @ApiProperty()
    password: string;
}
