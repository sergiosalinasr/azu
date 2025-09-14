import { Injectable } from '@angular/core';
import { ToastrService} from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  private messageSource = new BehaviorSubject<string>('');
  private messageTypeSource = new BehaviorSubject<'success' | 'error'>('success');
  currentMessage = this.messageSource.asObservable();
  currentMessageType = this.messageTypeSource.asObservable();

  constructor( private toast:ToastrService) { }

  showSuccess(texto:string, titulo:string){
    this.toast.success(texto, titulo);
  }

  showError(texto:string, titulo:string){
    this.toast.error(texto, titulo)
  }

  showMessage(msg: string, type: 'success' | 'error') {
    this.messageSource.next(msg);
    this.messageTypeSource.next(type);
    setTimeout(() => {
      this.messageSource.next('');
    }, 3000);
  }

}
