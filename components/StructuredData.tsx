const siteUrl = "https://mayank-devlabs.netlify.app";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Mayank DevLabs",
        alternateName: "Mayank Kumar Developer Portfolio",
        description:
          "Developer portfolio of Mayank Kumar featuring MERN applications, AI-powered tools, secure platforms, and modern web experiences.",
        inLanguage: "en-IN",
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: siteUrl,
        name: "Mayank Kumar | Full-Stack Developer",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        mainEntity: {
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: "Mayank Kumar",
          url: siteUrl,
          image: `${siteUrl}/avatar.png`,
          jobTitle: "Full-Stack Developer",
          description:
            "Full-stack developer building MERN applications, AI-powered tools, secure platforms, and creative web experiences.",
          knowsAbout: [
            "Full-Stack Web Development",
            "MERN Stack",
            "React",
            "Next.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "TypeScript",
            "Artificial Intelligence",
            "Cybersecurity",
          ],
          sameAs: ["https://github.com/mayank544"],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}