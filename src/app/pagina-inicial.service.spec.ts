import { TestBed } from '@angular/core/testing';

import { PaginaInicialService } from './pagina-inicial.service';

describe('PaginaInicialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaginaInicialService = TestBed.get(PaginaInicialService);
    expect(service).toBeTruthy();
  });
});
