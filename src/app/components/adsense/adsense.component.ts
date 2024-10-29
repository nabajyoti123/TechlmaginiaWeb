import { Component, Input, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

@Component({
  selector: 'app-adsense',
  template: `
    <div class="ad-container" [style.min-height.px]="height || 250" [style.min-width.px]="width || 300">
      <ins class="adsbygoogle"
           [style.display]="'block'"
           [style.width.px]="width || 300"
           [style.height.px]="height || 250"
           [style.background]="'#f1f1f1'"
           [attr.data-ad-client]="adClient"
           [attr.data-ad-slot]="adSlot"
           [attr.data-ad-format]="adFormat"
           [attr.data-full-width-responsive]="responsive">
      </ins>
      <div *ngIf="!adLoaded" class="ad-placeholder">
        <span class="ad-text">Advertisement</span>
      </div>
    </div>
  `,
  styles: [`
    .ad-container {
      position: relative;
      margin: 10px 0;
      background: #f1f1f1;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ddd;
    }
    .ad-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ad-text {
      color: #666;
      font-size: 12px;
      font-family: Arial, sans-serif;
    }
  `]
})
export class AdsenseComponent implements AfterViewInit, OnDestroy {
  @Input() adClient: string = 'ca-pub-7640562161899788';
  @Input() adSlot: string = '7259870550';
  @Input() adFormat: string = 'auto';
  @Input() responsive: boolean = true;
  @Input() height?: number;
  @Input() width?: number;

  adLoaded: boolean = false;
  private adLoadAttempts: number = 0;
  private maxAttempts: number = 3;
  private timeoutId?: number;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // Wait for a short delay before initializing ads
    setTimeout(() => {
      this.loadAd();
    }, 100);
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
  }

  private loadAd() {
    if (this.adLoadAttempts >= this.maxAttempts) {
      console.warn('Failed to load AdSense ad after maximum attempts');
      return;
    }

    try {
      if (typeof window !== 'undefined') {
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }
        
        window.adsbygoogle.push({});
        
        // Check if ad loaded
        this.timeoutId = window.setTimeout(() => {
          const insElement = this.elementRef.nativeElement.querySelector('ins.adsbygoogle');
          if (insElement && insElement.innerHTML.trim() !== '') {
            this.adLoaded = true;
            console.log('Ad loaded successfully');
          } else {
            console.log('Ad not loaded, retrying...');
            this.adLoadAttempts++;
            this.loadAd();
          }
        }, 2000);
      }
    } catch (e) {
      console.error('AdSense error:', e);
      this.adLoadAttempts++;
      this.timeoutId = window.setTimeout(() => {
        this.loadAd();
      }, 1000);
    }
  }
} 