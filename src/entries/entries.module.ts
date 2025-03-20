import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Entry } from "./entity/entry.entity";
import { EntriesService } from "./entries.service";
import { EntriesController } from "./entries.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Entry])],
    providers: [EntriesService],
    controllers: [EntriesController],
})
export class EntriesModule {}