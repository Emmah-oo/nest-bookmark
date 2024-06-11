import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
// import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { Post } from 'src/post/entities/post.entity';
// import { Post } from 'src/post/entities/post.entity';
// import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly postService: PostService,

    private readonly userService: UserService,
  ) {}

  async create(createBookmarkDto: CreateBookmarkDto) {
    const bookmark: Bookmark = new Bookmark();

    const user = await this.userService.findOne(createBookmarkDto.userId);
    // const post = await this.postService.findOne(createBookmarkDto.postId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    bookmark.user = user;

    // bookmark.posts = post;
    if (createBookmarkDto.postId && createBookmarkDto.postId.length > 0) {
      const posts = [];
      for (const postId of createBookmarkDto.postId) {
        const post = await this.postService.findOne(postId);
        if (post) {
          posts.push(post);
          bookmark.posts = posts;
        }
      }
    }

    const savedBookmark = await this.bookmarkRepository.save(bookmark);

    return savedBookmark;
  }

  findAll() {
    return this.bookmarkRepository.find({
      relations: { posts: true, user: true },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} bookmark`;
  // }

  // update(id: number, updateBookmarkDto: UpdateBookmarkDto) {
  //   return `This action updates a #${id} bookmark`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} bookmark`;
  // }
}
