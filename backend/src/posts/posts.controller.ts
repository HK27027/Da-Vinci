import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('search')
  search(
    @Query('term') searchTerm: string,
    @Query('userId') userId: string
  ) {
    return this.postsService.findAllFiltered(searchTerm, userId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.postsService.findByUser(+userId);
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
}
