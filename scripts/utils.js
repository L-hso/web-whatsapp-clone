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

    if (window.innerHeight * 0.475 < anchorPos.y) {
      menu.style.bottom = `calc(${window.innerHeight - anchorPos.y}px)`;
      origin = "bottom";

    } else if (window.innerHeight * 0.525 > anchorPos.y) {
      menu.style.top = `calc(${anchorPos.marginY}rem + ${anchorPos.y}px)`;
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
