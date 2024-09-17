export interface Component {
  props?: Record<string, string>;
  state?: Record<string, string>;
  children?: string[];
  lazyLoad?: boolean;
}

export interface ParsedYaml {
  components: Record<string, Component>;
  hooks?: Record<
    string,
    { args: Record<string, string>; returns: Record<string, string> }
  >;
  styles?: Record<string, { css: string }>;
}

export interface GeneratedTemplate {
  componentDirPath: string;
  componentFilePath: string;
  componentStylePath: string;
  componentStyle: string;
  typeFilePath: string;
  typeStatement: string;
  template: string;
}
