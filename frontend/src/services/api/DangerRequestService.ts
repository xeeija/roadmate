import { ProblemDetails } from "../entities/ProblemDetails"
import { DangerRequest } from "../entities/request/DangerRequest"
import { DangerRequestModel } from "../entities/request/DangerRequestModel"
import { DangerResolveRequestModel } from "../entities/request/DangerResolveRequestModel"
import { DangerRequestItemResponseModel } from "../entities/response/DangerRequestItemResponseModel"
import { DangerRequestListItemResponseModel } from "../entities/response/DangerRequestListItemResponseModel"
import { DangerResolveRequestItemResponseModel } from "../entities/response/DangerResolveRequestItemResponseModel"
import { throwException } from "../error/throwException"

export class DangerRequestService {
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
   * @param body (optional)
   * @return Success
   */
  create(
    body: DangerRequestModel | undefined,
    token: string
  ): Promise<DangerRequestItemResponseModel> {
    let url_ = this.baseUrl + "/api/Danger/Request/Create"
    url_ = url_.replace(/[?&]$/, "")

    const content_ = JSON.stringify(body)

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "text/plain",
        Authorization: "Bearer " + token,
      },
    }

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processCreate(_response)
    })
  }

  protected processCreate(response: Response): Promise<DangerRequestItemResponseModel> {
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as DangerRequestItemResponseModel)
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as DangerRequestItemResponseModel)
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
    return Promise.resolve<DangerRequestItemResponseModel>(null as any)
  }

  /**
   * @param body (optional)
   * @return Success
   */
  resolve(
    body: DangerResolveRequestModel | undefined
  ): Promise<DangerResolveRequestItemResponseModel> {
    let url_ = this.baseUrl + "/api/Danger/Request/Resolve"
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
      return this.processResolve(_response)
    })
  }

  protected processResolve(response: Response): Promise<DangerResolveRequestItemResponseModel> {
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
              ) as DangerResolveRequestItemResponseModel)
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
    return Promise.resolve<DangerResolveRequestItemResponseModel>(null as any)
  }

  /**
   * Gets the entity with the specified ID.
   * @param id The ID of the entity to get.
   * @return Success
   */
  requestGET(id: string): Promise<DangerRequestItemResponseModel> {
    let url_ = this.baseUrl + "/api/Danger/Request/{id}"
    if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.")
    url_ = url_.replace("{id}", encodeURIComponent("" + id))
    url_ = url_.replace(/[?&]$/, "")

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    }

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processRequestGET(_response)
    })
  }

  protected processRequestGET(response: Response): Promise<DangerRequestItemResponseModel> {
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as DangerRequestItemResponseModel)
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
    return Promise.resolve<DangerRequestItemResponseModel>(null as any)
  }

  /**
   * Updates an existing entity.
   * @param body (optional) The updated entity.
   * @return Success
   */
  requestPUT(id: string, body: DangerRequest | undefined): Promise<DangerRequestItemResponseModel> {
    let url_ = this.baseUrl + "/api/Danger/Request/{id}"
    if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.")
    url_ = url_.replace("{id}", encodeURIComponent("" + id))
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
      return this.processRequestPUT(_response)
    })
  }

  protected processRequestPUT(response: Response): Promise<DangerRequestItemResponseModel> {
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as DangerRequestItemResponseModel)
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
    return Promise.resolve<DangerRequestItemResponseModel>(null as any)
  }

  /**
   * Deletes an entity with the specified ID.
   * @param id The ID of the entity to delete.
   * @return Success
   */
  requestDELETE(id: string): Promise<DangerRequestItemResponseModel> {
    let url_ = this.baseUrl + "/api/Danger/Request/{id}"
    if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.")
    url_ = url_.replace("{id}", encodeURIComponent("" + id))
    url_ = url_.replace(/[?&]$/, "")

    let options_: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
      },
    }

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processRequestDELETE(_response)
    })
  }

  protected processRequestDELETE(response: Response): Promise<DangerRequestItemResponseModel> {
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as DangerRequestItemResponseModel)
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
    return Promise.resolve<DangerRequestItemResponseModel>(null as any)
  }

  /**
   * Gets all entities.
   * @return Success
   */
  requestGET2(): Promise<DangerRequestListItemResponseModel> {
    let url_ = this.baseUrl + "/api/Danger/Request"
    url_ = url_.replace(/[?&]$/, "")

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    }

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processRequestGET2(_response)
    })
  }

  protected processRequestGET2(response: Response): Promise<DangerRequestListItemResponseModel> {
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
              ) as DangerRequestListItemResponseModel)
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
    return Promise.resolve<DangerRequestListItemResponseModel>(null as any)
  }
}
