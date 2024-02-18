import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RedirectService } from 'src/app/core/services';


@Component({
  selector: 'ax-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLayoutComponent implements OnInit {

  constructor(private redirectService: RedirectService) {}

  ngOnInit(): void {
    this.redirectService.navigateOnLogin();
  }

}
