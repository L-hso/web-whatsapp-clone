import { Dropdown } from "./utils.js";
import Chat from "./chat.js";
import PrincipalPanel from "./principal_panel.js";
import { ChatService } from "./services.js";

/*---------------------- CHATS AREA ----------------------*/
const messagesMain = document.querySelector("#messages main ul");

const chatsData = await fetch("./example.json").then((response) =>
  response.json()
);


//const chatService = new ChatService(ws);

await chatsData[0].forEach((data) => {
  let chat = Chat.create(data);

  chat.addEventListener("click", (e) => {
    const ws = new WebSocket("wss://localhost:5050");

    ws.onopen = (e) => {console.log("connected", e);};
    ws.onmessage = (e) => {console.log("Message", e.data);};
    ws.onclose = (e) => {console.log("closed", e)};
    ws.onerror = (e) => {console.log("error", e)};
    
    if (
      e.currentTarget.dataset.chatId !=
      document.querySelector("#principal_panel").firstChild.dataset.chatId
    ) {
      document.querySelectorAll(".chat_block").forEach((el) => {
        el.dataset.active = false;
      });

      document.querySelector("#principal_panel").firstChild.remove();

      if (chatsData[1][data.chatId]?.messages) {
        e.currentTarget.dataset.active = true;

        let panel = PrincipalPanel.createChatPanel(
          chatsData[0][data.chatId],
          chatsData[1][data.chatId].messages,
          ws
        );

        panel
          .querySelector("#chat_main")
          .addEventListener("contextmenu", (e) => {
            e.preventDefault();

            
            let options;

            if (data.isGroup) {
              options = {
                "Dados do grupo": null,
                "Selecionar mensagens": null,
                "Fechar conversa": null,
                "Silenciar notificações": null,
                "Mensagens temporárias": null,
                "Limpar conversa": chatService.cleanChat,
                "Sair do grupo": chatService.exitGroup,
                "Adicionar aos favoritos": chatService.favoriteChat,
            };
            } else {
              options = { 
                "Dados do contato":null,
                "Selecionar mensagens":null,
                "Fechar conversa":null,
                "Silenciar notificações":null,
                "Mensagens temporárias":null,
                "Limpar conversa": chatService.cleanChat,
                "Apagar conversa": chatService.deleteChat,
                "Adicionar aos favoritos": chatService.favoriteChat,
                "Denunciar": chatService.reportChat,
                "Bloquear": chatService.blockChat,
              };
            }

            Dropdown.create(
              data.chatId,
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
