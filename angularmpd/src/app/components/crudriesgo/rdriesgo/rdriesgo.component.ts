import { Component } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Riesgo, RiesgoCampos } from '../../../models/riesgo';
import { RiesgoService } from '../../../services/riesgo.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-rdriesgo',
  templateUrl: './rdriesgo.component.html',
  styleUrl: './rdriesgo.component.css'
})
export class RdriesgoComponent {

  //riesgoArray:Riesgo[] = [];
  RiesgoCamposArray:RiesgoCampos[] = [];
  //riesgoArray: (Riesgo & { descripcionPais?: string })[] = [];
  tablacduArray: Tablacdu[] = [];
  id_DelitoFiltro: number = 0;


  constructor(
    private riesgoService:RiesgoService, 
    private router: Router, 
    private activerouter:ActivatedRoute, 
    private utilsService: UtilsService,
    private tablacduService:TablacduService) { }

  ngOnInit(): void {

    // Lee el paramatro de entrada necesario para saber si Udc es con filtro de TDU (>0) o sin filtro (=0)
    this.id_DelitoFiltro = Number(this.activerouter.snapshot.paramMap.get('id'));
    console.log( "En rdriesgo/ngOnInit id_DelitoFiltro=" + this.id_DelitoFiltro)

    //this.tablacduArrayCarga();
    this.refrescarListaRiesgos(this.id_DelitoFiltro);
   
  }

  nuevaRiesgo() {

    console.log("rdriesgo.component/nuevaRiesgo/this.id_DelitoFiltro: " + this.id_DelitoFiltro);
    this.router.navigate(['menulateral/curiesgo', 0, this.id_DelitoFiltro ]);

  }

  editarRiesgo(id: number) {

    //this.router.navigate(['editar', id]);
    this.router.navigate(['menulateral/curiesgo', id, this.id_DelitoFiltro ]);

  }

  deleteRiesgo(riesgo_id: number){
    if (confirm("Are yu sure you want to deleted it?")){
      this.riesgoService.deleteRiesgoId(riesgo_id).subscribe({
        next: (data) => {
          // Refrescar la lista en pantalla
            this.refrescarListaRiesgos(this.id_DelitoFiltro);
        },
        error: (err) => {
          alert('Hubo un problema al BORRAR la fila en la tabla Riesgo.');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
        })
      }})
    }
  }

  refrescarListaRiesgos(id_delito: number){
    /*
    this.riesgoService.getriesgocampos().subscribe(data =>{
      this.RiesgoCamposArray = data;
      for (let i = 0; i < this.RiesgoCamposArray.length; i++) {
        //console.log("this.RiesgoCamposArray[i].nombre: " + this.RiesgoCamposArray[i].nombre);
      }
    })
    */

    console.log( "En refrescarListaRiesgos id_delito=" + id_delito
    )

    if (id_delito > 0 ) {
      console.log( "En refrescarListaCdus/else id_ley=" + id_delito)
      this.riesgoService.getriesgocamposid_delito(id_delito).subscribe(data =>{
        this.RiesgoCamposArray = data;
        for (let i = 0; i < this.RiesgoCamposArray.length; i++) {
          //console.log("this.CduCamposArray[i].nombre: " + this.CduCamposArray[i].nombre);
        }
      })
    } else {
      console.log( "En refrescarListaCdus/else id_delito=" + id_delito)
      this.riesgoService.getriesgocampos().subscribe(data =>{
        this.RiesgoCamposArray = data;
        for (let i = 0; i < this.RiesgoCamposArray.length; i++) {
          
        }
      })
    }

  }

}
