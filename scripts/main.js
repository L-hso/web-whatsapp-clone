import { Dropdown } from "./utils.js";
import Conversation from "./conversation.js";

const messagesMain = document.querySelector("#messages main ul");

const conversationsData = await fetch("../assets/fakedata.json").then(
  (response) => response.json()
);

await conversationsData.forEach((data) => {
  messagesMain.appendChild(Conversation.create(data));
});

const conversations = document.querySelectorAll(
  "#messages main .conversation_block"
);


function conversationsCreateContextMenu(e, {x=e.clientX, y=e.clientY, marginX, marginY}){
  const popover = document.querySelector(".conversation_options_popover");

  e.stopImmediatePropagation();
  e.preventDefault();

  if (popover == null) {
    let blockPos = {x, y, marginX, marginY};

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
      blockPos
    );

    document.body.appendChild(menu);
  }
}


conversations.forEach((block) => {
  const conversationOptions = block.querySelector(".conversation_options");

  conversationOptions.addEventListener("click", (e)=>{conversationsCreateContextMenu(e, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, marginX: "1.5", marginY: "0"})});
  block.addEventListener("contextmenu", (e)=>{conversationsCreateContextMenu(e, {marginX: "0", marginY: "0"})});
});

document.body.addEventListener("mousedown", () => {
  const popover = document.querySelector(".conversation_options_popover");

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

const navigationBar = document.querySelector("nav");

const messagesArea = document.querySelector("#messages");

const principalPanel = document.querySelector("#principal_panel");

principalPanel.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (!document.querySelector(".conversation_options_popover")) {
    let options;

    if (e.target.dataset.chattype == "group") {
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

    if (e.target.dataset.chattype == "person") {
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

    const dropdown = Dropdown.create(-1, options, {x: e.clientX, y: e.clientY, marginX: "0", marginY: "0"});

    document.body.appendChild(dropdown);
  }
});
