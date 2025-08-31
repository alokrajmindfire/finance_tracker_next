import { NextConfig } from 'next';
import nextra from 'nextra';

const withNextra = nextra({});

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './src/mdx-components.tsx',
    },
  },
};

export default withNextra(nextConfig);
