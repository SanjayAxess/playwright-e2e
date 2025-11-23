import fs from 'fs';
import { PNG } from 'pngjs';
import { expect, Page } from "@playwright/test";

export class VisualTestActions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async compareAndUpdateBaseline(
        page: Page,
        baselineImagePath: string,
        currentImagePath: string,
        diffImagePath: string,
        pixelDiffThreshold: number = 100,
        comparisonThreshold: number = 0.1,
        clipRegion?: { x: number; y: number; width: number; height: number }
    ): Promise<void> {
        const pixelmatch = (await import('pixelmatch')).default;
        const screenshot = await page.screenshot({
            path: currentImagePath,
            clip: clipRegion,
        });
        if (!fs.existsSync(baselineImagePath)) {
            fs.writeFileSync(baselineImagePath, screenshot);
            console.log('Baseline image created.');
            return;
        }
        const baselineImage = PNG.sync.read(fs.readFileSync(baselineImagePath));
        const currentImage = PNG.sync.read(screenshot);
        const { width, height } = baselineImage;
        const diff = new PNG({ width, height });
        const numDiffPixels = pixelmatch(
            baselineImage.data,
            currentImage.data,
            diff.data,
            width,
            height,
            { threshold: comparisonThreshold }
        );

        if (numDiffPixels > pixelDiffThreshold) {
            fs.writeFileSync(diffImagePath, PNG.sync.write(diff));
            console.log(`Number of different pixels: ${numDiffPixels}`);
            expect(numDiffPixels, `Visual difference exceeds threshold. See ${diffImagePath} for details.`).toBeLessThanOrEqual(pixelDiffThreshold);
        } else {
            console.log('No significant differences found. Baseline image remains unchanged.');
        }
    }
}