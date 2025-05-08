import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // Importar animaciones
import { AppComponent } from './app/app.component';

import { appConfig } from './app/app.config';

// Combinar configuración existente con animaciones
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideAnimations() // Habilitar animaciones
  ]
}).catch((err) => console.error(err));
