import { Dropdown } from "./utils.js";
import Conversation from "./conversation.js";
import PrincipalPanel from "./principal_panel.js";

/*---------------------- CONVERSATIONS AREA ----------------------*/
function conversationsCreateContextMenu(
  e,
  { x = e.clientX, y = e.clientY, marginX, marginY }
) {
  const popover = document.querySelector(".dropdown");

  e.stopImmediatePropagation();
  e.preventDefault();

  if (popover == null) {
    let blockPos = { x, y, marginX, marginY };

    const menu = Dropdown.create(
      e.target.dataset.id,
      [
        "Arquivar conversa",
        "Silenciar notificações",
        "Apagar conversa",
        "Fixar conversa",
        "Marcar como não lida",
        "Adicionar aos favoritos",
        "Bloquear",
      ],
      blockPos,
      false
    );

    document.body.appendChild(menu);
  }
}

const messagesMain = document.querySelector("#messages main ul");

const conversationsData = await fetch("../assets/fakedata.json").then(
  (response) => response.json()
);

await conversationsData[0].forEach((data) => {
  
  let conversation = Conversation.create(data, conversationsCreateContextMenu);
  conversation.addEventListener("click", (e) => {
    if(e.currentTarget.dataset.id != document.querySelector("#principal_panel").firstChild.dataset.chatId){
      document.querySelectorAll(".conversation_block").forEach((el) => {
        el.dataset.active = false;
      });

      document.querySelector("#principal_panel").firstChild.remove();

    if (conversationsData[1][data.id]?.messages) {
      e.currentTarget.dataset.active = true;

      
      let panel = PrincipalPanel.createChatPanel(
        conversationsData[0][data.id],
        conversationsData[1][data.id].messages
      );

      panel.querySelector("#chat_main").addEventListener("contextmenu", (e) => {
        e.preventDefault();

        if (!document.querySelector(".dropdown")) {
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

          const dropdown = Dropdown.create(
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

          document.body.appendChild(dropdown);
        }
      });
      document.querySelector("#principal_panel").appendChild(panel);
      panel.querySelector("#chat_main").scrollBy(0, panel.querySelector("#chat_main").scrollHeight);
    } else {
      document.querySelector("#principal_panel").appendChild(PrincipalPanel.createNochatPanel());
      
    }
  }
  });

  messagesMain.appendChild(conversation);
});

const conversations = document.querySelectorAll(
  "#messages main .conversation_block"
);

conversations.forEach((block) => {
  block.addEventListener("contextmenu", (e) => {
    conversationsCreateContextMenu(e, { marginX: "0", marginY: "0" });
  });
});
/*-----------------------------------------------------------*/

/*---------------------- PRINCIPAL PANEL AREA ----------------------*/

const principalPanel = document.querySelector("#principal_panel");

principalPanel.appendChild(PrincipalPanel.createNochatPanel());

/*-----------------------------------------------------------*/

document.body.addEventListener("mousedown", () => {
  const popover = document.querySelector(".dropdown");

  if (popover != null) {
    popover.animate([{ transform: "scale(0)", opacity: 0 }], {
      duration: 340,
      easing: "ease",
    });

    setTimeout(() => {
      popover.remove();
    }, 330);
  }
});
