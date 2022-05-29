import {
  HomeLayout,
  Dashboard,
  UploadLayout,
  CheckInCheckOutLayout,
  DownloadLayout,
  ReportDetail,
  ReportOverview,
} from '.';

export default {
  path: '',
  component: HomeLayout,
  role: 'privated',
  childRoutes: [
    { path: 'cico', component: CheckInCheckOutLayout, isIndex: true },
    { path: 'user', component: Dashboard },
    { path: 'upload', component: UploadLayout },
    { path: 'download', component: DownloadLayout },
    { path: 'report-detail', component: ReportDetail },
    { path: 'report-overview', component: ReportOverview },
  ],
};
