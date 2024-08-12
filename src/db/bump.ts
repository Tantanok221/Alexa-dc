import { getYnabId, ynabClient } from "src/client/ynab";
import { prisma } from ".";
import {addMonths } from "date-fns"
import { utils } from "ynab";
export async function BumpData(discordId: string, month: number, wallet: "cash" | "tng") {
  const expiresAt = await prisma.spotifyUser.findFirst({where: {discordId},select: {expiresAt: true}})
  if(expiresAt){
    try{
      const newDate = addMonths(expiresAt.expiresAt, month)
      await prisma.spotifyUser.update({where: {discordId},data: {expiresAt: newDate}})
      await ynabClient.transactions.createTransaction(getYnabId("budgetId"), {
        transaction: {
          account_id: getYnabId(wallet),
          category_id: getYnabId("readyToAssign"),
          date: utils.getCurrentDateInISOFormat(),
          amount: month * 5 * 1000,
          payee_name: `Spotify Family Plan(from alexa-dc)` ,
          memo: `User ${discordId} bumped by ${month} month`,
          cleared: "cleared",
          approved: true,
        },
      });
      return true
    }catch(e){
      console.log(e)
      return false
    }
  }else{
    return false
  }
}
