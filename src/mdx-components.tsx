import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { Search } from 'nextra/components';

const docsComponents = getDocsMDXComponents({});

export const useMDXComponents = (components?: any): any => ({
  ...docsComponents,
  ...components,
  // Search:false,
});
