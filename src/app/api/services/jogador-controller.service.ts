/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { JogadorDto } from '../models/jogador-dto';
import { JogadorDadosAlteraveisDto } from '../models/jogador-dados-alteraveis-dto';
import { JogadorListaDto } from '../models/jogador-lista-dto';

@Injectable({
  providedIn: 'root',
})
export class JogadorControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation obterPorId
   */
  static readonly ObterPorIdPath = '/api/$(app.api.version)/jogador/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, JogadorControllerService.ObterPorIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `obterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.obterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }


  /**
   * Path part for operation alterar
   */
  static readonly AlterarPath = '/api/$(app.api.version)/jogador/{id}';

  /**
   * Método utilizado para alterar
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar$Response(params: {
    id: number;
    body: JogadorDadosAlteraveisDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<JogadorDto>> {

    const rb = new RequestBuilder(this.rootUrl, JogadorControllerService.AlterarPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '/',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<JogadorDto>;
      })
    );
  }

  /**
   * Método utilizado para alterar
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar(params: {
    id: number;
    body: JogadorDadosAlteraveisDto
  },
  context?: HttpContext

): Observable<JogadorDto> {

    return this.alterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<JogadorDto>) => r.body as JogadorDto)
    );
  }

  /**
   * Path part for operation remover
   */
  static readonly RemoverPath = '/api/$(app.api.version)/jogador/{id}';

  /**
   * Método utilizado para remover jogadores
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `remover()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<JogadorDto>> {

    const rb = new RequestBuilder(this.rootUrl, JogadorControllerService.RemoverPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '/',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<JogadorDto>;
      })
    );
  }

  /**
   * Método utilizado para remover jogadores
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `remover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<JogadorDto> {

    return this.remover$Response(params,context).pipe(
      map((r: StrictHttpResponse<JogadorDto>) => r.body as JogadorDto)
    );
  }

  /**
   * Path part for operation incluir
   */
  static readonly IncluirPath = '/api/$(app.api.version)/jogador';

  /**
   * Método utilizado para realizar a inclusão de um novo jogador
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `incluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir$Response(params: {
    body: JogadorDadosAlteraveisDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<JogadorDto>> {

    const rb = new RequestBuilder(this.rootUrl, JogadorControllerService.IncluirPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '/',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<JogadorDto>;
      })
    );
  }

  /**
   * Método utilizado para realizar a inclusão de um novo jogador
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `incluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir(params: {
    body: JogadorDadosAlteraveisDto
  },
  context?: HttpContext

): Observable<JogadorDto> {

    return this.incluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<JogadorDto>) => r.body as JogadorDto)
    );
  }

  /**
   * Path part for operation listAll
   */
  static readonly ListAllPath = '/api/$(app.api.version)/jogador/listar';

  /**
   * Lista de Jogadores Cadastrados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<JogadorListaDto>>> {

    const rb = new RequestBuilder(this.rootUrl, JogadorControllerService.ListAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '/',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<JogadorListaDto>>;
      })
    );
  }

  /**
   * Lista de Jogadores Cadastrados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll(params?: {
  },
  context?: HttpContext

): Observable<Array<JogadorListaDto>> {

    return this.listAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<JogadorListaDto>>) => r.body as Array<JogadorListaDto>)
    );
  }

}
