import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtSeed } from "./jwt.seed";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: jwtSeed.secret,
        });
      }
      
      async validate(payload: any) {
        return { id_user: payload.id, name: payload.name };
      }
}