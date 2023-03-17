import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
        <title>Asad&apos;s 5 minutes school</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          href="https://scontent.fjsr8-1.fna.fbcdn.net/v/t39.30808-6/286982359_3185199048404309_7435003285752096986_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFP0GjTL2Mk64W1CGnq1eUoYbpQPp3xfz1hulA-nfF_PQO-kgian-BM-WYzpeeAJiVFbUwo06fzDKtfisY4160n&_nc_ohc=qTt0Bq4W-TcAX-RQXRk&_nc_ht=scontent.fjsr8-1.fna&oh=00_AfBvqjwwBK3O_I_J6-P50TzmvPkvj4gXrc30YmeUA_dTZw&oe=6418EAEA"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
