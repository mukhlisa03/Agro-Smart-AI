import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Role } from "./role.enum";
import { ObjectId } from 'mongoose';


@ObjectType()
export class Member {
    @Field(() => String)
    _id: ObjectId;

    @Field(() => String)
    memberName: string;

    @Field(() => String)
    memberPhone: string;

    @Field(() => String)
    memberPassword: string;

    @Field(() => Role)
    memberRole: Role;

    @Field(() => String, { nullable: true })
    accessToken?: string;
}