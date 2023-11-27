export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() /**
   * DI - Dependency Injection
   */ {}

  execute({ base, limit = 10 }: CreateTableOptions) {
    const arrayTabla = [];

    for (let index = 0; index < limit; index++) {
      const row = `${base} x ${index + 1} = ${base * (index + 1)}`;
      arrayTabla.push(row);
    }

    return arrayTabla.join('\n');
  }
}
