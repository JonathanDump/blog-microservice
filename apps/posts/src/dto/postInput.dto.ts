import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostInputDto {
  @Field()
  title: string;

  @Field()
  content: string;
}
