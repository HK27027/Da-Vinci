import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Post()
  create(@Body() post: any) {
    return this.postsService.create(post);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() post: any) {
    return this.postsService.update(+id, post);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  // Belirli bir user'a ait postları getir
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.postsService.findByUser(+userId);
  }
}
