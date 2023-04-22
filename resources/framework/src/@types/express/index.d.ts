import { RequestContext } from '../../Adapter/Http'

declare global {
  namespace Express {
    export interface Request {
      context: RequestContext
    }
  }
}
