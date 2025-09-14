import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RuntimeConfigService } from './app/services/runtime-config.service';
import { AppModule } from './app/app.module';

const configService = new RuntimeConfigService();

configService.loadConfig().then(() => {
  platformBrowserDynamic([{ provide: RuntimeConfigService, useValue: configService }])
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
