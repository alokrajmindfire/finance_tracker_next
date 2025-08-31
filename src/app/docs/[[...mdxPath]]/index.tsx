import { importPage } from 'nextra/pages';

export async function generateMetadata(props: any) {
  const params = await props.params;
  const mdxPath = params?.mdxPath?.length ? params.mdxPath : ['index'];
  const { metadata } = await importPage(mdxPath);
  return metadata;
}

export default async function Page(props: any) {
  const params = await props.params;
  const mdxPath = params?.mdxPath?.length ? params.mdxPath : ['index'];
  const result = await importPage(mdxPath);
  const { default: MDXContent } = result;

  return (
    <article className="">
      <MDXContent />
    </article>
  );
}
