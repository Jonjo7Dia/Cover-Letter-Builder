import Head from "next/head";
const SEO: React.FC = () => {
  return (
    <Head>
      <title key="title">Tailored Application</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href="https://tailoredapplication.com" />

      <meta
        key="description"
        name="description"
        content={
          "TailoredApplication is your one-stop solution for crafting personalized, effective cover letters. Our advanced web application uses the information from your CV to generate custom cover letters tailored to any job application. Stand out from the crowd, captivate employers, and land your dream job with TailoredApplication. Your journey towards a successful job application starts here!"
        }
      />

      <meta key="og:type" property="og:type" content="website" />
      <meta
        key="og:title"
        property="og:title"
        content={"Tailored Applications"}
      />
      <meta
        key="og:description"
        property="og:description"
        content={
          "TailoredApplication is your one-stop solution for crafting personalized, effective cover letters. Our advanced web application uses the information from your CV to generate custom cover letters tailored to any job application. Stand out from the crowd, captivate employers, and land your dream job with TailoredApplication. Your journey towards a successful job application starts here!"
        }
      />
      <meta
        key="og:image"
        property="og:image"
        content={"https://tailoredapplication.com/logoPng.png"}
      />
      <meta
        key="og:url"
        property="og:url"
        content={"https://tailoredapplication.com"}
      />
    </Head>
  );
};

export default SEO;
