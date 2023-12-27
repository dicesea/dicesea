import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "@/utils";
import Content from "@/components/content";

export default function Slug() {
  const router = useRouter();
  const { slug } = router.query;

  const capitalizedSlug =
    typeof slug === "string" ? capitalizeFirstLetter(slug) : "";
  return (
    <Layout>
      <Seo
        title={`Explore ${capitalizedSlug as string} | DiceSea`}
        description="DiceSea is an online marketplace for everyone."
      />
      <Content title={capitalizedSlug as string} description="" />
    </Layout>
  );
}
