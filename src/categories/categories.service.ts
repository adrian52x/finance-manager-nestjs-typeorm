import { Injectable } from '@nestjs/common';
import { Category } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) {}

    findAll(): Promise<Category[]> {
        return this.categoriesRepository.find();
    }
    
    create(category: Partial<Category>): Promise<Category> {
        return this.categoriesRepository.save(category);
    }

}
