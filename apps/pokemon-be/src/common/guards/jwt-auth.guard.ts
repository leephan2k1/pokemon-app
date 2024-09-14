import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthTypes } from '../types/auth.type';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthTypes.JWT) {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return req;
  }
}

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard(AuthTypes.RefreshJwt) {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return req;
  }
}

@Injectable()
export class OptionalJwtAuthGuard extends JwtAuthGuard {
  handleRequest(err: any, user: any) {
    return user;
  }
}
