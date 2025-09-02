import { Layout, Navbar } from 'nextra-theme-docs';
import { Banner } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';
import './globals.css';
import type { PageMapItem } from 'nextra';

export const metadata = {
  title: 'Finance Tracker Docs',
  description:
    'Documentation for Finance Tracker - manage your expenses, income, and budgets',
};

const banner = (
  <Banner storageKey="finance-tracker-banner">
    Finance Tracker v1.0 released 🚀 Track your finances like a pro!
  </Banner>
);

const navbar = (
  <Navbar logo={<b style={{ color: '#10b981' }}>FinanceTracker</b>} />
);

export default async function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let pageMap: any[] = await getPageMap();

  const order: string[] = [
    'docs',
    'index',
    'categories',
    'transaction',
    'login',
    'register',
  ];

  pageMap = order
    .map(key => {
      const page = pageMap.find(p => p.name === key);
      if (page) {
        if (page.name === 'index') {
          page.title = 'Dashboard';
        }
      }
      return page;
    })
    .filter((p): p is PageMapItem => Boolean(p));

  return (
    <Layout
      banner={banner}
      navbar={navbar}
      pageMap={pageMap}
      footer={undefined}
      sidebar={{ defaultMenuCollapseLevel: 1, defaultOpen: true }}
      search={<></>}
      editLink={<></>}
      docsRepositoryBase={
        'https://github.com/alokrajmindfire/finance_tracker_next'
      }
    >
      {children}
    </Layout>
  );
}
