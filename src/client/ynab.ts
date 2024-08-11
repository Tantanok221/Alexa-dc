import {API} from "ynab"
import {config} from "dotenv"
config()
const apiToken = process.env.YNAB_API_TOKEN
const readyToAssignId = process.env.YNAB_READY_TO_ASSIGN_ID
const cashId = process.env.YNAB_CASH_ID
const tngId = process.env.YNAB_TNG_ID

if (!apiToken || !readyToAssignId || !cashId || !tngId) {
    throw new Error("YNAB_API_TOKEN, YNAB_READY_TO_ASSIGN_ID, YNAB_CASH_ID, or YNAB_TNG_ID is not set")
}

export const ynabClient = new API(apiToken)
export function getYnabId(id: "readyToAssign" | "cash" | "tng"){
  switch (id) {
    case "readyToAssign":
      return readyToAssignId
    case "cash":
      return cashId
    case "tng":
      return tngId
    default:
      throw new Error(`Invalid YNAB ID: ${id}`)
  }
  
}

