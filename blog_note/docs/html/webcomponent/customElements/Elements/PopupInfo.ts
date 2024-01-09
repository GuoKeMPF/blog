// 为当这个元素创建一个类
export class PopupInfo extends HTMLElement {
  icon: HTMLSpanElement | null = null
  detail: HTMLDivElement | null = null
  // constructor() {
  //   super();
  // }

  connectedCallback() {
    // 创建影子根
    const shadow = this.attachShadow({ mode: "open" });

    // 创建几个 span
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");

    const icon = document.createElement("span");
    icon.setAttribute("class", "icon");
    icon.setAttribute("tabindex", "0");

    const info = document.createElement("span");
    info.setAttribute("class", "info");

    // 获取属性内容然后将其放入 info 这个 span 内
    const text = this.getAttribute("data-text");
    info.textContent = text;



    // 插入图标
    let imgUrl;
    if (this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      throw new Error("请设置 img 属性");
    }

    const img = document.createElement("img");
    img.src = imgUrl;
    icon.appendChild(img);

    this.icon = icon
    icon.addEventListener("click", () => {
      this.openDetail();
    })

    const detail = document.createElement("div");

    const detailImage = document.createElement("img");
    detailImage.src = imgUrl;
    detail.appendChild(detailImage);
    detail.classList.add('detail')
    detail.addEventListener('click', () => {
      this.closeDetail()
    })
    this.detail = detail

    // 创建一些 CSS 应用于影子 DOM
    const style = document.createElement("style");

    style.textContent = `
      .wrapper {
        position: relative;
      }

      .info {
        font-size: 0.8rem;
        width: max-content;
        max-width: 100%;
        display: inline-block;
        border: 1px solid #333;
        padding: 8px 4px;
        background: rgba(255,255,255,0.5);
        border-radius: 4px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }

      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }

      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
      .detail{
        position:fixed;
        top: 0px;
        bottom: 0px;
        right: 0px;
        left: 0px;
        display: none;
        z-index: 2000;
      }
      .detail img{
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
      .detail.opened{
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center
      }
    `;

    // 将创建好的元素附加到影子 DOM 上
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(detail);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');

    this.icon?.removeEventListener('click', this.openDetail);
    this.detail?.removeEventListener('click', this.closeDetail);
  }

  openDetail = () => {
    this.detail?.classList.add('opened');
    document.body.style.setProperty('overflow', 'hidden')
  }
  closeDetail = () => {
    this.detail?.classList.remove('opened');
    document.body.style.removeProperty('overflow');
  }


}
