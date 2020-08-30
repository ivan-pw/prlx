(function() {
  tinymce.create('tinymce.plugins.PRLX', {
    /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
    init: function(ed, url) {
      ed.addCommand('open_prlx_dialog', function() {
        ed.windowManager.open(
            {
              file: url + '/editors/tinymce_editor.php', // file that contains HTML for our modal window
              width: 800,
              height: 600,
              inline: 1,
            },
            {
              plugin_url: url,
              wp: wp,
            },
        );
      });
      /*
            ed.addButton('prlx', {
                title : 'Parallax',
                text : 'PRLX',
                cmd : 'open_prlx_dialog',
				icon: false,
                //image : url + '/dropcap.jpg'
            });
			*/
      ed.addButton('prlx', {
        icon: false,
        text: 'PRLX',
        tooltip: 'Image',
        onclick: function() {
          ed.windowManager.open({
            title: 'Add parallax image',
            body: [
              {
                type: 'textbox',
                subtype: 'hidden',
                name: 'prlx_id',
                id: 'hiddenID',
                label: 'Image (Separator: ///)',
              },
              {
                type: 'textbox',
                name: 'text',
                label: 'Image',
                id: 'imageText',
              },
              {
                type: 'listbox',
                name: 'prlx_mode',
                label: 'Mode',
                values: [
                  {text: 'Default', value: 'default'},
                  {text: 'PRLX swiper', value: 'swiper'},
                ],
              },
              {
                type: 'button',
                text: 'Choose an image',
                onclick: function(e) {
                  e.preventDefault();
                  const hidden = jQuery('#hiddenID');
                  const text = jQuery('#imageText');
                  const caption = jQuery('#prlxCaption');
                  const custom_uploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choose an image',
                    button: {text: 'Add an image'},
                    multiple: true,
                  });
                  custom_uploader.on('select', function() {
                    const attachment = custom_uploader.state().get('selection').first().toJSON();

                    const imagesObj = custom_uploader.state().get('selection').toJSON();
                    hidden.val('');
                    text.val('');
                    if (imagesObj.length > 1) {
                      for (key in imagesObj) {
                        if ({}.hasOwnProperty.call(imagesObj, key)) {
                          const separator = (key == 0) ? '' : '///';
                          hidden.val(hidden.val() + (key == 0 ? '' : ',') + imagesObj[key].id);
                          if (imagesObj[key].alt) {
                            text.val(text.val() + separator + imagesObj[key].alt);
                          } else if (imagesObj[key].title) {
                            text.val(text.val() + separator + imagesObj[key].title);
                          }
                        }
                      }
                    } else {
                      hidden.val(imagesObj[0].id);
                      if (!text.val()) {
                        if (imagesObj[0].alt) {
                          text.val(imagesObj[0].alt);
                        } else if (imagesObj[0].title) {
                          text.val(imagesObj[0].title);
                        }
                      }
                    }
                  });
                  custom_uploader.open();
                },
              },
              {
                type: 'textbox',
                multiline: true,
                minWidth: '600',
                minHeight: '200',
                name: 'caption',
                label: 'Parallax caption (Separator: ///)',
                id: 'prlxCaption',
              },
            ],
            onsubmit: function(e) {
              // image-name="' +e.data.text+ '"
              console.log(e.data);
              const prlx_shortcode = '[prlx prlx-mode="'+e.data.prlx_mode+'" image-id="' +e.data.prlx_id+ '"]' +e.data.caption+ '[/prlx]';
              ed.insertContent(prlx_shortcode);
            },
          });
        },
      });
    },

    /**
         * Creates control instances based in the incomming name. This method is normally not
         * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
         * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
         * method can be used to create those.
         *
         * @param {String} n Name of the control to create.
         * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
         * @return {tinymce.ui.Control} New control instance or null if no control was created.
         */
    createControl: function(n, cm) {
      return null;
    },

    /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
    getInfo: function() {
      return {
        longname: 'PRLX Buttons',
        author: 'Lee',
        authorurl: 'http://wp.tutsplus.com/author/leepham',
        infourl: 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/example',
        version: '0.1',
      };
    },
  });

  // Register plugin
  tinymce.PluginManager.add( 'prlx', tinymce.plugins.PRLX );
})();
