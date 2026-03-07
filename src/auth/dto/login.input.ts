import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';




@InputType() 
export class LoginInput {
    @IsNotEmpty()
    @Field(() => String)
    memberPhone!: string;

    @IsNotEmpty()
    @Field(() => String)
    memberPassword!: string;
    
}