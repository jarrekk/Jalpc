$(document).ready(function() {
  var i18nOpts = {
    lng: 'en',
    getAsync: true,
    fallbackLng: 'en',
    resGetPath: 'static/locales/__lng__.json'
  };

  var translate = function() {
    $('.i18container').i18n();
    $('#i18_navbar').i18n();
    $('#i18_about_me').i18n();
    $('#i18_skills').i18n();
    $('#i18_projects').i18n();
    $('#i18_career').i18n();
    $('#i18_blog').i18n();
    $('#i18_link').i18n();
  };

  $("[id^=set_lang]").each(function() {
    var $this = $(this);
    $this.on('click', function() {
      i18n.setLng($this.data('locale'), translate);
    });
  });

  i18n.init(i18nOpts, translate);
});
