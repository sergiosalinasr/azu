import { Component } from '@angular/core';
import { MutmlService } from '../../services/mutml.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mutml',
  templateUrl: './mutml.component.html',
  styleUrl: './mutml.component.css'
})

export class MutmlComponent {
  inputText = '';
  prediction: number | null = null;
  probability: number | null = null;
  loading = false;
  error = '';

  constructor(private mutmlService:MutmlService,
      private activerouter:ActivatedRoute
    ) {}

  enviar() {
    this.loading = true;
    this.error = '';
    this.prediction = null;
    this.probability = null;

    if (!this.inputText.trim()) {
      return;
    }

    const payload = {
      chatInput: this.inputText
    };
    console.log("POST: this.selectedN8n: ")

    this.mutmlService.postmutml(payload).subscribe({
              next: (res) => {
        console.error('res.predictions[0]:', res.predictions[0]);
        console.error('res.predictions[0]:', res.probabilities[0]);
        this.prediction = res.predictions[0];
        this.probability = res.probabilities[0];
        this.loading = false;       
        this.inputText = ''; // limpiar input
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
      }
    });
  
  }
}
