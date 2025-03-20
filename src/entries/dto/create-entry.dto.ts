import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/entity/category.entity';

export class CreateEntryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    category: Category;
}