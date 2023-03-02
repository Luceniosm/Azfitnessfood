import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class Util {

    constructor(

    ) { }

    static getFile(file: File): Promise<any> {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onerror = () => { reader.abort(); reject(new Error('Error parsing file')); };
            reader.onload = function (evt: any) {

                const bytes = Array.from(new Uint8Array(evt.target.result));
                const base64StringFile = btoa(bytes.map((item) => String.fromCharCode(item)).join(''));

                resolve({
                    bytes: bytes,
                    nome: file.name,
                    mimeType: file.type,
                    imagem: base64StringFile,
                });
            };
            reader.readAsArrayBuffer(file);
        });
    }

    static downloadFile(_: any, extension: any, nomeArquivo: string, tipo: string): void {
      const newBlob = new Blob([_], { type: tipo });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      const data = window.URL.createObjectURL(newBlob);

      const link = document.createElement('a');
      link.href = data;
      link.download = nomeArquivo + extension;
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    }
}

