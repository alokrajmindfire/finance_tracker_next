import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Banner } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';

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
  <Navbar
    logo={<b style={{ color: '#10b981' }}>FinanceTracker</b>}

    // optional: add extra nav links
    // projectLink=
    // links={[
    //   { href: '/dashboard', name: 'Dashboard' },
    //   { href: '/transaction/overview', name: 'Transactions' },
    // ]}
  />
);

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} © Finance Tracker. Built with ❤️ by Alok.
  </Footer>
);

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Layout
      banner={banner}
      navbar={navbar}
      pageMap={await getPageMap()}
      footer={footer}
      sidebar={{ defaultMenuCollapseLevel: 1 }}
    >
      {children}
    </Layout>
  );
}
