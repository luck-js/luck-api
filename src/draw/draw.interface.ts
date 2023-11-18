import { NewHappening } from '../happening/happening.interface';
import { DrawLink } from '../draw-link/draw-link.interface';

export interface DrawRecord {
  id: string;
  drawLinkIds: string[];
}

export interface NewDraw {
  drawLinks: DrawLink[];
}

export interface Draw {
  id: string;
  drawLinks: DrawLink[];
}

export interface DrawView {
  id: string;
  name: string;
  description: string;
  members: DrawMemberView[];
}

export interface DrawMemberView {
  name: string;
  uniqueLink: string;
}

export interface NewDrawView extends NewHappening {}
