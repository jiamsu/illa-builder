import { MysqlAction } from "./mysqlAction"
import { PostgresqlAction } from "./postgresqlAction"
import { RedisAction } from "./redisAction"
import { BodyContent, RestApiAction } from "./restapiAction"
import { MongodbAction } from "./mongodbAction"
import { TransformerAction } from "./transformerAction"

export interface Transformer {
  rawData: string
  enable: boolean
}

// TODO @aruseito not use any
export interface Events {
  successEvent?: any[]
  failedEvent?: any[]
}

export type ActionType =
  | "mysql"
  | "restapi"
  | "mongodb"
  | "redis"
  | "postgresql"
  | "transformer"

export type ActionTriggerMode = "manually" | "automate"

export interface ActionItem<T extends ActionContent> {
  actionId: string
  displayName: string
  actionType: ActionType
  transformer: Transformer
  triggerMode: ActionTriggerMode
  resourceId?: string
  content: T
}

export type ActionContent =
  | MysqlAction
  | RestApiAction<BodyContent>
  | TransformerAction
  | MongodbAction
  | PostgresqlAction
  | RedisAction

export const actionInitialState: ActionItem<ActionContent>[] = []

export const actionItemInitial: Partial<ActionItem<ActionContent>> = {
  transformer: {
    enable: false,
    rawData:
      "// The variable 'data' allows you to reference the request's data in the transformer. \n// example: return data.find(element => element.isError)\nreturn data.error",
  },
  triggerMode: "manually",
}

export interface UpdateActionItemPayload {
  displayName: string
  data: Record<string, any>
}
