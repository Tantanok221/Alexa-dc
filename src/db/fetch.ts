import { prisma } from ".";

export async function fetchAll(){
  const data= await prisma.spotifyUser.findMany()
  
  return data
}

export async function fetchName(){
  const data = await prisma.spotifyUser.findMany({select: {name: true}})
  return data
}
