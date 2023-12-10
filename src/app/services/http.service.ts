import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { catchError, retry, throwError } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

export interface BodyJson {
  [key: string]: string | number | boolean | BodyJson | BodyJson[];
}

type ApplicationsTypes = 'json' | 'x-www-form-urlencoded';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private notifier: NotifierService
  ) {}

  public base_url = environment.base_url;
  private repeat = 1;

  private getBodyType(body: BodyJson | HttpParams): ApplicationsTypes {
    return body instanceof HttpParams ? 'x-www-form-urlencoded' : 'json';
  }

  private getUrl(url: string) {
    if (url.includes('http')) return url;
    return this.base_url + url;
  }

  private getHeaders(application: ApplicationsTypes = 'json') {
    const headers = {
      'Content-Type': `application/${application}`,
      Authorization: '',
    };
    if (this.storage.token) {
      headers.Authorization = 'token ' + this.storage.token;
    }

    return headers;
  }

  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error.detail || 'Não foi possível completar a ação';
    }

    this.notifier.notify('error', errorMessage);
    return throwError(() => error);
  };

  /**
   * ### Método GET
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição
   *
   * *O Content-Type é application/json*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param params *opicinal* - Query parametros da requisição (itens depois do **?** na url)
   * @returns Retorna um Observable de sua requisição
   */
  get<T>(url: string, params?: HttpParams) {
    const headers = this.getHeaders();
    return this.http
      .get<T>(this.getUrl(url), { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Método POST
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição.
   *
   * *O Content-Type será automático com base no tipo de seu body*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param body Corpo da requisição
   * @param params *opicinal* - Query parametros da requisição (itens depois do **?** na url)
   * @returns Retorna um Observable de sua requisição
   */
  post<T>(url: string, body: HttpParams | BodyJson, params?: HttpParams) {
    const application = this.getBodyType(body);
    const headers = this.getHeaders(application);
    const _body = application === 'json' ? JSON.stringify(body) : body;

    return this.http
      .post<T>(this.getUrl(url), _body, {
        headers,
        params,
      })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Método PATCH
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição.
   *
   * *O Content-Type será automático com base no tipo de seu body*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param body Corpo da requisição
   * @param params *opicinal* - Query parametros da requisição (itens depois do **?** na url)
   * @returns Retorna um Observable de sua requisição
   */
  patch<T>(url: string, body: HttpParams | BodyJson, params?: HttpParams) {
    const application = this.getBodyType(body);
    const headers = this.getHeaders(application);
    const _body = application === 'json' ? JSON.stringify(body) : body;

    return this.http
      .patch<T>(this.getUrl(url), _body, { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Método DELETE
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição
   *
   * *O Content-Type é application/json*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param params *opicinal* - Query parametros da requisição (itens depois do **?** na url)
   * @returns Retorna um Observable de sua requisição
   */
  delete<T>(url: string, params?: HttpParams) {
    const headers = this.getHeaders();
    return this.http
      .delete<T>(this.getUrl(url), { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }
}
