import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthActions, PoolActions, PoolSelectors, RoleEnrolmentSelectors } from '@state';
import { LoginService } from 'src/app/shared/services/login/login.service';
import * as poolSelectors from '../../../state/pool/pool.selectors';
import { EnvService } from '../../../shared/services/env/env.service';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.scss']
})
export class TermsComponent {

}
