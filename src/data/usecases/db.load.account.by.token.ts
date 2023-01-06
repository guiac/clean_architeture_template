import { LoadAccountByToken } from '@/domain/usecases'
import { Decrypter, LoadAccountByTokenRepository } from '@/data/protocols'
export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor(
        private readonly decrypter: Decrypter,
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
    ) { }

    async handle(data: LoadAccountByToken.Request): Promise<any> {
        try {
            const token = await this.decrypter.decrypt(data.accessToken)
            if (!token) return token
        } catch (error) {
            return null
        }
        await this.loadAccountByTokenRepository.load(data)
    }
}
