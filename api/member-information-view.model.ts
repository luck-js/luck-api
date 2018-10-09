import {IMemberView} from './member-view.model';
import {IHappeningView} from './happening-view.model';

export interface IMemberInformationView {
    member: IMemberView,
    happening: IHappeningView
}
