export type ProjectType = 'small' | 'complete';

export interface IProject {
  translatePrefix: string;
  image: string;
  link: string;
  favorite: boolean;
  type: ProjectType;
  technologies: string[];
}
