import {
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
  Validation,
} from './singup-controller-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

import { InvalidParamError } from '../../errors'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor(addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password,
      })
      return ok(account, 201)
    } catch (error) {
      return serverError(error)
    }
  }
}