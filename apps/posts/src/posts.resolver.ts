import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Post } from '@prisma/client';
import { PostsService } from './posts.service';
import { PostInputDto } from './dto/postInput.dto';
import { PostResponseDto } from './dto/postResponse.dto';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PostResponseDto)
  async getPosts(): Promise<Post[]> {
    return this.postsService.getPosts();
  }

  @Mutation(() => PostResponseDto)
  async createPost(@Args('post') post: PostInputDto): Promise<Post> {
    return this.postsService.createPost(post);
  }
}
