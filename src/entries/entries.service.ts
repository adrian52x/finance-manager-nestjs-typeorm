import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
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
        try {
            const entry = this.entryRepository.create(createEntryDto);
            return await this.entryRepository.save(entry);
        } catch (error) {
            // Check if the error is a foreign key constraint violation
            if (error instanceof QueryFailedError && error.driverError.code === '23503') {
                throw new NotFoundException('The specified category does not exist');
            }
            // Re-throw other errors
            throw error;
        }
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

    async remove(id: number): Promise<Entry> {
        try {
            const entry = await this.entryRepository.findOneBy({ id });
            if (!entry) {
                throw new Error('Category not found');
            } 
            await this.entryRepository.delete(id);
        
            return entry;
        } catch (error) {
            throw error;
        }
    }
}