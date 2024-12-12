import { make } from "./utils.js";
import { Dropdown } from "./utils.js";

export default class Chat {
  /**
   *
   * @param {{chatId: string, pfp: string, name: string, date: string, lastMessage: string, isGroup: boolean }} data chat data
   * @returns {HTMLLIElement}
   */
  static create(data) {
    const chatBlock = make("li", ["chat_block"]);
    chatBlock.dataset.chatId = data.chatId;

    const chatPfpContainer = make("div", ["chat_pfp"]);

    const pfp = make("img");
    pfp.src = data.pfp ?? "https://placehold.co/600";

    chatPfpContainer.appendChild(pfp);

    const chatInfo = make("hgroup");

    const chatInfoTopside = make("div", ["top_text"]);

    const chatName = make("span", ["chat_name"], null, data.name);

    const chatDate = make("span", ["chat_date"], null, data.date);

    chatInfoTopside.append(chatName, chatDate);

    const chatInfoBottomside = make("div", ["bottom_text"]);

    const chatLastMessage = make("div", ["chat_lastmsg"]);

    chatLastMessage.innerHTML += `
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--gray-6)">
        <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" />
    </svg><span>${data.lastMessage}</span>`;

    const chatOptions = make("button", ["chat_options"]);

    chatOptions.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  fill="var(--gray-6)">
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>`;

    chatOptions.addEventListener("click", (e) => {
      chatsCreateContextMenu(data.chatId, e, {
        x: e.currentTarget.getBoundingClientRect().x,
        y: e.currentTarget.getBoundingClientRect().y,
        marginX: "1.5",
        marginY: "1.5",
      });
    });

    chatInfoBottomside.append(chatLastMessage, chatOptions);

    chatInfo.append(chatInfoTopside, chatInfoBottomside);

    chatBlock.append(chatPfpContainer, chatInfo);

    chatBlock.addEventListener("contextmenu", (e) => {
      chatsCreateContextMenu(data.chatId, data.isGroup, e, { marginX: "0", marginY: "0" });
    });

    return chatBlock;
  }
}

function chatsCreateContextMenu(
  chatId,
  isGroup,
  e,
  { x = e.clientX, y = e.clientY, marginX, marginY }
) {
  e.stopImmediatePropagation();
  e.preventDefault();

  let blockPos = { x, y, marginX, marginY };

  let options = isGroup
    ? [
        "Arquivar conversa",
        "Silenciar notificações",
        "Fixar conversa",
        "Marcar como não lida",
        "Adicionar aos favoritos",
        "Sair do grupo",
      ]
    : [
        "Arquivar conversa",
        "Silenciar notificações",
        "Apagar conversa",
        "Fixar conversa",
        "Marcar como não lida",
        "Adicionar aos favoritos",
        "Bloquear",
      ];

  Dropdown.create(chatId, options, blockPos, false);
}
