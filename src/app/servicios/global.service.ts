import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(private toastr: ToastrService) {}

  showSuccess(msj:string) {
    this.toastr.success(msj,'Aviso');
  }

  showInfo(msj:string) {
    this.toastr.info(msj,'Aviso');
  }

  showError(msj:string) {
    this.toastr.error(msj, 'Error');
  }


}
