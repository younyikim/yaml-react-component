
      interface DashboardProps { user: Record<string, any>; children: React.ReactNode }
  interface DashboardState { data: Record<string, any>; loading: boolean }

interface HeaderProps { title: string; user: Record<string, any>; children: React.ReactNode }
  interface HeaderState {}

interface UserMenuProps { user: Record<string, any>; menuItems: any[] }
  interface UserMenuState { isOpen: boolean }

interface MainContentProps { user: Record<string, any>; children: React.ReactNode }
  interface MainContentState { posts: any[]; loading: boolean }

interface PostListProps { posts: any[] }
  interface PostListState {}

interface PostDetailsProps { post: Record<string, any> }
  interface PostDetailsState {}

interface FooterProps { year: number; links: any[] }
  interface FooterState {}
      
      interface DATA_LOADEDEvent { payload: Record<string, any> }
interface TOGGLE_MENUEvent { payload: void }
interface LOAD_POSTSEvent { payload: Record<string, any> }
interface POST_SELECTEDEvent { payload: Record<string, any> }
interface DASHBOARD_LOADEDEvent { payload: void }
interface HEADER_CLICKEDEvent { payload: void }
interface MENU_TOGGLEDEvent { payload: void }
interface USER_PROFILE_VIEWEDEvent { payload: void }
interface USER_DETAILS_EDITEDEvent { payload: Record<string, any> }
    