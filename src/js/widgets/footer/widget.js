import Marionette from 'marionette';
import FooterTemplate from 'hbs!js/widgets/footer/footer';
  var Footer = Marionette.ItemView.extend({
    template: FooterTemplate,
    className: 'footer s-footer',
  });

  export default Footer;

