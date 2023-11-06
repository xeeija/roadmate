import AppStorage from "./AppStorage"
import { ProblemDetails } from "./entities/ProblemDetails"
import { LoginRequest } from "./entities/request/LoginRequest"
import { RegisterRequest } from "./entities/request/RegisterRequest"
import { UserResponseItemResponseModel } from "./entities/response/UserResponseItemResponseModel"
import { throwException } from "./error/throwException"
import { jwtDecode } from "jwt-decode"

export class AuthService {
  private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  private baseUrl: string
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    this.http = http ? http : (window as any)
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ""
  }

  /**
   * Endpoint to login an user.
   * @param body (optional) Represents the login request for an user.
   * @return Success
   */
  login(body: LoginRequest | undefined): Promise<UserResponseItemResponseModel> {
    let url_ = this.baseUrl + "/api/Auth/Login"
    url_ = url_.replace(/[?&]$/, "")

    const content_ = JSON.stringify(body)

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    }

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processLogin(_response)
    })
  }

  protected processLogin(response: Response): Promise<UserResponseItemResponseModel> {
    const status = response.status
    let _headers: any = {}
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v))
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null
        result200 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as UserResponseItemResponseModel)
        return result200
      })
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null
        result400 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as ProblemDetails)
        return throwException("Bad Request", status, _responseText, _headers, result400)
      })
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        let result401: any = null
        result401 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as ProblemDetails)
        return throwException("Unauthorized", status, _responseText, _headers, result401)
      })
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null
        result404 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as ProblemDetails)
        return throwException("Not Found", status, _responseText, _headers, result404)
      })
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        )
      })
    }
    return Promise.resolve<UserResponseItemResponseModel>(null as any)
  }

  /**
   * Endpoint to register a new user in database.
   * @param body (optional) Represents request for an new basic user.
   * @return Success
   */
  register(body: RegisterRequest | undefined): Promise<UserResponseItemResponseModel> {
    let url_ = this.baseUrl + "/api/Auth/Register"
    url_ = url_.replace(/[?&]$/, "")

    const content_ = JSON.stringify(body)

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
      },
    }

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processRegister(_response)
    })
  }

  public async getRole() {
    try {
      const storage = new AppStorage()
      const promiseResult = await storage.get("jwt_token")
      const decToken: any = this.decodeToken(promiseResult.token)
      //console.log(decToken)
      return decToken?.role
    } catch (error) {
      //console.error('Error retrieving user ID:', error);
      return null
    }
  }

  public decodeToken = (token: string) => jwtDecode(token)

  public async getUserIdFromAuthInfoAppStorage() {
    try {
      const storage = new AppStorage()
      const promiseResult = await storage.get("jwt_token")
      const decToken: any = this.decodeToken(promiseResult.token)
      return decToken?.nameid || null
    } catch (error) {
      //console.error('Error retrieving user ID:', error);
      return null
    }
  }

  public async getTokenFromAuthInfoAppStorage() {
    try {
      const storage = new AppStorage()
      const promiseResult = await storage.get("jwt_token")
      return promiseResult?.token || null
    } catch (error) {
      //console.error('Error retrieving token:', error);
      return null
    }
  }

  public async getUserIdAndTokenFromAuthInfoAppStorage() {
    try {
      const storage = new AppStorage()
      const promiseResult = await storage.get("jwt_token")
      const decToken: any = this.decodeToken(promiseResult.token)
      return [decToken?.nameid || null, promiseResult?.token || null, decToken?.role || null]
    } catch (error) {
      //console.error('Error retrieving user ID and token:', error);
      return [null, null, null]
    }
  }

  public async getUserIdAndTokenAndRoleFromAuthInfoAppStorage() {
    try {
      const storage = new AppStorage()
      const promiseResult = await storage.get("jwt_token")
      //console.log(promiseResult)
      const decToken: any = this.decodeToken(promiseResult.token)
      //console.log(decToken)
      return [decToken?.nameid || null, promiseResult?.token || null, decToken?.role || null]
    } catch (error) {
      //console.error('Error retrieving user ID and token:', error);
      return [null, null, null]
    }
  }

  protected processRegister(response: Response): Promise<UserResponseItemResponseModel> {
    const status = response.status
    let _headers: any = {}
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v))
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null
        result200 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as UserResponseItemResponseModel)
        return result200
      })
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null
        result400 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as ProblemDetails)
        return throwException("Bad Request", status, _responseText, _headers, result400)
      })
    } else if (status === 401) {
      return response.text().then((_responseText) => {
        let result401: any = null
        result401 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as ProblemDetails)
        return throwException("Unauthorized", status, _responseText, _headers, result401)
      })
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null
        result404 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as ProblemDetails)
        return throwException("Not Found", status, _responseText, _headers, result404)
      })
    } else if (status === 201) {
      return response.text().then((_responseText) => {
        let result201: any = null
        result201 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as UserResponseItemResponseModel)
        return result201
      })
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        )
      })
    }
    return Promise.resolve<UserResponseItemResponseModel>(null as any)
  }
}

