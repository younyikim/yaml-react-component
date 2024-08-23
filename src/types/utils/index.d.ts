export interface Component {
  props?: Record<string, string>;
  state?: Record<string, string>;
  children?: string[];
  lazyLoad?: boolean;
  /**
   * 컴포넌트의 구독 항목
   * 이벤트와 해당 이벤트 발생 시, 수행할 액션을 정의하는 객체
   */
  subscriptions?: Array<{ event: string; action: string }>;
  /**
   * 컴포넌트의 발행 항목
   * 컴포넌트가 발생하는 이벤트의 이름을 배열로 나열
   */
  publications?: string[];
}

export interface ParsedYaml {
  components: Record<string, Component>;
  events?: Record<string, { payload: string }>;
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
  template: string;
}
