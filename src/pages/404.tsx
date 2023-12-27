import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import Content from "@/components/content";

export default function Custom404() {
  return (
    <Layout>
      <Seo
        title="404 | DiceSea"
        description="DiceSea is an online marketplace for everyone."
      />
      <Content title="404" description="" />
    </Layout>
  );
}
