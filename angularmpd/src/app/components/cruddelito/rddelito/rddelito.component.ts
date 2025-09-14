import { Component } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Delito, DelitoCampos } from '../../../models/delito';
import { DelitoService } from '../../../services/delito.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-rddelito',
  templateUrl: './rddelito.component.html',
  styleUrl: './rddelito.component.css'
})
export class RddelitoComponent {

  //delitoArray:Delito[] = [];
  DelitoCamposArray:DelitoCampos[] = [];
  //delitoArray: (Delito & { descripcionPais?: string })[] = [];
  tablacduArray: Tablacdu[] = [];
  id_LeyFiltro: number = 0;


  constructor(
    private delitoService:DelitoService, 
    private router: Router, 
    private activerouter:ActivatedRoute, 
    private utilsService: UtilsService,
    private tablacduService:TablacduService) { }

  ngOnInit(): void {

    // Lee el paramatro de entrada necesario para saber si Udc es con filtro de TDU (>0) o sin filtro (=0)
    this.id_LeyFiltro = Number(this.activerouter.snapshot.paramMap.get('id'));
    console.log( "En rdcdu/ngOnInit id_tdu=" + this.id_LeyFiltro)

    //this.tablacduArrayCarga();
    this.refrescarListaDelitos(this.id_LeyFiltro);
   
  }

  nuevaDelito() {

    this.router.navigate(['menulateral/cudelito', 0, this.id_LeyFiltro ]);

  }

  editarDelito(id: number) {

    //this.router.navigate(['editar', id]);
    this.router.navigate(['menulateral/cudelito', id, this.id_LeyFiltro ]);

  }

  irRiesgo(id: number) {

    //this.router.navigate(['editar', id]);
    this.router.navigate(['menulateral/rdriesgo', id ]);

  }

  deleteDelito(delito_id: number){
    if (confirm("Are yu sure you want to deleted it?")){
      this.delitoService.deleteDelitoId(delito_id).subscribe({
        next: (data) => {
          // Refrescar la lista en pantalla
            this.refrescarListaDelitos(this.id_LeyFiltro);
        },
        error: (err) => {
          alert('Hubo un problema al BORRAR la fila en la tabla Delito.');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
        })
      }})
    }
  }

  refrescarListaDelitos(id_ley: number){
    console.log( "En refrescarListaCdus id_ley=" + id_ley)

    if (id_ley > 0 ) {
      console.log( "En refrescarListaCdus/else id_ley=" + id_ley)
      this.delitoService.getdelitocamposid_ley(id_ley).subscribe(data =>{
        this.DelitoCamposArray = data;
        for (let i = 0; i < this.DelitoCamposArray.length; i++) {
          //console.log("this.CduCamposArray[i].nombre: " + this.CduCamposArray[i].nombre);
        }
      })
    } else {
      console.log( "En refrescarListaCdus/else id_ley=" + id_ley)
      this.delitoService.getdelitocampos().subscribe(data =>{
        this.DelitoCamposArray = data;
        for (let i = 0; i < this.DelitoCamposArray.length; i++) {
          //console.log("this.CduCamposArray[i].nombre: " + this.CduCamposArray[i].nombre);
        }
      })
    }
  }

}
