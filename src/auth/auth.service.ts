import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto} from './dto/register-auth.dto';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt' 
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ){}
  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const passToHash = await hash(password, 10)
    userObject = {...userObject, password:passToHash};
    return this.userRepository.save(userObject);
  }
  async login (userObjectLogin: LoginAuthDto){
    const { email, password } = userObjectLogin;
    const findUser = await this.userRepository.findOneBy({email});
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);
    
    const checkPassword = await compare(password, findUser.password);
    if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { id: findUser.id_user, name: findUser.name};
    const token = await this.jwtService.sign(payload)
    const data = {
      user: findUser,
      token 
    };
    return data;
  }
}
