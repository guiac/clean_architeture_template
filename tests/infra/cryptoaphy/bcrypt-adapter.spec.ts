import { BCryptAdapter } from '@/infra/cryptography'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return 'hash'
    },

    async compare(): Promise<boolean> {
        return true
    }
}))

const throwError = (): never => {
    throw new Error()
}

const salt = 12
const makeSut = (): BCryptAdapter => {
    return new BCryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
    describe('hash()', () => {
        test('Should call hash with correct values', async () => {
            const sut = makeSut()
            const hashSpy = jest.spyOn(bcrypt, 'hash')
            await sut.hash('any_value')
            expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
        })

        test('Should return a valid hash on hash success', async () => {
            const sut = makeSut()
            const hash = await sut.hash('any_value')
            expect(hash).toBe('hash')
        })

        test('Should throw if hash throws', async () => {
            const sut = makeSut()
            jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
            const promise = sut.hash('any_value')
            await expect(promise).rejects.toThrow()
        })
    })
    describe('compare()', () => {
        test('Should call hash with correct values', async () => {
            const sut = makeSut()
            const hashSpy = jest.spyOn(bcrypt, 'compare')
            await sut.compare('any_value', 'any_value2')
            expect(hashSpy).toHaveBeenCalledWith('any_value', 'any_value2')
        })
    })
})
