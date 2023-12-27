import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import Content from "@/components/content";

export default function Home() {
  return (
    <Layout>
      <Seo
        title="DiceSea, the online marketplace for everyone"
        description="DiceSea is an online marketplace for everyone."
      />
      <Content title="DiceSea" description="" />
    </Layout>
  );
}
