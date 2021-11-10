import { Get, Post } from '../api/profile'

export const Profile = {
  find: async () => {
    return await Get.get()
  },
  update: async (profile: any): Promise<any> => {
    return await Post.post(profile)
  },
  submit: async (day: Day, params: any) => {
    // Post a new day
  }
}
