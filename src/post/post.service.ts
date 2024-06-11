import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly userService: UserService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post: Post = new Post();

    const userPosting = await this.userService.findOne(createPostDto.userId);
    post.text = createPostDto.text;
    post.user = userPosting;
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find({
      relations: {
        user: true,
        bookmark: true,
      },
    });
  }

  async findOne(postId: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id: postId } });
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
