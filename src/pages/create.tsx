import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import Content from "@/components/content";

export default function Create() {
  return (
    <Layout>
      <Seo
        title="Create | DiceSea"
        description="DiceSea is an online marketplace for everyone."
      />
      <Content title="Create" description="" />
    </Layout>
  );
}
