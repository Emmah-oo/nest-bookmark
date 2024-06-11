import { Bookmark } from 'src/bookmark/entities/bookmark.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Bookmark, (bookmark) => bookmark.posts)
  @JoinColumn()
  bookmark: Bookmark;
}
