import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionResult } from 'src/app/models/action-result/action-result.model';
import { EStatusPedido } from 'src/app/shared/pedido/pedido-model/pedido-status.enum';
import { BaseService, HttpOptions } from 'src/app/utils/app.api';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService extends BaseService<any> {

  constructor(private http: HttpClient) { super(); }

  obterFaturamento(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/dashboard/obterFaturamento`, HttpOptions);
  }
  exportarFaturamentoXlsx(): Observable<Blob> {
    return this.http.get(`${this.AZFOOTFITNESS_API}/dashboard/exportarFaturamentoXlsx`, { responseType: 'blob' });
  }

  obterContratadosNovosEncerradosPorData(date: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/dashboard/obterContratadosNovosEncerradosPorData?data=${date}`, HttpOptions);
  }
  exportarContratoNovosXls(date: string): Observable<Blob> {
    return this.http.get(`${this.AZFOOTFITNESS_API}/dashboard/exportarContratoNovosXls?data=${date}`, { responseType: 'blob' });
  }
  exportarContratoEncerradosXls(date: string): Observable<Blob> {
    return this.http.get(`${this.AZFOOTFITNESS_API}/dashboard/exportarContratoEncerradosXls?data=${date}`, { responseType: 'blob' });
  }

  obterQuantitativoDeDietas(date: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/dashboard/obterQuantitativoDeDietas?data=${date}`, HttpOptions);
  }
  exportarClientesDeDietaXls(date: string, dieta: number): Observable<Blob> {
    return this.http.get(`${this.AZFOOTFITNESS_API}/dashboard/exportarClientesDeDietaXls?data=${date}&dieta=${dieta}`, { responseType: 'blob' });
  }

  obterPedidosSuspensosAntecipados(date: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/dashboard/obterPedidosSuspensosAntecipados?data=${date}`, HttpOptions);
  }
  exportarClientesPedidosSuspensosOuAntecipadosXls(date: string, status: any): Observable<Blob> {
    return this.http.get(`${this.AZFOOTFITNESS_API}/dashboard/exportarClientesPedidosSuspensosOuAntecipadosXls?data=${date}&status=${status}`, { responseType: 'blob' });
  }

  obterPagamentosAberto(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/dashboard/obterPagamentosAberto`, HttpOptions);
  }
  exportarPagamentosAbertoXls(): Observable<Blob> {
    return this.http.get(`${this.AZFOOTFITNESS_API}/dashboard/exportarPagamentosAbertoXls`, { responseType: 'blob' });
  }
  confirmarPagamento(idContratacaoPacote: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/dashboard/confirmaPagamento?idContratacaoPacote=${idContratacaoPacote}`, HttpOptions);
  }
  obterEnderecoAlteradoNoExpediente(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/dashboard/obterEnderecoAlteradoNoExpediente`, HttpOptions);
  }
  exportarEntregasComAlteracaoEnderecoExpedienteXls(): Observable<Blob> {
    return this.http.get(`${this.AZFOOTFITNESS_API}/dashboard/exportarEntregasComAlteracaoEnderecoExpedienteXls`, { responseType: 'blob' });
  }
  exportarReciboDePagamentoPdf(idContratacaoPacote: string): Observable<Blob> {
    return this.http.get(`${this.AZFOOTFITNESS_API}/dashboard/exportarReciboDePagamentoPdf?idContratacaoPacote=${idContratacaoPacote}`, { responseType: 'blob' });
  }

  obterQuantitativoDePeso(date: string): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/dashboard/obterQuantitativoDePeso?data=${date}`, HttpOptions);
  }

  ExportarClientesDePesoXls(date: string, peso: number): Observable<Blob> {
    return this.http.get(`${this.AZFOOTFITNESS_API}/dashboard/exportarClientesDePesoXls?data=${date}&peso=${peso}`, { responseType: 'blob' });
  }

  obterPedidosPendente(): Observable<ActionResult> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/dashboard/obterPedidosPendente`, HttpOptions);
  }

  alterarStatusPedido(idPedido: string, status: EStatusPedido): Observable<any> {
    return this.http.get<ActionResult>(`${this.AZFOOTFITNESS_API}/loja/alterarStatusPedido?idPedido=${idPedido}&status=${status}`, HttpOptions);
  }
  exportarPedidosAbertoXls(): Observable<Blob> {
    return this.http.get(`${this.AZFOOTFITNESS_API}/dashboard/exportarPedidosAbertoXls`, { responseType: 'blob' });
  }

  exportarPedidosAbertoPorPedidoXls(idPedido: string): Observable<Blob> {
    return this.http.get(`${this.AZFOOTFITNESS_API}/dashboard/exportarPedidosAbertoPorIdXls?idPedido=${idPedido}`, { responseType: 'blob' });
  }

}
