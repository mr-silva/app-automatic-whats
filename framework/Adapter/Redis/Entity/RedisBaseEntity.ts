export abstract class RedisBaseEntity {
  /**
   * Método para retornar a chave no redis da entidade em questão.
   */
  abstract getRedisKey(): string

  /**
   * Método para retornar a data de expiração da entidade no redis
   */
  abstract getExpirationDate(): Date
}
