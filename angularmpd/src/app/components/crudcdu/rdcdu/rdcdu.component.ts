import { Component } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Cdu, CduCampos } from '../../../models/cdu';
import { CduService } from '../../../services/cdu.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-rdcdu',
  templateUrl: './rdcdu.component.html',
  styleUrl: './rdcdu.component.css'
})
export class RdcduComponent {

  //cduArray:Cdu[] = [];
  CduCamposArray:CduCampos[] = [];
  //cduArray: (Cdu & { descripcionPais?: string })[] = [];
  tablacduArray: Tablacdu[] = [];
  tduId_tduEntrada: number = 0;


  constructor(
    private cduService:CduService, 
    private router: Router, 
    private activerouter:ActivatedRoute, 
    private utilsService: UtilsService,
    private tablacduService:TablacduService) { }

  ngOnInit(): void {

    // Lee el paramatro de entrada necesario para saber si Udc es con filtro de TDU (>0) o sin filtro (=0)
    this.tduId_tduEntrada = Number(this.activerouter.snapshot.paramMap.get('id'));
    console.log( "En rdcdu/ngOnInit id_tdu=" + this.tduId_tduEntrada)


    //this.tablacduArrayCarga();
    this.refrescarListaCdus(this.tduId_tduEntrada);
   
  }

  nuevaCdu() {

    this.router.navigate(['menulateral/cucdu', 0, this.tduId_tduEntrada ]);

  }

  editarCdu(id: number) {

    //this.router.navigate(['editar', id]);
    this.router.navigate(['menulateral/cucdu', id, this.tduId_tduEntrada ]);

  }

  deleteCdu(cdu_id: number){
    if (confirm("Are yu sure you want to deleted it?")){
      this.cduService.deleteCduId(cdu_id).subscribe({
        next: (data) => {
          // Refrescar la lista en pantalla
            this.refrescarListaCdus(this.tduId_tduEntrada);
        },
        error: (err) => {
          alert('Hubo un problema al BORRAR la fila en la tabla Cdu.');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
        })
      }})
    }
  }

  refrescarListaCdus(id_tdu: number){

    console.log( "En refrescarListaCdus id_tdu=" + id_tdu)
    /*
    if (id_tdu = 0 ) {
      this.cduService.getcducampos().subscribe(data =>{
        this.CduCamposArray = data;
        for (let i = 0; i < this.CduCamposArray.length; i++) {
          //console.log("this.CduCamposArray[i].nombre: " + this.CduCamposArray[i].nombre);
        }
      })
    } else {
     */
    if (id_tdu > 0 ) {
      console.log( "En refrescarListaCdus/else id_tdu=" + id_tdu)
      this.cduService.getcducamposid_tdu(id_tdu).subscribe(data =>{
        this.CduCamposArray = data;
        for (let i = 0; i < this.CduCamposArray.length; i++) {
          //console.log("this.CduCamposArray[i].nombre: " + this.CduCamposArray[i].nombre);
        }
      })
    } else {
      console.log( "En refrescarListaCdus/else id_tdu=" + id_tdu)
      this.cduService.getcducampos().subscribe(data =>{
        this.CduCamposArray = data;
        for (let i = 0; i < this.CduCamposArray.length; i++) {
          //console.log("this.CduCamposArray[i].nombre: " + this.CduCamposArray[i].nombre);
        }
      })
    }
    //}


  }

}
