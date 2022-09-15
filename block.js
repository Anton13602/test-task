import BaseComponent from "./base-component.js";

class Block extends BaseComponent {
  constructor(parentNode, text, inputContent) {
    super(parentNode, 'div', ['block'])
    this.inputContent = inputContent;
    new BaseComponent(this.node, 'div', ['block__text'], text);
    this.form = new BaseComponent(this.node, 'form', ['block__form']);
  }

  renderForm() {
    const inputs = this.inputContent.map((element) => {
      const wrapper = new BaseComponent(this.form.node, 'div', ['form-wrapper']);
      return element.map((content) => {
        const label = new BaseComponent(wrapper.node, 'label', ['form__label'], content);
        const input = new BaseComponent(wrapper.node, 'input', ['form__input']);
        input.node.type = 'number';
        return input;
      })
    });
    const wrapperBtn = new BaseComponent(this.form.node, 'div')
    const button = new BaseComponent(wrapperBtn.node, 'button', ['form__btn'], 'Результат');
    button.node.type = 'submit';
    const result = new BaseComponent(this.node, 'div', ['block__result']);
    return {result, button, inputs}
  }
}

export default Block;
