import { social } from "@/utils";
import Head from "next/head";

interface IProps {
  title: string;
  description: string;
}

const Seo = ({ title, description }: IProps) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="favicon.ico" />
      <link rel="canonical" href="https://dicesea.io" />

      <meta name="description" content={description} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon-16x16.png"
      />
      <link rel="manifest" href="/images/site.webmanifest" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={social.cover} />
      <meta property="og:url" content="https://dicesea.io" />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
};

export { Seo };
