import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { EntriesModule } from './entries/entries.module';
import { dbConfig } from '../data.source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';

@Module({
	imports: [
		CategoriesModule,
		EntriesModule,
		UsersModule,
		AuthModule,
		ConfigModule.forRoot({ isGlobal: true }), // Load .env variables
		TypeOrmModule.forRoot(dbConfig), 
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
