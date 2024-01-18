import { Danger } from "../entities/Danger"
import { DangerModel } from "../entities/DangerModel"
import { ProblemDetails } from "../entities/ProblemDetails"
import { DangerItemResponseModel } from "../entities/response/DangerItemResponseModel"
import { DangerListItemResponseModel } from "../entities/response/DangerListItemResponseModel"
import { throwException } from "../error/throwException"

export class DangerService {
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
   * Gets the entity with the specified ID.
   * @param id The ID of the entity to get.
   * @return Success
   */
  dangerGET(id: string, token?: string): Promise<DangerItemResponseModel> {
    let url_ = this.baseUrl + "/api/Danger/{id}"
    if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.")
    url_ = url_.replace("{id}", encodeURIComponent("" + id))
    url_ = url_.replace(/[?&]$/, "")

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "text/plain",
        Authorization: "Bearer " + token,
      },
    }

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processDangerGET(_response)
    })
  }

  /**
   * Gets the entity with the specified ID and includes messages.
   * @param id The ID of the entity to get.
   * @return Success
   */
  dangerWithMessagesGET(id: string, token?: string): Promise<DangerItemResponseModel> {
    let url_ = this.baseUrl + "/api/Danger/{id}/WithMessages"
    if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.")
    url_ = url_.replace("{id}", encodeURIComponent("" + id))
    url_ = url_.replace(/[?&]$/, "")

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "text/plain",
        Authorization: "Bearer " + token,
      },
    }

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processDangerGET(_response)
    })
  }

  protected processDangerGET(response: Response): Promise<DangerItemResponseModel> {
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as DangerItemResponseModel)
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
    return Promise.resolve<DangerItemResponseModel>(null as any)
  }

  /**
   * Updates an existing entity.
   * @param body (optional) The updated entity.
   * @return Success
   */
  dangerPUT(id: string, body: Danger | undefined): Promise<DangerItemResponseModel> {
    let url_ = this.baseUrl + "/api/Danger/{id}"
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
      return this.processDangerPUT(_response)
    })
  }

  protected processDangerPUT(response: Response): Promise<DangerItemResponseModel> {
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as DangerItemResponseModel)
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
    return Promise.resolve<DangerItemResponseModel>(null as any)
  }

  /**
   * Deletes an entity with the specified ID.
   * @param id The ID of the entity to delete.
   * @return Success
   */
  dangerDELETE(id: string): Promise<DangerItemResponseModel> {
    let url_ = this.baseUrl + "/api/Danger/{id}"
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
      return this.processDangerDELETE(_response)
    })
  }

  protected processDangerDELETE(response: Response): Promise<DangerItemResponseModel> {
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as DangerItemResponseModel)
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
    return Promise.resolve<DangerItemResponseModel>(null as any)
  }

  /**
   * Gets all entities.
   * @return Success
   */
  dangerGET2(token: string): Promise<DangerListItemResponseModel> {
    let url_ = this.baseUrl + "/api/Danger"
    url_ = url_.replace(/[?&]$/, "")

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "text/plain",
        Authorization: "Bearer " + token,
      },
    }

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processDangerGET2(_response)
    })
  }

  protected processDangerGET2(response: Response): Promise<DangerListItemResponseModel> {
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as DangerListItemResponseModel)
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
    return Promise.resolve<DangerListItemResponseModel>(null as any)
  }

  /**
   * Creates a new entity.
   * @param body (optional) The request model for the new entity.
   * @return Success
   */
  dangerPOST(body: DangerModel | undefined, token: string): Promise<DangerItemResponseModel> {
    let url_ = this.baseUrl + "/api/Danger"
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
      return this.processDangerPOST(_response)
    })
  }

  protected processDangerPOST(response: Response): Promise<DangerItemResponseModel> {
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as DangerItemResponseModel)
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
            : (JSON.parse(_responseText, this.jsonParseReviver) as DangerItemResponseModel)
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
    return Promise.resolve<DangerItemResponseModel>(null as any)
  }
}
