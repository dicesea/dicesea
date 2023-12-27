import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import Content from "@/components/content";

export default function Profile() {
  return (
    <Layout>
      <Seo
        title="Profile | DiceSea"
        description="DiceSea is an online marketplace for everyone."
      />
      <Content title="Profile" description="" />
    </Layout>
  );
}
