export default class Conversation {
  static create(data) {
    const conversationBlock = document.createElement("li");
    conversationBlock.classList.add("conversation_block");
    conversationBlock.dataset.id = data.id;

    const conversationPfpContainer = document.createElement("div");
    conversationPfpContainer.classList.add("conversation_pfp");

    const pfp = document.createElement("img");
    pfp.src = "https://placehold.co/600";

    conversationPfpContainer.appendChild(pfp);

    conversationBlock.appendChild(conversationPfpContainer);

    const conversationInfo = document.createElement("hgroup");

    const conversationInfoTopside = document.createElement("div");
    conversationInfoTopside.classList.add("top_text");

    const conversationName = document.createElement("span");
    conversationName.classList.add("conversation_name");
    conversationName.innerText = data.name;

    const conversationDate = document.createElement("span");
    conversationDate.classList.add("conversation_date");
    conversationDate.innerText = data.date;

    conversationInfoTopside.appendChild(conversationName);
    conversationInfoTopside.appendChild(conversationDate);

    conversationInfo.appendChild(conversationInfoTopside);

    const conversationInfoBottomside = document.createElement("div");
    conversationInfoBottomside.classList.add("bottom_text");

    const conversationLastMessage = document.createElement("div");
    conversationLastMessage.classList.add("conversation_lastmsg");

    conversationLastMessage.innerHTML += `
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--gray-6)">
        <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" />
    </svg><span>${data.lastMessage}</span>`;

    conversationInfoBottomside.appendChild(conversationLastMessage);

    const conversationOptions = document.createElement("button");
    conversationOptions.classList.add("conversation_options");

    conversationOptions.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  fill="var(--gray-6)">
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>`;

    conversationInfoBottomside.appendChild(conversationOptions);

    conversationInfo.appendChild(conversationInfoBottomside);

    conversationBlock.appendChild(conversationInfo);

    return conversationBlock;
  }
}
