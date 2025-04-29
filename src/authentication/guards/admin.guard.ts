import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { Role } from "src/users/Role";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  
  async canActivate(context: ExecutionContext) : Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    // if (user.role !== Role.Admin) {
    //     throw new ForbiddenException('Access denied: Admins only');
    // }

    // return true;
    
    return user && user.role === Role.Admin
  }
}