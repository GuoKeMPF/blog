import { Editor } from 'tinymce';

const register = (editor: Editor): void => {
  editor.ui.registry.addIcon('html', '<svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2191"><path d="M434.12811 654.18527l-16.884181 16.884181c-4.707105 4.707105-12.279404 4.707105-16.884181 0l-118.496253-118.496253c-4.707105-4.707105-4.707105-12.279404 0-16.884181l118.496253-118.496253c4.707105-4.707105 12.279404-4.707105 16.884181 0l16.884181 16.884181c4.707105 4.707105 4.707105 12.279404 0 16.884181l-93.118817 93.118817 93.118817 93.118817C438.835215 642.008194 438.835215 649.580494 434.12811 654.18527zM473.115219 744.848206l-21.591286-6.037374c-5.935045-1.637254-9.618867-7.572299-8.18627-13.20036l96.188668-369.917058c1.534926-5.730389 7.981613-9.004897 14.325972-7.265314l23.126212 6.242031c6.344359 1.739582 10.335165 7.776956 8.80024 13.507345l-99.258519 369.610073C485.087639 743.313281 479.050265 746.48546 473.115219 744.848206zM749.401819 552.675527l-118.496253 118.496253c-4.707105 4.707105-12.279404 4.707105-16.884181 0l-16.884181-16.884181c-4.707105-4.707105-4.707105-12.279404 0-16.884181l93.118817-93.118817-93.118817-93.118817c-4.707105-4.707105-4.707105-12.279404 0-16.884181l16.884181-16.884181c4.707105-4.707105 12.279404-4.707105 16.884181 0l118.496253 118.496253C754.006595 540.396123 754.006595 547.968422 749.401819 552.675527zM823.794544 919.522734l-628.500849 0 0-814.533826 455.668232 0 0 128.012791c0 16.065554 14.121315 29.061257 31.41481 29.061257L823.794544 262.062956 823.794544 919.522734 823.794544 919.522734zM722.080144 145.203957l59.759768 58.634156-59.759768 0L722.080144 145.203957zM886.624163 231.364445c0-0.102328 0-0.102328 0-0.204657 0-0.61397-0.102328-1.22794-0.204657-1.841911 0-0.102328 0-0.204657 0-0.306985-0.409313-2.865194-1.22794-5.525732-2.455881-7.981613l0 0c-0.61397-1.22794-1.330269-2.455881-2.046567-3.581493-0.102328-0.102328-0.204657-0.204657-0.204657-0.409313-0.306985-0.511642-0.716299-0.920955-1.023284-1.432597-0.102328-0.204657-0.306985-0.306985-0.409313-0.511642-0.306985-0.306985-0.511642-0.61397-0.818627-1.023284-0.204657-0.204657-0.409313-0.511642-0.61397-0.716299-0.204657-0.204657-0.409313-0.409313-0.61397-0.61397-0.204657-0.204657-0.409313-0.409313-0.716299-0.716299l-171.40002-156.767063c-4.809433-4.604777-11.358449-7.674628-18.521435-8.493255 0 0 0 0-0.102328 0-0.716299-0.102328-1.432597-0.102328-2.148896-0.204657-0.204657 0-0.306985 0-0.511642 0-0.306985 0-0.61397 0-1.023284 0l-515.223344 0c-17.293495 0-31.210153 12.995703-31.210153 29.061257l0 872.758669c0 16.065554 14.018987 29.061257 31.210153 29.061257l686.82802 0c17.293495 0 31.210153-12.995703 31.210153-29.061257l0-715.684621C886.624163 232.490057 886.624163 231.876087 886.624163 231.364445z" p-id="2192"></path></svg>');
};

export {
  register
};
