import { Schema } from 'mongoose';

export const MemberSchema = new Schema({
  memberName: { type: String, required: true },
  memberPhone: { type: String, required: true, unique: true },
  memberPassword: { type: String, required: true, select: false },
  memberRole: { type: String, default: 'USER' },
  accessToken: { type: String },
}, { timestamps: true });
