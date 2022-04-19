import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { HttpRequest } from '../../protocols'
import { LoginController } from './login'

interface SutType {
  sut: LoginController
}

const makeSut = (): SutType => {
  const sut = new LoginController()
  return { sut }
}
describe('Login Controller', () => {
  test('Should return 400 if no email is provider', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        password: 'any_password',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provider', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@email.com',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})