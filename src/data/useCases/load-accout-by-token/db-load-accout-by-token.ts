import { LoadAccountByToken } from '../../../domain/useCases/load-account-by-token'
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { AccountModel } from '../authentication/db-authentication-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return new Promise((resolve) => resolve(null))
  }
}
