import { Get, Post } from '../api/days'

export const Day = {
  findByDate: async (date: Date) => {
    // Fetch by date
    if (date !== null) {
      const response = await Get.get(date)
      return response.data
    } else {
      return null
    }
  },
  findAll: async () => {
    // Fetch all days
    const days = await Get.getAll()

    return days
  },
  update: async (day: any) => {
    console.log(`update body`, day)
    const response = await Post.post(day)

    return response
    // Post a new day/update a day
  },
  submit: async (day: Day, params: any) => {
    // Post a new day
  }
}
