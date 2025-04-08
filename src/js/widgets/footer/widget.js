import FooterTemplate from 'hbs!js/widgets/footer/footer';
import Marionette from 'marionette';

var Footer = Marionette.ItemView.extend({
  template: FooterTemplate,
  className: 'footer s-footer',
});

export default Footer;
