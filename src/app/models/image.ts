export interface Image {
    id: string;
    path: string;
    label: string;
    annotations: Array<string>;
    busy: boolean;
 }