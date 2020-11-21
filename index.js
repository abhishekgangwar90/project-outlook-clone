(function () {
  let mailsList = [];
  let selectMail = {};
  let readMailsId = [];

  function convertTimeStampToDate(timestamp) {
    const d = new Date(timestamp);
    return `${d.getDate()} / ${d.getMonth()} / ${d.getUTCFullYear()}
   ${d.getUTCHours()}:${d.getUTCMinutes()}`;
  }

  function renderEmailDetails() {
    // main
    const main = document.querySelector("main");

    // section
    const sectionMailDetails = document.createElement("section");
    sectionMailDetails.classList.add("mail-details");

    // avatar
    const avatar = document.createElement("div");
    avatar.classList.add("avatar");

    const tempSpan = document.createElement("span");
    tempSpan.innerText = "f";
    avatar.appendChild(tempSpan);

    // content
    const content = document.createElement("div");
    content.classList.add("content");

    // content header
    const contentHeader = document.createElement("div");
    //   contentHeader.classList.add("content-header");

    const headerText = document.createElement("div");
    headerText.classList.add("header-text");

    const textSpan = document.createElement("span");
    textSpan.innerText = selectMail.subject;

    const textSpan2 = document.createElement("span");
    textSpan2.innerText = selectMail.date;

    headerText.appendChild(textSpan);
    headerText.appendChild(textSpan2);

    // content text
    debugger;
    const contentText = document.createElement("div");
    contentText.classList.add("content-text");
    contentText.innerHTML = selectMail.data.body;

    contentHeader.appendChild(headerText);

    content.appendChild(contentHeader);
    content.appendChild(contentText);

    //   const article = document.createElement("article");
    sectionMailDetails.appendChild(avatar);
    sectionMailDetails.appendChild(content);

    main.appendChild(sectionMailDetails);
  }

  async function fetchEmailDescription(id) {
    section = {};
    const res = await fetch(
      `https://flipkart-email-mock.now.sh/?id=${id}`
    ).then((res) => res.json());
    selectMail.data = res;
    renderEmailDetails();
  }

  function onArticleClick(mailId, subject, date) {
    const section = document.querySelector(".mail-details");
    if (section) {
      section.remove();
    }
    readMailsId.push(mailId);
    selectMail.subject = subject;
    selectMail.date = date;
    fetchEmailDescription(mailId);
  }

  function renderMails() {
    const mailListContainer = document.querySelector(".mail-list");

    mailsList.forEach((elm) => {
      // creating new Article
      const article = document.createElement("article");
      article.classList.add("mail");
      article.addEventListener("click", function () {
        onArticleClick(elm.id, elm.subject, elm.date);
      });

      //creating avatar
      const avatar = document.createElement("div");
      avatar.classList.add("avatar");

      const avSpan = document.createElement("span");
      avSpan.innerText = "f";
      avatar.appendChild(avSpan);

      //creating info section
      const info = document.createElement("div");
      info.classList.add("info");

      // text-info

      //from
      const fromSection = document.createElement("div");
      fromSection.classList.add("text-info");
      fromSection.innerText = "From :";

      // from child
      const email = document.createElement("span");
      email.innerText = `${elm.from.name} <${elm.from.email}>`;
      fromSection.appendChild(email);

      // subject
      const subJect = document.createElement("div");
      subJect.classList.add("text-info");
      subJect.innerText = "Subject:";

      // subject child
      const subChild = document.createElement("span");
      subChild.innerText = elm.subject;
      subJect.appendChild(subChild);

      // mail text
      const details = document.createElement("div");
      details.classList.add("text-info");
      details.innerText = elm.short_description;

      // mail date
      const dateSection = document.createElement("div");
      dateSection.classList.add("text-info");
      dateSection.innerText = convertTimeStampToDate(elm.date);

      //creating info
      info.appendChild(fromSection);
      info.appendChild(subJect);
      info.appendChild(details);
      info.appendChild(dateSection);

      //creating article
      article.appendChild(avatar);
      article.appendChild(info);

      //adding to list
      mailListContainer.appendChild(article);
    });
  }

  async function fetchEmails() {
    const res = await fetch("https://flipkart-email-mock.now.sh/").then((res) =>
      res.json()
    );
    mailsList = res.list;
    renderMails();
  }

  this.addEventListener("load", fetchEmails);
})(window);
