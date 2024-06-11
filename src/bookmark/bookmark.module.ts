import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
// import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Post } from 'src/post/entities/post.entity';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Post, User])],
  controllers: [BookmarkController],
  providers: [BookmarkService, PostService, UserService],
})
export class BookmarkModule {}
