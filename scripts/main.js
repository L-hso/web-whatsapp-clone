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
  messagesMain.appendChild(Conversation.create(data, conversationsCreateContextMenu));
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

principalPanel.appendChild(PrincipalPanel.createChatPanel(conversationsData[0][0], conversationsData[1][0]["messages"]));

const principalPanelMutationObserver = new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.target.dataset.chatId == null) return;

    if (mutation.type === "attributes") {
      mutation.target.childNodes[0].remove();

      if (mutation.target.dataset.paneltype == "nochat") {
        mutation.target.appendChild(PrincipalPanel.createNochatPanel());
        return;
      }

      if (mutation.target.dataset.paneltype == "chat") {
        mutation.target.appendChild(PrincipalPanel.createChatPanel());
        return;
      }
    }
  }
});

principalPanelMutationObserver.observe(principalPanel, {
  attributes: true,
  attributeFilter: ["data-paneltype"],
});

principalPanel
  .querySelector("#chat_main")
  .addEventListener("contextmenu", (e) => {
    e.preventDefault();

    if (!document.querySelector(".dropdown")) {
      let options;

      if (e.currentTarget.dataset.chattype == "group") {
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
      }

      if (e.currentTarget.dataset.chattype == "person") {
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
