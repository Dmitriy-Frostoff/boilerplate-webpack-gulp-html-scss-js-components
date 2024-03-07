// cach entry e.g. ./book1.png : "src/assets/images/png/favorites/book1.56af.png"
// filename : filenameAfterBundleWithHash
const cache = {};

// https://webpack.js.org/guides/dependency-management/#context-module-api
// to demand webpack use all files in folder in the final bundle
function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)));
}

importAll(
  require.context(
    "../../../assets/images/png/favorites/",
    true,
    /\.(png|jpeg|jpg)$/
  )
);

export default function getCashedFilename(cacheObject, keyRegExp, valueRegExp) {
  const uncachedKeysArr = Object.keys(cacheObject).map((key) =>
    key.match(keyRegExp).toString()
  );
  const cachedValuesArr = Object.values(cacheObject).map((value) =>
    value.match(valueRegExp).toString()
  );
  const resultObj = {};

  for (let i = 0; i < uncachedKeysArr.length; i++) {
    resultObj[uncachedKeysArr[i]] = cachedValuesArr[i];
  }

  return resultObj;
}

const dictionaryUncachedCachedFilenames = getCashedFilename(
  cache,
  /book\d+\.(png|jpeg|jpg|gif|svg)/gi,
  /book\d+\.[a-z\d]+\.(png|jpeg|jpg|gif|svg)/gi
);

export function sliderHandler() {
  class BookCard {
    _buttonInnerUnBought = "Buy";
    _buttonInnerOwn = "Own";

    constructor(bookTitle, author, annotation, imagePath) {
      this._bookTitle = bookTitle;
      this._author = author;
      this._annotation = annotation;
      this._imagePath = imagePath;
    }

    title() {
      return this._bookTitle;
    }

    author() {
      return this._author;
    }

    annotation() {
      return this._annotation;
    }

    imagePath() {
      return `${this._imagePath}`;
    }

    alt() {
      return `${this._bookTitle} ${this._author}`;
    }
  }

  const seasonBookStorage = {
    winter: [
      new BookCard(
        "The Book Eaters",
        "By Sunyi Dean",
        "An unusual sci-fi story about a book eater woman who tries desperately to save her dangerous mind-eater son from tradition and certain death. Complete with dysfunctional family values, light Sapphic romance, and a strong, complex protagonist. Not for the faint of heart.       ",
        `${dictionaryUncachedCachedFilenames["book1.png"]}`
      ),
      new BookCard(
        "Cackle",
        "By Rachel Harrison",
        "Are your Halloween movies of choice The Witches of Eastwick and Practical Magic? Look no further than here - where a woman recovering from a breakup moves to a quaint town in upstate New York and befriends a beautiful witch.",
        `${dictionaryUncachedCachedFilenames["book2.png"]}`
      ),
      new BookCard(
        "Dante: Poet of the Secular World",
        "By Erich Auerbach",
        "Auerbach's engaging book places the 'Comedy' within the tradition of epic, tragedy, and philosophy in general, arguing for Dante's uniqueness as one who raised the individual and his drama of soul into something of divine significance—an inspired introduction to Dante's main themes.",
        `${dictionaryUncachedCachedFilenames["book3.png"]}`
      ),
      new BookCard(
        "The Last Queen",
        "By Clive Irving",
        "A timely and revelatory new biography of Queen Elizabeth (and her family) exploring how the Windsors have evolved and thrived as the modern world has changed around them.",
        `${dictionaryUncachedCachedFilenames["book4.png"]}`
      ),
    ],
    spring: [
      new BookCard(
        "The Body",
        "By Stephen King",
        "Powerful novel that takes you back to a nostalgic time, exploring both the beauty and danger and loss of innocence that is youth.",
        `${dictionaryUncachedCachedFilenames["book5.png"]}`
      ),
      new BookCard(
        "Carry: A Memoir of Survival on Stolen Land",
        "By Toni Jenson",
        `This memoir about the author's relationship with gun violence feels both expansive and intimate, resulting in a lyrical indictment of the way things are.`,
        `${dictionaryUncachedCachedFilenames["book6.png"]}`
      ),
      new BookCard(
        "Days of Distraction",
        "By Alexandra Chang",
        `A sardonic view of Silicon Valley culture, a meditation on race, and a journal of displacement and belonging, all in one form-defying package of spare prose.`,
        `${dictionaryUncachedCachedFilenames["book7.png"]}`
      ),
      new BookCard(
        "Dominicana",
        "By Angie Cruz",
        `A fascinating story of a teenage girl who marries a man twice her age with the promise to bring her to America. Her marriage is an opportunity for her family to eventually immigrate. For fans of Isabel Allende and Julia Alvarez.`,
        `${dictionaryUncachedCachedFilenames["book8.png"]}`
      ),
    ],
    summer: [
      new BookCard(
        "Crude: A Memoir",
        "By Pablo Fajardo & Sophie Tardy-Joubert",
        `Drawing and color by Damien Roudeau | This book illustrates the struggles of a group of indigenous Ecuadoreans as they try to sue the ChevronTexaco company for damage their oil fields did to the Amazon and her people`,
        `${dictionaryUncachedCachedFilenames["book9.png"]}`
      ),
      new BookCard(
        "Let My People Go Surfing",
        "By Yvon Chouinard",
        `Chouinard—climber, businessman, environmentalist—shares tales of courage and persistence from his experience of founding and leading Patagonia, Inc. Full title: Let My People Go Surfing: The Education of a Reluctant Businessman, Including 10 More Years of Business Unusual.`,
        `${dictionaryUncachedCachedFilenames["book10.png"]}`
      ),
      new BookCard(
        "The Octopus Museum: Poems",
        "By Brenda Shaughnessy",
        `This collection of bold and scathingly beautiful feminist poems imagines what comes after our current age of environmental destruction, racism, sexism, and divisive politics.`,
        `${dictionaryUncachedCachedFilenames["book11.png"]}`
      ),
      new BookCard(
        "Shark Dialogues: A Novel",
        "By Kiana Davenport",
        `An epic saga of seven generations of one family encompasses the tumultuous history of Hawaii as a Hawaiian woman gathers her four granddaughters together in an erotic tale of villains and dreamers, queens and revolutionaries, lepers and healers.`,
        `${dictionaryUncachedCachedFilenames["book12.png"]}`
      ),
    ],
    autumn: [
      new BookCard(
        "Casual Conversation",
        "By Renia White",
        `White's impressive debut collection takes readers through and beyond the concepts of conversation and the casual - both what we say to each other and what we don't, examining the possibilities around how we construct and communicate identity. `,
        `${dictionaryUncachedCachedFilenames["book13.png"]}`
      ),
      new BookCard(
        "The Great Fire",
        "By Lou Ureneck",
        `The harrowing story of an ordinary American and a principled Naval officer who, horrified by the burning of Smyrna, led an extraordinary rescue effort that saved a quarter of a million refugees from the Armenian Genocide`,
        `${dictionaryUncachedCachedFilenames["book14.png"]}`
      ),
      new BookCard(
        "Rickey: The Life and Legend",
        "By Howard Bryant",
        `With the fall rolling around, one can't help but think of baseball's postseason coming up! And what better way to prepare for it than reading the biography of one of the game's all-time greatest performers, the Man of Steal, Rickey Henderson?`,
        `${dictionaryUncachedCachedFilenames["book15.png"]}`
      ),
      new BookCard(
        "Slug: And Other Stories",
        "By Megan Milks",
        `Exes Tegan and Sara find themselves chained together by hairballs of codependency. A father and child experience the shared trauma of giving birth to gods from their wounds.`,
        `${dictionaryUncachedCachedFilenames["book16.png"]}`
      ),
    ],
  };

  // classNames && IDs
  // ============================
  const wholeBookContainerClassName = "book__container";
  const wholeBookContainerInvisibleClassName = "book__container_invisible";

  const radioButtonsContainerClassName = "favorites__checker-radio-container";
  const labelRadioButtonClassName = "favorites__checker-btn-container";

  const bookCardContainerClassName = "book__content-container";
  const bookAnnotationClassName = "book__paragraph";
  const bookImageClassName = "book__content-preview";
  const buyButtonCommonClassName = "book__button";

  // Elements
  // ============================
  const wholeBookContainers = document.querySelectorAll(
    `.${wholeBookContainerClassName}`
  );
  const radioButtonsContainer = document.querySelector(
    `.${radioButtonsContainerClassName}`
  );
  const bookCardTitles = document.querySelectorAll(
    `.${bookCardContainerClassName} > :nth-child(2) > :nth-child(1)`
  );
  const bookCardAuthors = document.querySelectorAll(
    `.${bookCardContainerClassName} > :nth-child(2) > :nth-child(2)`
  );
  const bookCardImages = document.querySelectorAll(`.${bookImageClassName}`);
  const bookCardAnnotations = document.querySelectorAll(
    `.${bookAnnotationClassName}`
  );
  const bookCarduyButtons = document.querySelectorAll(
    `.${buyButtonCommonClassName}`
  );

  // Abstract variables
  // ============================
  const regExpBookFilename = /book\d{1,}.{4,}/gi;
  const timeoutDurationMSForBookCardAction = 432;

  function addBookCardOpacity(wholeBookContainers) {
    wholeBookContainers.forEach((bookContainer) =>
      bookContainer.classList.add(`${wholeBookContainerInvisibleClassName}`)
    );
  }

  function removeBookCardOpacity(wholeBookContainers) {
    wholeBookContainers.forEach((bookContainer) =>
      bookContainer.classList.remove(`${wholeBookContainerInvisibleClassName}`)
    );
  }

  function changeBookCardTitle(arrayOfSeasonBooksData) {
    bookCardTitles.forEach(
      (title, index) =>
        (title.innerText = arrayOfSeasonBooksData[index].title())
    );
  }

  function changeBookCardAuthor(arrayOfSeasonBooksData) {
    bookCardAuthors.forEach(
      (author, index) =>
        (author.innerText = arrayOfSeasonBooksData[index].author())
    );
  }

  function changeBookCardAltField(arrayOfSeasonBooksData) {
    bookCardImages.forEach(
      (image, index) => (image.alt = arrayOfSeasonBooksData[index].alt())
    );
  }

  function changeBookCardAnnotation(arrayOfSeasonBooksData) {
    bookCardAnnotations.forEach(
      (annotaion, index) =>
        (annotaion.innerText = arrayOfSeasonBooksData[index].annotation())
    );
  }

  function changeBookCardImage(arrayOfSeasonBooksData) {
    // 'http://127.0.0.1:8080/src/assets/images/png/favorites/book1.png' =>
    // 'http://127.0.0.1:8080/src/assets/images/png/favorites/'
    const absoluteImagePass = bookCardImages[0].src.replace(
      regExpBookFilename,
      ""
    );
    bookCardImages.forEach((image, index) => {
      image.src = `${absoluteImagePass}${arrayOfSeasonBooksData[
        index
      ].imagePath()}`;
    });
  }

  function slider(event) {
    if (event.target.closest(`.${labelRadioButtonClassName}`)) {
      // winter, spring, summer or automn
      const clickedSeasonButtonValue = event.target.value.toLowerCase();
      // e.g. seasonBookStorage[winter] = [{book1Data}, {book2Data}, {book3Data}, {book4Data}]
      // data: bookTitle, author, annotation, imagePath for book card
      const arrayOfSeasonBooksData =
        seasonBookStorage[clickedSeasonButtonValue];

      addBookCardOpacity(wholeBookContainers);

      setTimeout(() => {
        removeBookCardOpacity(wholeBookContainers);

        changeBookCardTitle(arrayOfSeasonBooksData);
        changeBookCardAuthor(arrayOfSeasonBooksData);
        changeBookCardAltField(arrayOfSeasonBooksData);
        changeBookCardAnnotation(arrayOfSeasonBooksData);
        changeBookCardImage(arrayOfSeasonBooksData);
      }, timeoutDurationMSForBookCardAction);
    }
  }

  radioButtonsContainer.addEventListener("change", slider);
}
