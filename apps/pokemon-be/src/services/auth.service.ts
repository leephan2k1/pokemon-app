import { Injectable } from '@nestjs/common';
import { IAuthService } from '../contracts/service-contracts/auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {}
