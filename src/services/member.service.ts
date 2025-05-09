import { Service } from 'typedi';
import { IMember } from '@models/member.model';
import { MemberModel } from '@models/member.model';
import { HttpException } from '@/exceptions/HttpException';

@Service()
export class MemberService {
  public async createMember(memberData: Partial<IMember>): Promise<IMember> {
    const findMember: IMember = await MemberModel.findOne({ email: memberData.email });
    if (findMember) throw new HttpException(409, `This email ${memberData.email} already exists`);

    const createMemberData: IMember = await MemberModel.create(memberData);
    return createMemberData;
  }

  public async updateMember(memberId: string, memberData: Partial<IMember>): Promise<IMember> {
    if (memberData.email) {
      const findMember: IMember = await MemberModel.findOne({ email: memberData.email });
      if (findMember && findMember._id.toString() !== memberId) {
        throw new HttpException(409, `This email ${memberData.email} already exists`);
      }
    }

    const updateMemberData: IMember = await MemberModel.findByIdAndUpdate(memberId, memberData, { new: true });
    if (!updateMemberData) throw new HttpException(404, "Member not found");

    return updateMemberData;
  }

  public async getMemberById(memberId: string): Promise<IMember> {
    const findMember: IMember = await MemberModel.findById(memberId);
    if (!findMember) throw new HttpException(404, "Member not found");

    return findMember;
  }

  public async getAllMembers(): Promise<IMember[]> {
    const members: IMember[] = await MemberModel.find();
    return members;
  }

  public async deleteMember(memberId: string): Promise<IMember> {
    const deleteMemberData: IMember = await MemberModel.findByIdAndDelete(memberId);
    if (!deleteMemberData) throw new HttpException(404, "Member not found");

    return deleteMemberData;
  }
} 