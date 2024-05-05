import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    createPost(createPostDto: CreatePostDto) {
        return this.prisma.posts.create({
            data: {
                title: createPostDto.title,
                content: createPostDto.content,
                category: createPostDto.category,
                date: createPostDto.date,
                postType: 'post',
                posts_images: {
                    create: createPostDto.images,
                },
                tags_posts: {
                    createMany: {
                        data: createPostDto.tags,
                    },
                },
                users_posts: {
                    create: {
                        users: {
                            connect: {
                                id: createPostDto.userId,
                            },
                        },
                    },
                },
            },
        });
    }

    createComment(createPostDto: CreateCommentDto) {
        return this.prisma.posts.create({
            data: {
                title: createPostDto.title,
                content: createPostDto.content,
                date: createPostDto.date,
                postType: 'comment',
                posts_images: {
                    create: createPostDto.images,
                },
                users_posts: {
                    create: {
                        users: {
                            connect: {
                                id: createPostDto.userId,
                            },
                        },
                    },
                },
                posts: {
                    connect: {
                        id: createPostDto.parentPostId,
                    },
                },
            },
        });
    }

    findAll() {
        return this.prisma.posts.findMany({
            include: {
                posts_images: {
                    select: {
                        images: {
                            select: {
                                img: true,
                            },
                        },
                    },
                },
                posts_reviews: {
                    include: {
                        reviews: true,
                    },
                },
                tags_posts: {
                    include: {
                        tags: {
                            select: {
                                title: true,
                            },
                        },
                    },
                },
            },
        });
    }

    findManyByCategory(category: string) {
        return this.prisma.posts.findMany({
            where: {
                postType: category,
            },
            include: {
                posts_images: {
                    select: {
                        images: {
                            select: {
                                img: true,
                            },
                        },
                    },
                },
                posts_reviews: {
                    include: {
                        reviews: true,
                    },
                },
                tags_posts: {
                    include: {
                        tags: {
                            select: {
                                title: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async findManyByKeyWord(keyWords: string) {
        const posts = await this.prisma.posts.findMany({
            where: {
                OR: [
                    { title: { contains: keyWords } },
                    { content: { contains: keyWords } }
                ]
            },
            include: {
                posts_images: {
                    select: {
                        images: {
                            select: {
                                img: true,
                            },
                        },
                    },
                },
                posts_reviews: {
                    include: {
                        reviews: true,
                    },
                },
                tags_posts: {
                    include: {
                        tags: {
                            select: {
                                title: true,
                            },
                        },
                    },
                },
            },
        });
    
        posts.sort((a, b) => {
            const aKeywordsCount = this.countKeywordsInText(a.title + " " + a.content, keyWords);
            const bKeywordsCount = this.countKeywordsInText(b.title + " " + b.content, keyWords);
    
            return bKeywordsCount - aKeywordsCount;
        });
    
        return posts;
    }
    
    countKeywordsInText(text: string, keyWords: string) {
        const keywords = keyWords.split(" ");
        let count = 0;
        for (const keyword of keywords) {
            if (text.toLowerCase().includes(keyword.toLowerCase())) {
                count++;
            }
        }
        return count;
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return this.prisma.posts.update({
            where: {
                id: id,
            },
            data: {
                title: updatePostDto.title,
                content: updatePostDto.content,
                date: updatePostDto.date,
                posts_images: {
                    create: updatePostDto.images,
                },
                tags_posts: {
                    connectOrCreate: updatePostDto.tags,
                },
            },
        });
    }

    remove(id: number) {
        return this.prisma.posts.delete({
            where: {
                id: id,
            },
        });
    }
}
