import FooterTemplate from 'js/widgets/footer/footer.html';
import Marionette from 'marionette';

var Footer = Marionette.ItemView.extend({
  template: FooterTemplate,
  className: 'footer s-footer',
});

export default Footer;
