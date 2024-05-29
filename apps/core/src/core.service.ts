import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class CoreService {
  @EventPattern('post_created')
  async handlePostCreated(data: Record<string, unknown>) {
    console.log('Post created:', data);
  }
}
