import { prisma } from ".";
import {addMonths } from "date-fns"
export async function BumpData(discordId: string, month: number,) {
  const expiresAt = await prisma.spotifyUser.findFirst({where: {discordId},select: {expiresAt: true}})
  if(expiresAt){
    const newDate = addMonths(expiresAt.expiresAt, month)
    await prisma.spotifyUser.update({where: {discordId},data: {expiresAt: newDate}})
    return true
  }else{
    return false
  }
}
