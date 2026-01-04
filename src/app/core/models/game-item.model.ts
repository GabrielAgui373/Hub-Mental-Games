import { ThemeType } from "../services/theme/theme.service";

export interface GameItem {
  id: string;
  title: string;
  description: string;
  details: string;
  route: string;
  theme: ThemeType;
}