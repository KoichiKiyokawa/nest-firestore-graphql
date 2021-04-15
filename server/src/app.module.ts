import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { PostModule } from './post/post.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: process.env.NODE_ENV === 'production' ? true : 'schema.gql',
      debug: true,
      playground: true,
    }),
    PostModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
