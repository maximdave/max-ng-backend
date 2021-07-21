import { MovieModel } from './MovieModel';
import {
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('comment')
export class CommentModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => MovieModel, (movie) => movie.comments)
  @JoinColumn({
    name: 'movie_id',
  })
  movie: MovieModel;
}
