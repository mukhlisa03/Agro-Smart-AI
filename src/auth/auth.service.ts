import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Member } from './users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async hashPassword(memberPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(memberPassword, salt);
  }

  public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public async createToken(member: Member): Promise<string> {
    console.log('member:', member);
    const payload: any = { sub: member._id, phone: member.memberPhone, role: member.memberRole };
    const source = member['_doc'] ? member['_doc'] : member;
    Object.keys(source).forEach((ele) => {
      payload[ele] = source[ele];
    });
    return this.jwtService.sign(payload);
  }
}
