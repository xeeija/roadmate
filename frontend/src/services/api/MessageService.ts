import { DangerMessage } from "../entities/DangerMessage"
import { ProblemDetails } from "../entities/ProblemDetails"
import { DangerMessageRequest } from "../entities/request/DangerMessageRequest"
import { DangerMessageItemResponseModel } from "../entities/response/DangerMessageItemResponseModel"
import { DangerMessageListItemResponseModel } from "../entities/response/DangerMessageListItemResponseModel"
import { throwException } from "../error/throwException"

export class DangerMessageService {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
    private baseUrl: string
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined
  
    constructor(
      baseUrl?: string,
      http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
    ) {
      this.http = http ? http : (window as any)
      this.baseUrl =
      baseUrl !== undefined && baseUrl !== null ? baseUrl : import.meta.env.VITE_API_URL ?? "" //URL of the API
    }
  
    /**
     * @return Success
     */
    messageGET(dangerId: string, token: string): Promise<DangerMessageListItemResponseModel> {
      let url_ = this.baseUrl + "/api/Danger/{dangerId}/Message"
      if (dangerId === undefined || dangerId === null)
        throw new Error("The parameter 'dangerId' must be defined.")
      url_ = url_.replace("{dangerId}", encodeURIComponent("" + dangerId))
      url_ = url_.replace(/[?&]$/, "")
  
      let options_: RequestInit = {
        method: "GET",
        headers: {
          Accept: "text/plain",
          Authorization: "Bearer " + token,
        },
      }
  
      return this.http.fetch(url_, options_).then((_response: Response) => {
        return this.processMessageGET(_response)
      })
    }
  
    protected processMessageGET(response: Response): Promise<DangerMessageListItemResponseModel> {
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
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver
                ) as DangerMessageListItemResponseModel)
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
      return Promise.resolve<DangerMessageListItemResponseModel>(null as any)
    }
  
    /**
     * @param body (optional)
     * @return Success
     */
    messagePOST(
      dangerId: string,
      body: DangerMessageRequest | undefined
    ): Promise<DangerMessageItemResponseModel> {
      let url_ = this.baseUrl + "/api/Danger/{dangerId}/Message"
      if (dangerId === undefined || dangerId === null)
        throw new Error("The parameter 'dangerId' must be defined.")
      url_ = url_.replace("{dangerId}", encodeURIComponent("" + dangerId))
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
        return this.processMessagePOST(_response)
      })
    }
  
    protected processMessagePOST(response: Response): Promise<DangerMessageItemResponseModel> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as DangerMessageItemResponseModel)
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
      return Promise.resolve<DangerMessageItemResponseModel>(null as any)
    }
  
    /**
     * @param body (optional)
     * @return Success
     */
    messagePUT(
      dangerId: string,
      body: DangerMessage | undefined
    ): Promise<DangerMessageItemResponseModel> {
      let url_ = this.baseUrl + "/api/Danger/{dangerId}/Message"
      if (dangerId === undefined || dangerId === null)
        throw new Error("The parameter 'dangerId' must be defined.")
      url_ = url_.replace("{dangerId}", encodeURIComponent("" + dangerId))
      url_ = url_.replace(/[?&]$/, "")
  
      const content_ = JSON.stringify(body)
  
      let options_: RequestInit = {
        body: content_,
        method: "PUT",
        headers: {
          "Content-Type": "application/json-patch+json",
          Accept: "text/plain",
        },
      }
  
      return this.http.fetch(url_, options_).then((_response: Response) => {
        return this.processMessagePUT(_response)
      })
    }
  
    protected processMessagePUT(response: Response): Promise<DangerMessageItemResponseModel> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as DangerMessageItemResponseModel)
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
      return Promise.resolve<DangerMessageItemResponseModel>(null as any)
    }
  
    /**
     * @param id (optional)
     * @return Success
     */
    messageDELETE(id: string | undefined, dangerId: string): Promise<DangerMessageItemResponseModel> {
      let url_ = this.baseUrl + "/api/Danger/{dangerId}/Message?"
      if (dangerId === undefined || dangerId === null)
        throw new Error("The parameter 'dangerId' must be defined.")
      url_ = url_.replace("{dangerId}", encodeURIComponent("" + dangerId))
      if (id === null) throw new Error("The parameter 'id' cannot be null.")
      else if (id !== undefined) url_ += "id=" + encodeURIComponent("" + id) + "&"
      url_ = url_.replace(/[?&]$/, "")
  
      let options_: RequestInit = {
        method: "DELETE",
        headers: {
          Accept: "text/plain",
        },
      }
  
      return this.http.fetch(url_, options_).then((_response: Response) => {
        return this.processMessageDELETE(_response)
      })
    }
  
    protected processMessageDELETE(response: Response): Promise<DangerMessageItemResponseModel> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as DangerMessageItemResponseModel)
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
      return Promise.resolve<DangerMessageItemResponseModel>(null as any)
    }
  
    /**
     * @return Success
     */
    messageGET2(id: string, dangerId: string): Promise<DangerMessageItemResponseModel> {
      let url_ = this.baseUrl + "/api/Danger/{dangerId}/Message/{id}"
      if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.")
      url_ = url_.replace("{id}", encodeURIComponent("" + id))
      if (dangerId === undefined || dangerId === null)
        throw new Error("The parameter 'dangerId' must be defined.")
      url_ = url_.replace("{dangerId}", encodeURIComponent("" + dangerId))
      url_ = url_.replace(/[?&]$/, "")
  
      let options_: RequestInit = {
        method: "GET",
        headers: {
          Accept: "text/plain",
        },
      }
  
      return this.http.fetch(url_, options_).then((_response: Response) => {
        return this.processMessageGET2(_response)
      })
    }
  
    protected processMessageGET2(response: Response): Promise<DangerMessageItemResponseModel> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as DangerMessageItemResponseModel)
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
      return Promise.resolve<DangerMessageItemResponseModel>(null as any)
    }
  }