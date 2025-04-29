import { Controller, Get, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AdminGuard } from './guards/admin.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get('admin')
    getAdminDashboard() {
        return { message: 'admin only' };
    }

    @UseGuards(JwtAuthGuard)
    @Post('upgrade')
    upgrade(@Request() req) {
        return this.authService.upgrade(req.user.id)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) res) {
        return this.authService.login(req.user, res);
    }

    @Post('signup')
    async signup(@Request() req) {
        return this.authService.signup(req.body);
    }

}
