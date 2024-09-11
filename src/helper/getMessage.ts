import { fetchAll } from "src/db/fetch";
import { differenceInMonths, isSameMonth, subMonths } from 'date-fns';
export async function getMessage() {
  try {
    const data = await fetchAll();
    const message = data
      .map((user) => {
        let months = differenceInMonths(new Date(), subMonths(user.expiresAt,1));
        if (isSameMonth(new Date(), user.expiresAt )) {
          months++;
        }
        if (months > 0) {
          return `<@${user.discordId}> 已經 ${months} 個月沒給Spotify的錢了 `;
        }
        return null;
      })
      .filter(Boolean)
      .join("\n");

    return message;
  } catch (error) {
    console.error(error);
    return "An error occurred while fetching messages";
  }
}
