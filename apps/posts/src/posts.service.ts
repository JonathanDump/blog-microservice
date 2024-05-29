import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Post } from '@prisma/client';
import { RedisClientType, createClient } from 'redis';
import { ClientProxy } from '@nestjs/microservices';
import { PostInputDto } from './dto/postInput.dto';

@Injectable()
export class PostsService {
  private redisClient: RedisClientType;

  constructor(
    private prisma: PrismaService,
    @Inject('CORE_SERVICE') private readonly client: ClientProxy,
  ) {
    this.redisClient = createClient({ url: process.env.REDIS_URL });
    this.redisClient.connect();
  }

  async getPosts(): Promise<Post[]> {
    const cacheKey = 'posts';
    const cachedPosts = await this.redisClient.get(cacheKey);

    if (cachedPosts) {
      return JSON.parse(cachedPosts);
    }

    const posts = await this.prisma.post.findMany();
    await this.redisClient.set(cacheKey, JSON.stringify(posts), { EX: 60 });

    return posts;
  }

  async createPost(data: PostInputDto): Promise<Post> {
    const post = await this.prisma.post.create({
      data,
    });

    this.client.emit('post_created', post);
    await this.redisClient.del('posts');

    return post;
  }
}
