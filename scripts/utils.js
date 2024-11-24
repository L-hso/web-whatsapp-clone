export class Dropdown{
    static create (id, options, anchorPos){
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
      
      menu.style.left = "calc(1.5rem + " + anchorPos.x + "px)";
      console.log();

      if(anchorPos.y > window.innerHeight/2){
        menu.style.bottom =
        "calc(" + (window.innerHeight - anchorPos.y) + "px)";
        menu.style.transformOrigin = "bottom left";

      } else {
        menu.style.top =
        "calc(1.5rem + " + anchorPos.y + "px)";
        menu.style.transformOrigin = "top left";
  
      }

      menu.style.animation = "expand 0.33s ease";
      return menu;
    }
  }