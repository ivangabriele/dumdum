const R = require("ramda");

module.exports = [
  {
    name: "en",
    resources: [
      {
        title: "Anna Karenina",
        uri: "https://www.gutenberg.org/files/1399/1399-0.txt",
        startValue: /^Chapter 1/m,
        endValue: /^End of The Project/m
      },
      {
        title: "War and Peace",
        uri: "https://www.gutenberg.org/files/2600/2600-0.txt",
        startValue: /^CHAPTER I/m,
        endValue: /^End of the Project/m
      },
      {
        title: "What Men Live By and Other Tales",
        uri: "https://www.gutenberg.org/files/6157/6157-0.txt",
        startValue: /^WHAT MEN LIVE BY/m,
        endValue: /^Notes:/m
      },
      {
        title: "The Kreutzer Sonata and Other Stories",
        uri: "https://www.gutenberg.org/files/689/689-0.txt",
        startValue: /^CHAPTER I\.$/m,
        endValue: /^End of the Project/m
      },
      {
        title: "Childhood",
        uri: "https://www.gutenberg.org/files/2142/2142-0.txt",
        startValue: /^I -- THE TUTOR, KARL IVANITCH$/m,
        endValue: /^End of the Project/m
      },
      {
        title: "Sevastopol",
        uri: "https://www.gutenberg.org/files/47197/47197-0.txt",
        startValue: /^SEVASTOPOL IN DECEMBER, 1854\.$/m,
        endValue: /^PUBLICATIONS$/m
      },
      {
        title: "Boyhood",
        uri: "https://www.gutenberg.org/files/2450/2450-0.txt",
        startValue: /^I. A SLOW JOURNEY$/m,
        endValue: /^End of the Project/m
      },
      {
        title: "Resurrection",
        uri: "https://www.gutenberg.org/files/1938/1938-0.txt",
        startValue: /^CHAPTER I\.$/m,
        endValue: /^End of the Project/m
      },
      {
        title: "Master and Man",
        uri: "https://www.gutenberg.org/files/986/986-0.txt",
        startValue: /^I$/m,
        endValue: /^End of the Project/m
      },
      {
        title: "The Forged Coupon and Other Stories",
        uri: "https://www.gutenberg.org/files/243/243-0.txt",
        startValue: /^PART FIRST$/m,
        endValue: /^End of Project/m
      },
      {
        title: "Youth",
        uri: "https://www.gutenberg.org/files/2637/2637-0.txt",
        startValue: /^I\. WHAT I CONSIDER TO HAVE BEEN THE BEGINNING OF MY YOUTH$/m,
        endValue: /^End of the Project/m
      },
      {
        title: "The Awakening",
        uri: "http://www.gutenberg.org/cache/epub/17352/pg17352.txt",
        startValue: /^CHAPTER I\.$/m,
        endValue: /^THE END\.$/m
      },
      {
        title: "Crime and Punishment",
        uri: "https://www.gutenberg.org/files/2554/2554-0.txt",
        startValue: /^PART I$/m,
        endValue: /^End of Project/m
      },
      {
        title: "The Brothers Karamazov",
        uri: "https://www.gutenberg.org/files/28054/28054-0.txt",
        startValue: /^PART I$/m,
        endValue: /^THE END$/m
      },
      {
        title: "Notes from the Underground",
        uri: "http://www.gutenberg.org/cache/epub/600/pg600.txt",
        startValue: /^I$/m,
        endValue: /^End of Project/m
      }
    ],
    postNormalizer: source => source
  },
  {
    name: "fr",
    resources: [
      {
        title: "La guerre et la paix (Tome I)",
        uri: "http://www.gutenberg.org/cache/epub/17949/pg17949.txt",
        startValue: /^CHAPITRE PREMIER/m,
        endValue: /^FIN DU PREMIER VOLUME/m
      },
      {
        title: "La guerre et la paix (Tome II)",
        startValue: /^CHAPITRE PREMIER/m,
        uri: "http://www.gutenberg.org/cache/epub/17950/pg17950.txt",
        endValue: /^FIN DU DEUXIÈME VOLUME/m
      },
      {
        title: "La guerre et la paix (Tome III)",
        uri: "http://www.gutenberg.org/cache/epub/17951/pg17951.txt",
        startValue: /^CHAPITRE PREMIER/m,
        endValue: /^FIN/m
      }
    ],
    postNormalizer: R.pipe(
      R.split(/\n+/),
      R.map(value => {
        switch (true) {
          case value.startsWith("--«") && value.includes("»"):
            return value.substr(2);

          case value.startsWith("--") && value.endsWith("»"):
            return `«${value.substr(2)}`;

          case value.startsWith("--") && !value.endsWith("»"):
            return `«${value.substr(2)}»`;

          case value.startsWith("«") && !value.endsWith("»"):
            return `${value.substr(2)}»`;

          default:
            return value;
        }
      }),
      R.join("\n\n"),
      R.replace(/([^\s])(!|\?|;|:)/g, "$1 $2")
    )
  }
];
