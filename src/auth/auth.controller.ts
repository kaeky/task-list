import { Controller, Post, Body
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() userObject: RegisterAuthDto) {
    return await this.authService.register(userObject);
  }

  @Post('login')
  async loginUser(@Body() userObjectLogin: LoginAuthDto){
    return await this.authService.login(userObjectLogin)
  }
}
