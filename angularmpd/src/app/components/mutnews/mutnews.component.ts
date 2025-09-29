import { Component } from '@angular/core';
import { MutnewsService } from '../../services/mutnews.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mutnews',
  templateUrl: './mutnews.component.html',
  styleUrls: ['./mutnews.component.css']
})
export class MutnewsComponent {
  inputText = '';
  prediction: string | null = null;
  probabilities: { [key: string]: number } = {};
  loading = false;
  error = '';

  constructor(private mutnewsService: MutnewsService,
              private activerouter: ActivatedRoute) {}

  enviar() {
    this.loading = true;
    this.error = '';
    this.prediction = null;
    this.probabilities = {};

    if (!this.inputText.trim()) {
      this.loading = false;
      return;
    }

    const payload = { chatInput: this.inputText };

    this.mutnewsService.postmutnews(payload).subscribe({
      next: (res) => {
        console.log('res:', res);

        // Prediction es texto
        this.prediction = res.predictions[0];

        // Probabilities es un objeto dentro de un array
        this.probabilities = res.probabilities[0];

        this.loading = false;
        this.inputText = ''; // limpiar input
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
        this.error = 'Error al procesar la solicitud.';
        this.loading = false;
      }
    });
  }
}

