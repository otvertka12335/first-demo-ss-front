import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {
  }

  showSuccess(msg, title) {
    this.toastr.success(msg, title);
  }

  showInfo(msg, title) {
    this.toastr.info(msg, title);
  }

  showError(msg, title) {
    this.toastr.error(msg, title);
  }

  showWarning(msg, title) {
    this.toastr.warning(msg, title);
  }
}
