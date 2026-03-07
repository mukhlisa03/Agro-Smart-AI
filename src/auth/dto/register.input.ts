import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';




@InputType() 
export class RegisterInput {
    @IsNotEmpty()
    @Field(() => String)
    memberName!: string;

    @IsNotEmpty()
    @Field(() => String)
    memberPhone!: string;

    @IsNotEmpty()
    @Field(() => String)
    memberPassword!: string;
    
}