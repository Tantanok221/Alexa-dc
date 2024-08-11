import { fetchAll } from "src/db/fetch"
import { getHowManyMonth } from "./getHowManyMonth"

export async function getMessage() {
  try {
    const data = await fetchAll()
    const message = data
      .map((user) => {
        const months = getHowManyMonth(user.expiresAt, new Date())
        if (months > 0) {
          return `${user.name} hasn't paid for ${months} months, the bill is ${months * 5}`
        }
        return null
      })
      .filter(Boolean)
      .join("\n")
    
  
    return message
  } catch (error) {
    console.error(error)
    return "An error occurred while fetching messages"
  }
}