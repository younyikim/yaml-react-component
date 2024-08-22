export interface ParsedYaml {
  components: Record<string, Component>;
  events: Record<string, { payload: string }>;
  hooks?: Record<
    string,
    { args: Record<string, string>; returns: Record<string, string> }
  >;
  styles?: Record<string, { css: string }>;
}
