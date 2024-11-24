import { Dropdown } from "./utils.js";
import Conversation  from "./conversation.js";

const messagesMain = document.querySelector("#messages main ul");

const conversationsData = await fetch("../assets/fakedata.json").then(response=>response.json());

await conversationsData.forEach((data,) => {
  messagesMain.appendChild(Conversation.create(data));
});

const conversations = document.querySelectorAll(
  "#messages main .conversation_block"
);

conversations.forEach((block) => {
  const conversationOptions = block.querySelector(".conversation_options");

  conversationOptions.addEventListener("click", (e) => {
    const popover = document.querySelector(".conversation_options_popover");

    e.stopImmediatePropagation();
    if (popover != null) {
      popover.animate([{ transform: "scale(0)", opacity: 0 }], {
        duration: 340,
        easing: "ease",
      });

      setTimeout(() => {
        document.body.removeChild(popover);
      }, 330);
    } else {
      
      let blockPos = {
        x: conversationOptions.getBoundingClientRect().x.toString(),
        y: conversationOptions.getBoundingClientRect().y.toString(),
      };

      const menu = Dropdown.create(
        block.dataset.id,
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
  });
});

document.body.addEventListener("click", () => {
  const popover = document.querySelector(".conversation_options_popover");

  if (popover != null) {
    popover.animate([{ transform: "scale(0)", opacity: 0 }], {
      duration: 340,
      easing: "ease",
    });

    setTimeout(() => {
      document.body.removeChild(popover);
    }, 330);
  }
});

const navigationBar = document.querySelector("nav");

const messagesArea = document.querySelector("#messages");
