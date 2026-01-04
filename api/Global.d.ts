// global.d.ts
import '@playwright/test';

declare module '@playwright/test' {
  interface TestFixtures {
    token: string;
  }
}
