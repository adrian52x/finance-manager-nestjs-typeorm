import { ConflictException, Injectable } from '@nestjs/common';
import { Category } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-catergory.dto';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category)
		private categoriesRepository: Repository<Category>
	) {}

	findAll(): Promise<Category[]> {
		return this.categoriesRepository.find();
	}

	async findOne(id: number): Promise<Category> {
		const category = await this.categoriesRepository.findOneBy({ id });
		if (!category) {
			throw new Error('Category not found');
		}
		return category;
	}

	async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
		try {
			return await this.categoriesRepository.save(createCategoryDto);
		} catch (error) {
			if (error instanceof QueryFailedError && error.message.includes('duplicate key value')) {
				throw new ConflictException('Category with this title already exists');
			}
			throw error;
		}
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
		const category = await this.categoriesRepository.findOneBy({ id });
		if (!category) {
			throw new Error('Category not found');
		}
		const updatedCategory = this.categoriesRepository.merge(category, updateCategoryDto);
		return this.categoriesRepository.save(updatedCategory);
	}

	async remove(id: number): Promise<Category> {
		const category = await this.categoriesRepository.findOneBy({ id });
		if (!category) {
			throw new Error('Category not found');
		}
		await this.categoriesRepository.remove(category);
		console.log('Category removed', category);
		
		return category;
	}
}
