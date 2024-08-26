
      export interface DashboardProps { user: Record<string, unknown>; children: React.ReactNode }

export interface HeaderProps { title: string; user: Record<string, unknown>; children: React.ReactNode }

export interface UserMenuProps { user: Record<string, unknown>; menuItems: unknown[] }

export interface MainContentProps { user: Record<string, unknown>; children: React.ReactNode }

export interface PostListProps { posts: unknown[] }

export interface PostDetailsProps { post: Record<string, unknown> }

export interface FooterProps { year: number; links: unknown[] }
      
      export interface EventPayloads { DATA_LOADED: Record<string, unknown>;
TOGGLE_MENU: void;
LOAD_POSTS: Record<string, unknown>;
POST_SELECTED: Record<string, unknown>;
DASHBOARD_LOADED: void;
HEADER_CLICKED: void;
MENU_TOGGLED: void;
USER_PROFILE_VIEWED: void;
USER_DETAILS_EDITED: Record<string, unknown>; }
    