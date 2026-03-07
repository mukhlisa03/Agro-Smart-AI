import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { Member } from "./users/user.entity";
import { RegisterInput } from "./dto/register.input";
import { RegisterService } from "./register.service";
import { LoginInput } from "./dto/login.input";



@Resolver()
export class AuthResolver {
    constructor(private readonly registerService: RegisterService) {}

    @Query(() => String)
    public hello(): string {
        return 'ok';
    }

    @Mutation(() => Member)
    public async register(@Args('input') input: RegisterInput): Promise<Member> {
        console.log('Mutation: register');
        return await this.registerService.register(input);
    }


    @Mutation(() => Member)
    public async login(@Args('input') input: LoginInput): Promise<Member> {
        console.log('Mutation: login');
        return await this.registerService.login(input);
    }
}
