(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"P+IX":function(l,n,u){"use strict";u.d(n,"a",function(){return a});var t=u("qXBG"),e=u("8Y7J"),o=u("iInd");let a=(()=>{class l{constructor(l,n){this.router=l,this.authenticationService=n}canActivate(l,n){const u=this.authenticationService.currentUserValue;return u?!l.data.roles||-1!==l.data.roles.indexOf(u.user.perfil.descricao.toUpperCase())||(this.router.navigate(["/naoAutorizada"]),!1):(this.router.navigate(["/login"],{queryParams:{returnUrl:n.url}}),!1)}}return l.\u0275prov=e.fc({factory:function(){return new l(e.gc(o.k),e.gc(t.a))},token:l,providedIn:"root"}),l})()},kLqA:function(l,n,u){"use strict";n.__esModule=!0;var t=function(){function l(n){if(!n)throw new TypeError("Invalid argument; `value` has no value.");this.value=l.EMPTY,n&&l.isGuid(n)&&(this.value=n)}return l.isGuid=function(n){var u=n.toString();return n&&(n instanceof l||l.validator.test(u))},l.create=function(){return new l([l.gen(2),l.gen(1),l.gen(1),l.gen(1),l.gen(3)].join("-"))},l.createEmpty=function(){return new l("emptyguid")},l.parse=function(n){return new l(n)},l.raw=function(){return[l.gen(2),l.gen(1),l.gen(1),l.gen(1),l.gen(3)].join("-")},l.gen=function(l){for(var n="",u=0;u<l;u++)n+=(65536*(1+Math.random())|0).toString(16).substring(1);return n},l.prototype.equals=function(n){return l.isGuid(n)&&this.value===n.toString()},l.prototype.isEmpty=function(){return this.value===l.EMPTY},l.prototype.toString=function(){return this.value},l.prototype.toJSON=function(){return{value:this.value}},l.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),l.EMPTY="00000000-0000-0000-0000-000000000000",l}();n.Guid=t},sMep:function(l,n,u){"use strict";u.r(n),u.d(n,"RelatorioModuleNgFactory",function(){return al});var t=u("8Y7J"),e=u("SVse"),o=u("vT00"),a=u.n(o);Object(e.G)(a.a,"pt-BR");class r{}var i=u("pMnS"),c=u("iInd");class s{constructor(){}ngOnInit(){}}var b=t.Ab({encapsulation:0,styles:[[".container_logo[_ngcontent-%COMP%]{display:flex;margin-top:-65px;background-color:#fff}.dvLogo[_ngcontent-%COMP%]{background:#fff;border:3px solid #000;border-radius:160px;height:125px;padding:7px 10px 17px;margin:0 auto 10px;width:125px;z-index:1}.dvLogo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100px!important}.border_top[_ngcontent-%COMP%]{display:flex;flex-flow:column;height:100%;z-index:-1}.border_top_fixed[_ngcontent-%COMP%]{height:75px;background-color:#000}"]],data:{}});function p(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,1,"div",[["class","border_top d-print-none"]],null,null,null,null,null)),(l()(),t.Cb(1,0,null,null,0,"div",[["class","border_top_fixed"]],null,null,null,null,null)),(l()(),t.Cb(2,0,null,null,2,"div",[["class","container_logo d-print-none"]],null,null,null,null,null)),(l()(),t.Cb(3,0,null,null,1,"div",[["class","dvLogo"]],null,null,null,null,null)),(l()(),t.Cb(4,0,null,null,0,"img",[["alt","Responsive image"],["class","img-responsive"],["src","assets/img/logo.png"]],null,null,null,null,null)),(l()(),t.Cb(5,0,null,null,2,"div",[["class","text-center d-print-none"]],null,null,null,null,null)),(l()(),t.Cb(6,0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),t.bc(-1,null,["Rel\xe1torios de entregas"])),(l()(),t.Cb(8,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),t.Bb(9,212992,null,0,c.o,[c.b,t.W,t.l,[8,null],t.i],null,null)],function(l,n){l(n,9,0)},null)}function d(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,1,"app-cabecalho",[],null,null,null,p,b)),t.Bb(1,114688,null,0,s,[],null,null)],function(l,n){l(n,1,0)},null)}var g=t.yb("app-cabecalho",s,d,{},{},[]),f=u("bOtU"),m=u("wd/R"),v=u("kLqA"),C=u("NzdG"),h=u("IheW");let P=(()=>{class l extends C.b{constructor(l){super(),this.http=l}consultarEntregas(l){return this.http.post(`${this.AZFOOTFITNESS_API}/entrega/RelatorioEntrega`,l,C.c)}}return l.\u0275prov=t.fc({factory:function(){return new l(t.gc(h.c))},token:l,providedIn:"root"}),l})();class x{constructor(l,n,u){this.rotaAtual=l,this.relatorioService=n,this.location=u,this.entregas=[],this.recibos=[]}ngOnInit(){m.locale("pt-br"),this.dataHoje=m().format("LL"),this.carregarRelatorioCliente()}carregarRelatorioCliente(){this.rotaAtual.params.subscribe(l=>{return n=this,void 0,t=function*(){const n=m(l.data,"YYYY-MM-DD");this.request={dataInicial:new Date(n.format("YYYY-MM-DD")),dataFinal:new Date(n.format("YYYY-MM-DD")),idEntregador:v.Guid.createEmpty().toString(),idTipoPacote:v.Guid.createEmpty().toString()},l.idEntregador!==v.Guid.createEmpty().toString()&&(this.request.idEntregador=l.idEntregador),l.idTipoPacote!==v.Guid.createEmpty().toString()&&(this.request.idTipoPacote=l.idTipoPacote),this.buscarEntregas()},new((u=void 0)||(u=Promise))(function(l,e){function o(l){try{r(t.next(l))}catch(n){e(n)}}function a(l){try{r(t.throw(l))}catch(n){e(n)}}function r(n){var t;n.done?l(n.value):(t=n.value,t instanceof u?t:new u(function(l){l(t)})).then(o,a)}r((t=t.apply(n,[])).next())});var n,u,t})}buscarEntregas(){this.relatorioService.consultarEntregas(this.request).subscribe(l=>{l.success&&(this.entregas=l.data,this.entregas.forEach(l=>{const n=l.clientes.filter(l=>l.lgPrimeiroPedido);n.length>0&&n.forEach(l=>{this.recibos.push(l)})}),setTimeout(()=>{this.imprimir()},2e3))})}imprimir(){window.print()}voltar(){this.location.back()}}var k=t.Ab({encapsulation:0,styles:[[".relatorio_fonte[_ngcontent-%COMP%]{font-size:14px}.pageBreakBefore[_ngcontent-%COMP%]{page-break-before:always}.pageBreakChild[_ngcontent-%COMP%]{page-break-after:always}.pageBreakInside[_ngcontent-%COMP%]{display:block;page-break-inside:avoid!important}@media print{.pageBreakInside[_ngcontent-%COMP%]{display:block;page-break-inside:avoid!important}}"]],data:{}});function w(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,3,"div",[["class","alert alert-dark text-center"]],null,null,null,null,null)),(l()(),t.Cb(1,0,null,null,2,"span",[],null,null,null,null,null)),(l()(),t.Cb(2,0,null,null,1,"h5",[],null,null,null,null,null)),(l()(),t.bc(-1,null,["Nenhuma entrega cadastrada."]))],null,null)}function y(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.bc(1,null,[" - "," "]))],null,function(l,n){l(n,1,0,n.context.$implicit.descricao)})}function I(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,8,"span",[],null,null,null,null,null)),(l()(),t.Cb(1,0,null,null,7,"small",[],null,null,null,null,null)),(l()(),t.Cb(2,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.bc(3,null,["",""])),(l()(),t.Cb(4,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.bc(5,null,["- "," "])),(l()(),t.mb(16777216,null,null,1,null,y)),t.Bb(7,278528,null,0,e.n,[t.W,t.T,t.x],{ngForOf:[0,"ngForOf"]},null),(l()(),t.bc(-1,null,[" | "]))],function(l,n){l(n,7,0,n.context.$implicit.itens)},function(l,n){l(n,3,0,n.context.$implicit.quantidade),l(n,5,0,n.context.$implicit.descricao)})}function O(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,4,"span",[],null,null,null,null,null)),(l()(),t.Cb(1,0,null,null,3,"small",[],null,null,null,null,null)),(l()(),t.bc(-1,null,["- "])),(l()(),t.Cb(3,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.bc(4,null,[" Op\xe7\xe3o: "," "]))],null,function(l,n){l(n,4,0,n.parent.context.$implicit.opcaoCarpadio)})}function M(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,4,"span",[],null,null,null,null,null)),(l()(),t.Cb(1,0,null,null,3,"small",[],null,null,null,null,null)),(l()(),t.bc(-1,null,["- "])),(l()(),t.Cb(3,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.bc(4,null,[" "," "]))],null,function(l,n){l(n,4,0,n.parent.context.$implicit.observacaoPedido)})}function B(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,4,"span",[],null,null,null,null,null)),(l()(),t.Cb(1,0,null,null,3,"small",[],null,null,null,null,null)),(l()(),t.bc(-1,null,["- "])),(l()(),t.Cb(3,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.bc(4,null,[" "," "]))],null,function(l,n){l(n,4,0,n.parent.context.$implicit.observacaoPacote)})}function _(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,5,"div",[["class","row relatorio_fonte"]],null,null,null,null,null)),(l()(),t.Cb(1,0,null,null,4,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t.Cb(2,0,null,null,3,"small",[],null,null,null,null,null)),(l()(),t.Cb(3,0,null,null,2,"b",[],null,null,null,null,null)),(l()(),t.bc(4,null,[" Valor \xe0 receber: "," - Tipo: "," - Forma de Pagamento: "," "])),t.Vb(5,2)],null,function(l,n){var u=t.cc(n,4,0,l(n,5,0,t.Rb(n.parent.parent.parent,1),n.parent.context.$implicit.valorPagamento,"BRL"));l(n,4,0,u,n.parent.context.$implicit.tipoPacote,n.parent.context.$implicit.formaPagamento)})}function E(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,22,"span",[],null,null,null,null,null)),(l()(),t.Cb(1,0,null,null,19,"div",[["class","row border-bottom"]],null,null,null,null,null)),(l()(),t.Cb(2,0,null,null,2,"div",[["class","col-2 relatorio_fonte pr-0"]],null,null,null,null,null)),(l()(),t.Cb(3,0,null,null,1,"small",[],null,null,null,null,null)),(l()(),t.bc(4,null,["",""])),(l()(),t.Cb(5,0,null,null,8,"div",[["class","col-5 relatorio_fonte pr-0 pl-0"]],null,null,null,null,null)),(l()(),t.mb(16777216,null,null,1,null,I)),t.Bb(7,278528,null,0,e.n,[t.W,t.T,t.x],{ngForOf:[0,"ngForOf"]},null),(l()(),t.mb(16777216,null,null,1,null,O)),t.Bb(9,16384,null,0,e.o,[t.W,t.T],{ngIf:[0,"ngIf"]},null),(l()(),t.mb(16777216,null,null,1,null,M)),t.Bb(11,16384,null,0,e.o,[t.W,t.T],{ngIf:[0,"ngIf"]},null),(l()(),t.mb(16777216,null,null,1,null,B)),t.Bb(13,16384,null,0,e.o,[t.W,t.T],{ngIf:[0,"ngIf"]},null),(l()(),t.Cb(14,0,null,null,3,"div",[["class","col-1 relatorio_fonte pr-0 pl-0"]],null,null,null,null,null)),(l()(),t.Cb(15,0,null,null,2,"small",[],null,null,null,null,null)),(l()(),t.bc(16,null,["",""])),t.Vb(17,2),(l()(),t.Cb(18,0,null,null,2,"div",[["class","col-4 relatorio_fonte pr-0 pl-0"]],null,null,null,null,null)),(l()(),t.Cb(19,0,null,null,1,"small",[],null,null,null,null,null)),(l()(),t.bc(20,null,["",""])),(l()(),t.mb(16777216,null,null,1,null,_)),t.Bb(22,16384,null,0,e.o,[t.W,t.T],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,7,0,n.context.$implicit.complementos),l(n,9,0,null!=n.context.$implicit.opcaoCarpadio),l(n,11,0,""!=n.context.$implicit.observacaoPedido),l(n,13,0,""!=n.context.$implicit.observacaoPacote),l(n,22,0,n.context.$implicit.lgPrimeiroPedido)},function(l,n){l(n,4,0,n.context.$implicit.nomeCliente);var u=t.cc(n,16,0,l(n,17,0,t.Rb(n.parent.parent,0),n.context.$implicit.telefone,"(00) 00000-0000"));l(n,16,0,u),l(n,20,0,n.context.$implicit.endereco)})}function T(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,7,"div",[["class","row pb-2"]],null,null,null,null,null)),(l()(),t.Cb(1,0,null,null,6,"div",[["class"," col col-12"]],null,null,null,null,null)),(l()(),t.Cb(2,0,null,null,3,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.Cb(3,0,null,null,2,"h6",[],null,null,null,null,null)),(l()(),t.Cb(4,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.bc(5,null,["",""])),(l()(),t.mb(16777216,null,null,1,null,E)),t.Bb(7,278528,null,0,e.n,[t.W,t.T,t.x],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,7,0,n.context.$implicit.clientes)},function(l,n){l(n,5,0,n.context.$implicit.nomeEntregador)})}function $(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,21,"div",[["class","col col-12 col-md-12"]],null,null,null,null,null)),(l()(),t.Cb(1,0,null,null,20,"div",[["class","card mb-1 pageBreakInside"]],null,null,null,null,null)),(l()(),t.Cb(2,0,null,null,19,"div",[["class","card-body "]],null,null,null,null,null)),(l()(),t.Cb(3,0,null,null,11,"span",[["class","card-text text-justify"]],null,null,null,null,null)),(l()(),t.bc(-1,null,[" Recebemos do cliente "])),(l()(),t.Cb(5,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.bc(6,null,["",""])),(l()(),t.bc(-1,null,[" a quantia de "])),(l()(),t.Cb(8,0,null,null,2,"b",[],null,null,null,null,null)),(l()(),t.bc(9,null,["",""])),t.Vb(10,2),(l()(),t.bc(-1,null,[" correspondente a contrata\xe7\xe3o do pacote na modalidade "])),(l()(),t.Cb(12,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.bc(13,null,["",""])),(l()(),t.bc(-1,null,[" e para clareza firmamos o presente. "])),(l()(),t.Cb(15,0,null,null,1,"div",[["class","card-text text-right"]],null,null,null,null,null)),(l()(),t.bc(16,null,[" Campo Grande - MS "," "])),(l()(),t.Cb(17,0,null,null,0,"hr",[["class","w-50"]],null,null,null,null,null)),(l()(),t.Cb(18,0,null,null,3,"div",[["class","card-text text-center"]],null,null,null,null,null)),(l()(),t.Cb(19,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.bc(-1,null,["Az Fitness Food - CNPJ 09.479.048/0001-07"])),(l()(),t.Cb(21,0,null,null,0,"br",[],null,null,null,null,null))],null,function(l,n){var u=n.component;l(n,6,0,n.context.$implicit.nomeCliente);var e=t.cc(n,9,0,l(n,10,0,t.Rb(n.parent,1),n.context.$implicit.valorPagamento,"BRL"));l(n,9,0,e),l(n,13,0,n.context.$implicit.tipoPacote),l(n,16,0,u.dataHoje)})}function S(l){return t.ec(0,[t.Tb(0,f.d,[f.b]),t.Tb(0,e.d,[t.z,t.m]),(l()(),t.Cb(2,0,null,null,18,"div",[["class","container"]],null,null,null,null,null)),(l()(),t.Cb(3,0,null,null,3,"div",[["class","row mt-5 d-print-none"]],null,null,null,null,null)),(l()(),t.Cb(4,0,null,null,2,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t.mb(16777216,null,null,1,null,w)),t.Bb(6,16384,null,0,e.o,[t.W,t.T],{ngIf:[0,"ngIf"]},null),(l()(),t.Cb(7,0,null,null,6,"div",[["class","row justify-content-end pb-5 d-print-none"]],null,null,null,null,null)),(l()(),t.Cb(8,0,null,null,2,"div",[["class","col-6 col-md-2 col-xl-2"]],null,null,null,null,null)),(l()(),t.Cb(9,0,null,null,1,"button",[["class","btn btn-dark btn-block"],["type","submit"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.voltar()&&t),t},null,null)),(l()(),t.bc(-1,null,["Voltar"])),(l()(),t.Cb(11,0,null,null,2,"div",[["class","col-6 col-md-2 col-xl-2"]],null,null,null,null,null)),(l()(),t.Cb(12,0,null,null,1,"button",[["class","btn btn-dark btn-block"],["type","submit"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.imprimir()&&t),t},null,null)),(l()(),t.bc(-1,null,["Imprimir"])),(l()(),t.Cb(14,0,null,null,2,"span",[["class","pageBreakBefore"]],null,null,null,null,null)),(l()(),t.mb(16777216,null,null,1,null,T)),t.Bb(16,278528,null,0,e.n,[t.W,t.T,t.x],{ngForOf:[0,"ngForOf"]},null),(l()(),t.Cb(17,0,null,null,2,"div",[["class","row pt-5 pageBreakBefore"]],null,null,null,null,null)),(l()(),t.mb(16777216,null,null,1,null,$)),t.Bb(19,278528,null,0,e.n,[t.W,t.T,t.x],{ngForOf:[0,"ngForOf"]},null),(l()(),t.Cb(20,0,null,null,0,"div",[["class","mb-5 pb-3 d-print-none"]],null,null,null,null,null))],function(l,n){var u=n.component;l(n,6,0,0===(null==u.entregas?null:u.entregas.length)),l(n,16,0,u.entregas),l(n,19,0,u.recibos)},null)}function F(l){return t.ec(0,[(l()(),t.Cb(0,0,null,null,1,"app-entrega",[],null,null,null,S,k)),t.Bb(1,114688,null,0,x,[c.a,P,e.k],null,null)],function(l,n){l(n,1,0)},null)}var z=t.yb("app-entrega",x,F,{},{},[]),A=u("z5nN"),R=u("MdoF"),Y=u("r9eI"),q=u("+gI5"),j=u("xkgV"),G=u("2uy1"),W=u("z/SZ"),L=u("LqlI"),V=u("ozj5"),D=u("z4EA"),N=u("/Aj8"),J=u("s7LF"),U=u("P+IX");const X={roles:[u("rVuj").a.Admin]};class Z{}var H=u("p5x4"),Q=u("2ZVE"),K=u("Osdn"),ll=u("CNMR"),nl=u("St1U"),ul=u("lQde"),tl=u("Schs"),el=u("PjcS"),ol=u("PCNd"),al=t.zb(r,[],function(l){return t.Ob([t.Pb(512,t.l,t.eb,[[8,[i.a,g,z,A.a,A.b,R.a,Y.a,q.a]],[3,t.l],t.D]),t.Pb(4608,e.q,e.p,[t.z]),t.Pb(4608,j.e,j.e,[]),t.Pb(5120,f.i,f.h,[f.a,f.f]),t.Pb(4608,f.b,f.b,[f.i]),t.Pb(4608,G.b,G.b,[t.F,t.M,t.I]),t.Pb(4608,W.a,W.a,[t.l,t.F,t.v,G.b,t.g]),t.Pb(4608,L.b,L.b,[t.M,W.a,[2,L.c]]),t.Pb(4608,V.a,V.a,[L.b]),t.Pb(4608,D.a,D.a,[e.e,t.I]),t.Pb(4608,N.a,N.a,[]),t.Pb(1073742336,e.c,e.c,[]),t.Pb(1073742336,J.B,J.B,[]),t.Pb(1073742336,J.A,J.A,[]),t.Pb(1073742336,J.k,J.k,[]),t.Pb(1073742336,J.v,J.v,[]),t.Pb(1073742336,c.n,c.n,[[2,c.s],[2,c.k]]),t.Pb(1073742336,Z,Z,[]),t.Pb(1073742336,f.g,f.g,[]),t.Pb(1073742336,H.b,H.b,[]),t.Pb(1073742336,L.f,L.f,[]),t.Pb(1073742336,Q.d,Q.d,[]),t.Pb(1073742336,K.c,K.c,[]),t.Pb(1073742336,ll.c,ll.c,[]),t.Pb(1073742336,nl.a,nl.a,[]),t.Pb(1073742336,ul.a,ul.a,[]),t.Pb(1073742336,tl.b,tl.b,[]),t.Pb(1073742336,j.a,j.a,[]),t.Pb(1073742336,el.b,el.b,[]),t.Pb(1073742336,ol.a,ol.a,[]),t.Pb(1073742336,r,r,[]),t.Pb(256,t.z,"pt-BR",[]),t.Pb(1024,c.i,function(){return[[{path:"",component:s,children:[{path:"",redirectTo:"",pathMatch:"full"},{path:"entrega/:data/:idEntregador/:idTipoPacote",component:x}],canActivate:[U.a],data:X}]]},[]),t.Pb(256,f.f,void 0,[]),t.Pb(256,f.a,f.j,[])])})}}]);