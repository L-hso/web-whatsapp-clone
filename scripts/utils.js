export class Dropdown {
  /**
   * Create a dropdown with id of the caller to use in persistence, and the options of persistence.
   * Also receives a object with the position of the caller and the margin in rem.
   * @param {string} id
   * @param {string[]} options
   * @param {{x:number, y:number, marginX:string, marginY:string}} anchorPos
   * @returns
   */
  static create(id, options, anchorPos) {
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
    
    if (window.innerHeight * 0.625 <= anchorPos.y)  {
      menu.style.bottom = `calc(${window.innerHeight - anchorPos.y}px)`;
      origin = "bottom";

    } else  if (window.innerHeight * 0.375 > anchorPos.y){
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

    const search_action = document.createElement("button");
    search_action.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="var(--gray-6)"
            >
              <path
                d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
              />
            </svg>`;

    const options_action = document.createElement("button");
    options_action.innerHTML = `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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

    return chat_actions;
  }
}
