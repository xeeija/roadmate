import { ProblemDetails } from "../entities/ProblemDetails"
import { NotificationRequest } from "../entities/request/NotificationRequest"
import { NotificationItemResponseModel } from "../entities/response/NotificationItemResponseModel"
import { NotificationListItemResponseModel } from "../entities/response/NotificationListItemResponseModel"
import { throwException } from "../error/throwException"

export class NotificationService {
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
    notificationGET(id: string): Promise<NotificationItemResponseModel> {
      let url_ = this.baseUrl + "/api/Notification/{id}"
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
        return this.processNotificationGET(_response)
      })
    }
  
    protected processNotificationGET(response: Response): Promise<NotificationItemResponseModel> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as NotificationItemResponseModel)
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
      return Promise.resolve<NotificationItemResponseModel>(null as any)
    }
  
    /**
     * Updates an existing entity.
     * @param body (optional) The updated entity.
     * @return Success
     */
    notificationPUT(
      id: string,
      body: Notification | undefined
    ): Promise<NotificationItemResponseModel> {
      let url_ = this.baseUrl + "/api/Notification/{id}"
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
        return this.processNotificationPUT(_response)
      })
    }
  
    protected processNotificationPUT(response: Response): Promise<NotificationItemResponseModel> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as NotificationItemResponseModel)
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
      return Promise.resolve<NotificationItemResponseModel>(null as any)
    }
  
    /**
     * Deletes an entity with the specified ID.
     * @param id The ID of the entity to delete.
     * @return Success
     */
    notificationDELETE(id: string): Promise<NotificationItemResponseModel> {
      let url_ = this.baseUrl + "/api/Notification/{id}"
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
        return this.processNotificationDELETE(_response)
      })
    }
  
    protected processNotificationDELETE(response: Response): Promise<NotificationItemResponseModel> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as NotificationItemResponseModel)
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
      return Promise.resolve<NotificationItemResponseModel>(null as any)
    }
  
    /**
     * Gets all entities.
     * @return Success
     */
    notificationGET2(token?: string): Promise<NotificationListItemResponseModel> {
      let url_ = this.baseUrl + "/api/Notification"
      url_ = url_.replace(/[?&]$/, "")
  
      let options_: RequestInit = {
        method: "GET",
        headers: {
          Accept: "text/plain",
          Authorization: "Bearer " + token,
        },
      }
  
      return this.http.fetch(url_, options_).then((_response: Response) => {
        return this.processNotificationGET2(_response)
      })
    }

    notificationWithDanger(token?: string): Promise<NotificationListItemResponseModel> {
      let url_ = this.baseUrl + "/api/Notification/WithDanger"
      url_ = url_.replace(/[?&]$/, "")
  
      let options_: RequestInit = {
        method: "GET",
        headers: {
          Accept: "text/plain",
          Authorization: "Bearer " + token,
        },
      }
  
      return this.http.fetch(url_, options_).then((_response: Response) => {
        return this.processNotificationGET2(_response)
      })
    }
  
    protected processNotificationGET2(
      response: Response
    ): Promise<NotificationListItemResponseModel> {
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
                ) as NotificationListItemResponseModel)
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
      return Promise.resolve<NotificationListItemResponseModel>(null as any)
    }
  
    /**
     * Creates a new entity.
     * @param body (optional) The request model for the new entity.
     * @return Success
     */
    notificationPOST(body: NotificationRequest | undefined): Promise<NotificationItemResponseModel> {
      let url_ = this.baseUrl + "/api/Notification"
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
        return this.processNotificationPOST(_response)
      })
    }
  
    protected processNotificationPOST(response: Response): Promise<NotificationItemResponseModel> {
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as NotificationItemResponseModel)
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
              : (JSON.parse(_responseText, this.jsonParseReviver) as NotificationItemResponseModel)
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
      return Promise.resolve<NotificationItemResponseModel>(null as any)
    }
  }