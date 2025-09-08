import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts = [
    { id: 1, userId: 1, title: 'Hüseyin’in ilk postu' },
    { id: 2, userId: 1, title: 'React ile CRUD örneği' },
    { id: 3, userId: 2, title: 'Ali’nin blog yazısı' },
  ];

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    return this.posts.find(post => post.id === id);
  }

  create(post: any) {
    const newPost = { id: Date.now(), ...post };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, updatePost: any) {
    const index = this.posts.findIndex(p => p.id === id);
    if (index > -1) {
      this.posts[index] = { ...this.posts[index], ...updatePost };
      return this.posts[index];
    }
    return null;
  }

  remove(id: number) {
    this.posts = this.posts.filter(p => p.id !== id);
    return { deleted: true };
  }

  findByUser(userId: number) {
    return this.posts.filter(post => post.userId === userId);
  }
}
