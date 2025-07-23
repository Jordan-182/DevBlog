import { getOne } from "@/lib/user/getUser";
import { UserModel } from "@/model/UserModel";

export async function getOneUser(email: string): Promise<UserModel> {
  return getOne(email);
}
