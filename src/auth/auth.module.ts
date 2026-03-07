import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterService } from './register.service';
import { AuthResolver } from './auth.resolver';
import { MemberSchema } from './users/user.schema';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'changeme',
            signOptions: { expiresIn: '30d' },
        }),
        MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
    ],
    providers: [RegisterService, AuthService, AuthResolver],
    exports: [RegisterService, AuthService],
})
export class AuthModule {}