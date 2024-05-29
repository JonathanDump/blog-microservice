import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostResponseDto {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  createdAt: string;
}
