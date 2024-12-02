export class Dropdown {
  /**
   * Create a dropdown with id of the caller to use in persistence, and the options of persistence.
   * Also receives a object with the position of the caller and the margin in rem.
   * @param {string} id
   * @param {string[]} options
   * @param {{x:number, y:number, marginX:string, marginY:string}} anchorPos
   * @param {boolean} overflows
   * @returns
   */
  static create(id, options, anchorPos, overflows) {
    const menu = document.createElement("menu");
    menu.classList = "conversation_options_popover";
    menu.dataset.id = id;

    for (const option of options) {
      const li = document.createElement("li");
      li.classList = "popover_option";

      const button = document.createElement("button");
      button.innerText = option;

      li.appendChild(button);
      menu.appendChild(li);
    }
    menu.style.position = "absolute";

    let origin = "";
    
    const posLimits = {
      true: {min: 0.375, max: 0.625},
      false: {min: 0.5, max: 0.5}
    }

    if (window.innerHeight * posLimits[overflows].max <= anchorPos.y)  {
      menu.style.bottom = `calc(${window.innerHeight - anchorPos.y}px)`;
      origin = "bottom";

    } else  if (window.innerHeight * posLimits[overflows].min > anchorPos.y){
      menu.style.top = `calc(${anchorPos.marginY}rem + ${anchorPos.y}px)`;
      origin = "top";
    } else {
      menu.style.top = window.innerHeight * 0.25 + "px";
      origin = "top";
    }

    if(window.innerWidth * 0.75 < anchorPos.x){
      menu.style.right = `calc(${anchorPos.marginX}rem + ${window.innerWidth - anchorPos.x}px)`;
      origin += " right";
    } else {
      menu.style.left = `calc(${anchorPos.marginX}rem + ${anchorPos.x}px)`;
      origin += " left";
    }

    menu.style.transformOrigin = origin;

    menu.style.animation = "expand 0.33s ease";
    return menu;
  }
}

export class ChatActions {
  static create(chatId){
    const chat_actions = document.createElement("div");
    chat_actions.classList = "chat_actions";

    const search_action = document.createElement("button");
    search_action.classList.add("search_action");
    search_action.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--gray-9)"
            >
              <path
                d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
              />
            </svg>`;

    const options_action = document.createElement("button");
    options_action.classList.add("options_action");
    options_action.innerHTML = `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--gray-9)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-ellipsis-vertical"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>`;

    chat_actions.append(search_action, options_action)

    return chat_actions;
  }
}
