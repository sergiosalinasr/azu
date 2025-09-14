import { Component } from '@angular/core';
import { Tablatdu } from '../../models/tablatdu';
import { TablatduService } from '../../services/tablatdu.service'

@Component({
  selector: 'app-tablatdu',
  templateUrl: './tablatdu.component.html',
  styleUrl: './tablatdu.component.css'
})
export class TablatduComponent {

  tablatduArray:Tablatdu[] = [];

  selectedTablatdu: Tablatdu = new Tablatdu(0, "", "");

  constructor(private tablatduService:TablatduService) { }

  ngOnInit(): void {
    this.tablatduService.tablaTduLista().subscribe(data =>{
      this.tablatduArray = data;
    })
  }

  addOrEdit(){

    // Si no hay emppleado seleccionado...
    if (this.selectedTablatdu.id === 0){
      confirm("addOrEdit: this.selectedTablatdu.id == 0 CREATE")
      this.tablatduService.postTablatdu(this.selectedTablatdu).subscribe( data =>{
        let dataResponse:any=data;
        if (dataResponse.id == this.selectedTablatdu.id){
          //this.alertas.showSuccess('Datos modificados', 'Hecho');
          this.tablatduArray.push(this.selectedTablatdu)
        }else{
          // this.alertas.showError('Datos NO modificados','Error')
        }
      })

      this.selectedTablatdu = new Tablatdu(0, "", "");
    }  else {
      //confirm("addOrEdit: this.selectedTablatdu.id == 0 UPDATE")
      this.tablatduService.putTablatdu(this.selectedTablatdu).subscribe( data =>{
        let dataResponse:any=data;
        if (dataResponse.id == this.selectedTablatdu.id){
          //this.alertas.showSuccess('Datos modificados', 'Hecho');
        }else{
          // this.alertas.showError('Datos NO modificados','Error')
        }
      })

      this.selectedTablatdu = new Tablatdu(0, "", "");
    }
    
    this.selectedTablatdu = new Tablatdu(0, "", "");
  }

  openForEdit(tablatdu: Tablatdu){
    //this.selectedTablatdu = tablatdu;
    
    if ( this.selectedTablatdu.id === 0){
      //confirm("openForEdit: this.selectedTablatdu.id == 0 TRUE")
      this.selectedTablatdu = tablatdu;
    } 
    else {
      /*
      this.tablatduService.putTablatdu(this.selectedTablatdu).subscribe( data =>{
        let dataResponse:any=data;
        if (dataResponse.id == this.selectedTablatdu.id){
          //this.alertas.showSuccess('Datos modificados', 'Hecho');
        }else{
          // this.alertas.showError('Datos NO modificados','Error')
        }
      })
      */
      this.selectedTablatdu = new Tablatdu(0, "", "");
    }
    
  }

  delete(){
    if (confirm("Are yu sure you want to deleted it?")){
      this.tablatduService.deleteTablatdu(this.selectedTablatdu).subscribe( data =>{
        let dataResponse:any=data;
        if (dataResponse.id == this.selectedTablatdu.id){
          //this.alertas.showSuccess('Datos modificados', 'Hecho');
          this.tablatduArray = this.tablatduArray.filter(item => item.id !== this.selectedTablatdu.id);

          //this.tablatduArray = this.tablatduArray.filter( x => x != this.selectedTablatdu);
          //this.tablatduArray.push(this.selectedTablatdu)
        }else{
          // this.alertas.showError('Datos NO modificados','Error')
        }
      })
      this.tablatduArray = this.tablatduArray.filter(item => item.id !== this.selectedTablatdu.id);
      this.selectedTablatdu = new Tablatdu(0, "", "");
    }
    
  }

}
