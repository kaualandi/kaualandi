export type ProjectType = 'small' | 'complete';

export interface IProject {
  title: string;
  description: string;
  image: string;
  link: string;
  favorite: boolean;
  type: ProjectType;
  technologies: string[];
}
