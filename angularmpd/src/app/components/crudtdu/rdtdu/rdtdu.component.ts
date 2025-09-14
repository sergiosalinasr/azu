import { Component } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Tdu, TduCampos } from '../../../models/tdu';
import { TduService } from '../../../services/tdu.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-rdtdu',
  templateUrl: './rdtdu.component.html',
  styleUrl: './rdtdu.component.css'
})
export class RdtduComponent {

  //tduArray:Tdu[] = [];
  TduCamposArray:TduCampos[] = [];
  //tduArray: (Tdu & { descripcionPais?: string })[] = [];
  tablacduArray: Tablacdu[] = [];


  constructor(
    private tduService:TduService, 
    private router: Router, 
    private utilsService: UtilsService,
    private tablacduService:TablacduService) { }

  ngOnInit(): void {

    //this.tablacduArrayCarga();
    this.refrescarListaTdu();
   
  }

  nuevaTdu() {

    this.router.navigate(['menulateral/cutdu', 0 ]);

  }

  editarTdu(id: number) {

    //this.router.navigate(['editar', id]);
    this.router.navigate(['menulateral/cutdu', id ]);

  }

  irCdu(id: number) {

    //this.router.navigate(['editar', id]);
    this.router.navigate(['menulateral/rdcdu', id ]);

  }

  deleteTdu(tdu_id: number){
    if (confirm("Are yu sure you want to deleted it?")){
      this.tduService.deleteTduId(tdu_id).subscribe({
        next: (data) => {
          // Refrescar la lista en pantalla
            this.refrescarListaTdu();
        },
        error: (err) => {
          alert('Hubo un problema al BORRAR la fila en la tabla Tdu.');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
        })
      }})
    }
  }

  refrescarListaTdu(){
    this.tduService.gettducampos().subscribe(data =>{
      this.TduCamposArray = data;
      for (let i = 0; i < this.TduCamposArray.length; i++) {
        
      }
    })
  }

}
