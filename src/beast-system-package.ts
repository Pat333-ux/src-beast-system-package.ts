// Beast-System-3-Core/src/beast-system-package.ts

import { createBeastActivationKernel } from "./activation-kernel";

export interface BeastPackageConfig {
  apiPort: number;
  identityId: string;
  autoStart: boolean;
  apiUrl: string;
}

export class BeastSystemPackage {
  private kernel: any;

  constructor(
    private config: BeastPackageConfig,
    private engines: Record<string, any>
  ) {}

  public build(): void {
    console.log("[BeastPackage] Assembling Beast System 3.0…");

    this.kernel = createBeastActivationKernel(
      {
        apiPort: this.config.apiPort,
        identityId: this.config.identityId,
        autoStart: this.config.autoStart
      },
      this.engines,
      this.config.apiUrl
    );

    console.log("[BeastPackage] Build complete.");
  }

  public start(): void {
    if (!this.kernel) {
      console.log("[BeastPackage] System not built. Building now…");
      this.build();
    }

    console.log("[BeastPackage] Launching Beast System 3.0…");
    this.kernel.activate(this.config.identityId);
  }

  public async render(view: string): Promise<string> {
    return await this.kernel.render(view, this.config.identityId);
  }

  public summarize(): string {
    return "Beast System Package: unified build + activation + render pipeline";
  }
}

export function createBeastSystemPackage(
  config: BeastPackageConfig,
  engines: Record<string, any>
): BeastSystemPackage {
  return new BeastSystemPackage(config, engines);
}
