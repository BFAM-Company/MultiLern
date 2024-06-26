import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post('/post')
    createPost(@Body() createPostDto: CreatePostDto) {
        return this.postsService.createPost(createPostDto);
    }

    @Post('/exam')
    createExam(@Body() createPostDto: CreatePostDto) {
        return this.postsService.createExam(createPostDto);
    }

    @Post('/comment')
    createComment(@Body() createPostDto: CreateCommentDto) {
        return this.postsService.createComment(createPostDto);
    }

    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':category')
    findOneByCategory(@Param('category') category: string) {
        return this.postsService.findManyByCategory(category);
    }

    @Get('/exams/list')
    findAllExams() {
        return this.postsService.findAllExams();
    }

    @Get('/search/:keywords')
    findManyByKeyWords(@Param('keywords') keywords: string) {
        return this.postsService.findManyByKeyWord(keywords);
    }

    @Get('/postcomments/:id')
    getCommentsByPostId(@Param('id') id: string) {
        return this.postsService.getCommentsById(Number(id));
    }

    @Get('/userposts/:id')
    getPostsByUserId(@Param('id') id: string) {
        return this.postsService.findByUserId(Number(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(+id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
