import {API} from "ynab"
import {config} from "dotenv"
config()
const apiToken = process.env.YNAB_API_TOKEN
const readyToAssignId = process.env.YNAB_READY_TO_ASSIGN_ID
const cashId = process.env.YNAB_CASH_ID
const tngId = process.env.YNAB_TNG_ID
const budgetId = process.env.YNAB_BUDGET_ID
if (!apiToken ) {
    throw new Error("YNAB_API_TOKEN is not set")
}

export const ynabClient = new API(apiToken)
export function getYnabId(id: "readyToAssign" | "cash" | "tng" | "budgetId"){
  if(!readyToAssignId || !cashId || !tngId || !budgetId){
    throw new Error("YNAB_READY_TO_ASSIGN_ID, YNAB_CASH_ID, YNAB_TNG_ID or YNAB_BUDGET_ID is not set")
  }
  switch (id) {
    case "readyToAssign":
      return readyToAssignId
    case "cash":
      return cashId
    case "tng":
      return tngId
    case "budgetId":
      return budgetId
    default:
      throw new Error(`Invalid YNAB ID: ${id}`)
  }
  
}

