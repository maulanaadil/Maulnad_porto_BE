class ShellComponent extends HTMLElement {
  code;
  constructor() {
    super();
    this.code = this.getAttribute("data-code");

    this.innerHTML = `
           <div
            class="w-full bg-[#1b1b1d] text-[#dededf] rounded-md p-4 font-size-[85%]"
            >
              <div class="flex gap-4">
                <span class="">$</span>
                <code class="flex-1">${this.code}</code>
              </div>
            </div>
        `;
  }
}

customElements.define("shell-component", ShellComponent);
