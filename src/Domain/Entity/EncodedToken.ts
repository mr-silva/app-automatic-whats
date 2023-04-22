import * as jwt from 'jsonwebtoken'

export class EncodedToken {
  constructor(private token?: string) {}

  public getToken(): string | undefined {
    return this.token
  }

  public static async encode(encodeData: IEncodeData): Promise<EncodedToken> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        encodeData,
        process.env.JWT_SECRET,
        { algorithm: 'HS512', expiresIn: '2 days' },
        (err, token) => {
          if (!!err) reject(err)

          resolve(new EncodedToken(token))
        }
      )
    })
  }
}

interface IEncodeData {
  account: {
    id: string
    name: string
  }
}
