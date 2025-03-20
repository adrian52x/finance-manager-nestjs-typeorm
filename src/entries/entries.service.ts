import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entity/entry.entity';

@Injectable()
export class EntriesService {
    constructor(
        @InjectRepository(Entry)
        private readonly entryRepository: Repository<Entry>,
    ) {}

    async create(createEntryDto: CreateEntryDto): Promise<Entry> {
        const entry = this.entryRepository.create(createEntryDto);
        return this.entryRepository.save(entry);
    }

    async findAll(): Promise<Entry[]> {
        return this.entryRepository.find({ relations: ['category'] });
    }

    async findOne(id: number): Promise<Entry> {
        const entry = await this.entryRepository.findOneBy({ id });
        if(!entry) {
            throw new Error('Entry not found');
        }
        return entry;
    }

    async update(id: number, updateEntryDto: UpdateEntryDto): Promise<Entry> {
        await this.entryRepository.update(id, updateEntryDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.entryRepository.delete(id);
    }
}