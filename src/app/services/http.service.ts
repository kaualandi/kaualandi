import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env';
import { ToastrService } from 'ngx-toastr';
import { catchError, retry, throwError } from 'rxjs';
import { LanguageService } from './language.service';
import { ObjectService } from './object.service';
import { StorageService } from './storage.service';

export interface BodyJson {
  [key: string]: unknown;
}

export interface HttpConfig {
  token: boolean;
}

type ApplicationsTypes = 'json' | 'x-www-form-urlencoded';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private toastr = inject(ToastrService);
  private objectService = inject(ObjectService);
  private language = inject(LanguageService);

  public base_url = environment.base_url;
  private repeat = 1;

  private getBodyType(body: BodyJson | HttpParams): ApplicationsTypes {
    if (!(body instanceof HttpParams)) {
      this.objectService.removeEmptyValues(body);
    }
    return body instanceof HttpParams ? 'x-www-form-urlencoded' : 'json';
  }

  private getUrl(url: string) {
    if (url.includes('http')) return url;
    return this.base_url + url;
  }

  private getHeaders(
    application: ApplicationsTypes = 'json',
    config: HttpConfig
  ) {
    const headers = {
      'Content-Type': `application/${application}`,
      'Accept-Language': this.language.current,
      Authorization: '',
    };
    if (this.storage.token && config.token) {
      headers.Authorization = 'token ' + this.storage.token;
    }

    return headers;
  }

  private handleError = (error: HttpErrorResponse) => {
    this.toastr.error(
      error.error.detail ||
        error.error.message ||
        'Não foi possível completar a ação'
    );
    return throwError(() => error);
  };

  private validateConfig(config?: HttpConfig) {
    if (!config) config = {} as HttpConfig;
    if (typeof config.token !== 'boolean') config.token = true;
    return config;
  }

  /**
   * ### Método GET
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição
   *
   * *O Content-Type é application/json*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param params *opcinal* - Query parametros da requisição (itens depois do **?** na url)
   * @param config *opcional* - Configurações da requisição (veja a interface HttpConfig)
   * @returns Retorna um Observable de sua requisição
   */
  public get<T>(url: string, params?: HttpParams, config?: HttpConfig) {
    config = this.validateConfig(config);
    const headers = this.getHeaders('json', config);
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
   * @param params *opcinal* - Query parametros da requisição (itens depois do **?** na url)
   * @param config *opcional* - Configurações da requisição (veja a interface HttpConfig)
   * @returns Retorna um Observable de sua requisição
   */
  public post<T>(
    url: string,
    body: HttpParams | BodyJson,
    params?: HttpParams,
    config?: HttpConfig
  ) {
    const application = this.getBodyType(body);
    config = this.validateConfig(config);
    const headers = this.getHeaders(application, config);
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
   * @param params *opcinal* - Query parametros da requisição (itens depois do **?** na url)
   * @param config *opcional* - Configurações da requisição (veja a interface HttpConfig)
   * @returns Retorna um Observable de sua requisição
   */
  public patch<T>(
    url: string,
    body: HttpParams | BodyJson,
    params?: HttpParams,
    config?: HttpConfig
  ) {
    const application = this.getBodyType(body);
    config = this.validateConfig(config);
    const headers = this.getHeaders(application, config);
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
   * @param params *opcinal* - Query parametros da requisição (itens depois do **?** na url)
   * @param config *opcional* - Configurações da requisição (veja a interface HttpConfig)
   * @returns Retorna um Observable de sua requisição
   */
  public delete<T>(url: string, params?: HttpParams, config?: HttpConfig) {
    config = this.validateConfig(config);
    const headers = this.getHeaders('json', config);
    return this.http
      .delete<T>(this.getUrl(url), { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }
}
