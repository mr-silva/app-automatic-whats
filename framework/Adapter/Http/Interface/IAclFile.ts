import { RoleTypeEnum } from '../../../Domain'
import { HttpRequestMethodEnum } from '../Enum'

interface IPermission {
  label: string
  method: HttpRequestMethodEnum
  roles?: RoleTypeEnum[]
}

interface IEndpoint {
  path: string
  permissions: IPermission[]
}

export interface IAclFile {
  version: number
  service: string
  endpoints: IEndpoint[]
}
