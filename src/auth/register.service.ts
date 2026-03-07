import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './users/user.entity';
import { RegisterInput } from './dto/register.input';
import { Message } from './users/common.enum';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel('Member') private readonly memberModel: Model<Member>,
    private authService: AuthService,
  ) {}

  public async register(input: RegisterInput): Promise<Member> {
    input.memberPassword = await this.authService.hashPassword(input.memberPassword);

    try {
      const result = await this.memberModel.create(input);
      (result as any).accessToken = await this.authService.createToken(result as Member);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      console.log('Error, Service.model:', msg);
      throw new BadRequestException(Message.USED_MEMBER_NICK_OR_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    const { memberPhone, memberPassword } = input;
    const response = await this.memberModel.findOne({ memberPhone }).select('+memberPassword').exec();
    if (!response) {
      throw new BadRequestException(Message.NO_DATA_FOUND);
    }

    const isMatch = await this.authService.comparePassword(memberPassword, (response as any).memberPassword);
    if (!isMatch) throw new BadRequestException(Message.WRONG_PASSWORD);

    (response as any).accessToken = await this.authService.createToken(response as Member);
    return response as Member;
  }
}
