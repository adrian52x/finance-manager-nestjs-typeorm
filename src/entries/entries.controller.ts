import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Entry } from "./entity/entry.entity";
import { CreateEntryDto } from "./dto/create-entry.dto";
import { UpdateEntryDto } from "./dto/update-entry.dto";
import { EntriesService } from "./entries.service";

@Controller('/api/entries')
export class EntriesController {
    constructor(private readonly entriesService: EntriesService) {}

    @Get()
    findAll(): Promise<Entry[]> {
        return this.entriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.entriesService.findOne(+id);
    }

    @Post()
    create(@Body() createEntryDto: CreateEntryDto) {
        return this.entriesService.create(createEntryDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
        return this.entriesService.update(+id, updateEntryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.entriesService.remove(+id);
    }
}