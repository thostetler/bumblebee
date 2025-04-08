define(['react'], function (React) {
  /**
   * @typedef TemplateType
   * @property {string} color
   * @property {string} label
   */

  /** @type {Object.<string, TemplateType>} */
  var templateTypeConstants = {
    arxiv: {
      color: 'primary',
      label: 'arXiv'
    },
    citations: {
      color: 'info',
      label: 'Citations'
    },
    authors: {
      color: 'warning',
      label: 'Authors'
    },
    keyword: {
      color: 'success',
      label: 'Keyword'
    },
    general: {
      color: '#AA5535',
      label: 'General'
    }
  };
  /**
   *
   * @param {string} shortName the name of the template type
   * @returns {string}
   */

  var getTemplateLabel = function getTemplateLabel(shortName) {
    return templateTypeConstants[shortName].label;
  };
  /**
   *
   * @param {Object} props
   * @param {string} props.name the name of the template type
   */


  var TemplatePill = function TemplatePill(_ref) {
    var name = _ref.name,
        disabled = _ref.disabled;
    var shortName = name || 'general';
    var isHex = templateTypeConstants[shortName].color.startsWith('#');
    return /*#__PURE__*/React.createElement("span", {
      className: "label label-".concat(isHex ? 'default' : templateTypeConstants[shortName].color, " ").concat(disabled ? 'text-faded' : ''),
      style: {
        maxWidth: 120,
        display: 'block',
        color: disabled ? '#999999' : 'white',
        backgroundColor: isHex ? templateTypeConstants[shortName].color : 'auto'
      }
    }, getTemplateLabel(shortName));
  };

  return TemplatePill;
});
