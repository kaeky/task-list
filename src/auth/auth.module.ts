import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtSeed } from './jwt.seed';
import { JwtStrategy } from './jwt.strategy';
import { User } from './entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtSeed.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
