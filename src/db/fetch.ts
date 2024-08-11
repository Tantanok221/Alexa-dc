import { prisma } from ".";

export async function fetchAll(){
  const data= await prisma.spotifyUser.findMany()
  
  return data
}


