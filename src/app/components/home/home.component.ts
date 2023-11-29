import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public mobileQuery: MediaQueryList;
  public panelOpened: boolean = true;
  private _mobileQueryListener: () => void;

  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher,
  ) {
    iconRegistry.addSvgIcon(
      'wf-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/zScripts_WF_Icon.svg'));
    this.mobileQuery = this.media.matchMedia('(max-width: 1024px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
  }

  // public async filterChanged(filter: FilterModel) {
  //   this.invoicesService.filterChangesAccures.next(filter);
  // }

  public filterChanged(filter: any) {
    console.log(`filter changed: ${filter}`);
  }

}
