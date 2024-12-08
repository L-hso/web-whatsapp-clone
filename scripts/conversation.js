import { make } from "./utils.js"

export default class Conversation {
  static create(data, dropdownCreate) {
    const conversationBlock = make("li");
    conversationBlock.classList.add("conversation_block");
    conversationBlock.dataset.id = data.id;

    const conversationPfpContainer = make("div");
    conversationPfpContainer.classList.add("conversation_pfp");

    const pfp = make("img");
    pfp.src = data.pfp;

    conversationPfpContainer.appendChild(pfp);

    const conversationInfo = make("hgroup");

    const conversationInfoTopside = make("div");
    conversationInfoTopside.classList.add("top_text");

    const conversationName = make("span");
    conversationName.classList.add("conversation_name");
    conversationName.innerText = data.name;

    const conversationDate = make("span");
    conversationDate.classList.add("conversation_date");
    conversationDate.innerText = data.date;

    conversationInfoTopside.append(conversationName, conversationDate);

    const conversationInfoBottomside = make("div");
    conversationInfoBottomside.classList.add("bottom_text");

    const conversationLastMessage = make("div");
    conversationLastMessage.classList.add("conversation_lastmsg");

    conversationLastMessage.innerHTML += `
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--gray-6)">
        <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" />
    </svg><span>${data.lastMessage}</span>`;

    const conversationOptions = make("button");
    conversationOptions.classList.add("conversation_options");

    conversationOptions.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  fill="var(--gray-6)">
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>`;

    conversationOptions.addEventListener("click", (e) => {
      dropdownCreate(e, {
        x: e.currentTarget.getBoundingClientRect().x,
        y: e.currentTarget.getBoundingClientRect().y,
        marginX: "1.5",
        marginY: "1.5",
      });
    });

    conversationInfoBottomside.append(
      conversationLastMessage,
      conversationOptions
    );

    conversationInfo.append(
      conversationInfoTopside,
      conversationInfoBottomside
    );

    conversationBlock.append(conversationPfpContainer, conversationInfo);

    return conversationBlock;
  }
}
