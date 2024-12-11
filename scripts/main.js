import { Dropdown } from "./utils.js";
import Chat from "./chat.js";
import PrincipalPanel from "./principal_panel.js";

/*---------------------- CHATS AREA ----------------------*/
const messagesMain = document.querySelector("#messages main ul");

const chatsData = await fetch("./example.json").then((response) =>
  response.json()
);

await chatsData[0].forEach((data) => {
  let chat = Chat.create(data);
  chat.addEventListener("click", (e) => {
    if (
      e.currentTarget.dataset.chatId !=
      document.querySelector("#principal_panel").firstChild.dataset.chatId
    ) {
      document.querySelectorAll(".chat_block").forEach((el) => {
        el.dataset.active = false;
      });

      document.querySelector("#principal_panel").firstChild.remove();

      if (chatsData[1][data.id]?.messages) {
        e.currentTarget.dataset.active = true;

        let panel = PrincipalPanel.createChatPanel(
          chatsData[0][data.id],
          chatsData[1][data.id].messages
        );

        panel
          .querySelector("#chat_main")
          .addEventListener("contextmenu", (e) => {
            e.preventDefault();

            let options;

            if (data.group) {
              options = [
                "Dados do grupo",
                "Selecionar mensagens",
                "Fechar conversa",
                "Silenciar notificações",
                "Mensagens temporárias",
                "Limpar conversa",
                "Sair do grupo",
                "Adicionar aos favoritos",
              ];
            } else {
              options = [
                "Dados do contato",
                "Selecionar mensagens",
                "Fechar conversa",
                "Silenciar notificações",
                "Mensagens temporárias",
                "Limpar conversa",
                "Apagar conversa",
                "Adicionar aos favoritos",
                "Denunciar",
                "Bloquear",
              ];
            }

            Dropdown.create(
              -1,
              options,
              {
                x: e.clientX,
                y: e.clientY,
                marginX: "0",
                marginY: "0",
              },
              true
            );
          });
        document.querySelector("#principal_panel").appendChild(panel);
        panel
          .querySelector("#chat_main")
          .scrollBy(0, panel.querySelector("#chat_main").scrollHeight);
      } else {
        document
          .querySelector("#principal_panel")
          .appendChild(PrincipalPanel.createNochatPanel());
      }
    }
  });

  messagesMain.appendChild(chat);
});

/*-----------------------------------------------------------*/

/*---------------------- PRINCIPAL PANEL AREA ----------------------*/

const principalPanel = document.querySelector("#principal_panel");

principalPanel.appendChild(PrincipalPanel.createNochatPanel());

/*-----------------------------------------------------------*/
