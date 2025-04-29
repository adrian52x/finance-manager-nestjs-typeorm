import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

// Define a type that excludes the password property from User
type SafeUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(userName: string, pass: string): Promise<SafeUser> {
        const user = await this.usersService.findOne(userName);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    // async login(user: User) {
    //     const payload = { id: user.id, userName: user.userName, role: user.role };
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }

    async login(user: User, res: Response) {
        const payload = { id: user.id, userName: user.userName, role: user.role };
        const token = this.jwtService.sign(payload);
    
        // Set the token in an HTTP-only cookie
        res.cookie('access_token', token, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'strict', // Prevents CSRF attacks
        });
    
        return { message: 'Login successful' };
    }

    async signup(user: any) {
        return this.usersService.create(user.username, user.password);
    }

    async upgrade(userId: number) {
        return this.usersService.upgrade(userId)
    }
}