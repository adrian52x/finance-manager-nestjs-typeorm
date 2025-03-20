import { Entry } from 'src/entries/entity/entry.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true }) /// >>????
	title: string;

	@OneToMany(() => Entry, entry => entry.category)
    entries: Entry[];
}
