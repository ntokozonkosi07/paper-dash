import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { DevOverviewComponent }   from './dev-overview/dev-overview.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { ApprovalDashComponent } from './approval-dash/approval-dash.component';

export const AppRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'developments', loadChildren: './dev-overview/dev-overview.module#DevOverviewModule' },
    { path: 'dev-approval', component: ApprovalDashComponent },
    { path: 'devs-approval', loadChildren: './approval-dev-overview/approval-dev-overview.module#ApprovalDevOverviewModule' },
    // { path: 'typography', component: TypographyComponent },
    // { path: 'icons', component: IconsComponent },
    // { path: 'maps', component: MapsComponent },
    // { path: 'notifications', component: NotificationsComponent },
    // { path: 'upgrade', component: UpgradeComponent }
]
