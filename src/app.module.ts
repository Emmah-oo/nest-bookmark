import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PostModule } from './post/post.module';

import { Bookmark } from './bookmark/entities/bookmark.entity';
import { Post } from './post/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '178946',
      username: 'postgres',
      entities: [User, Bookmark, Post],
      database: 'bookmark',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    BookmarkModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
