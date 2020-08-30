<?php
/**
 * Plugin Name: PRLX
 * Plugin URI: http://ivan.pw
 * Description: Parallax plugin. Based on Parallax.JS
 * Version: 1.1
 * Author: IvanPW
 * Author URI: http://ivan.pw
 */
defined('ABSPATH') or die('Put in? Put out!');

//require( 'wptuts-editor-buttons/wptuts.php' );

add_image_size('prlx-size', 1920, 1080, array('center', 'center'));

function prlx_shortcode($atts, $content)
{
    $message = '';
    if (!empty($atts['image-id'])) {
        if (!empty($atts['prlx-mode'] && $atts['prlx-mode'] == 'swiper')) {
            foreach (explode(',', $atts['image-id']) as $key => $imgId) {
                //var_dump($imgId);

                $image    = wp_get_attachment_image_src($imgId, 'prlx-size');
                $add      = '';
                $addClass = ($image[1] < $image[2]) ? ' vertical ' : ' horisontal ';

                $message .= '
                    <div class="prlx__image__swipe ' . ($key == 0 ? 'first' : '') . '">
                        <div class="prlx__image_wrapper ">
                            <div class="prlx__image" ><img src="' . $image[0] . '" /></div>
                        </div>
                        <div class="prlx__text">' . explode('///', $content)[$key] . '</div>
                    </div>';
            }

            $message = '
            <div class="prlx prlx-swiper ' . $addClass . '" data-count=' . count(explode(',', $atts['image-id'])) . ' >
                ' . $message . '
            </div>';

        } else {
            $image = wp_get_attachment_image_src($atts['image-id'], 'prlx-size');
            $add   = '';
            $addClass .= ($image[1] < $image[2]) ? ' vertical ' : 'horisontal';

            $message = '
                    <div class="prlx ' . $addClass . '" >
                        <div class="prlx__image_wrapper">
                            <div class="prlx__image lax" data-lax-translate-y="(vh) ((-elh)*0.5), (vh-elh) 0, 0 0, (-elh) (elh*0.5)" data-lax-anchor="self"><img src="' . $image[0] . '" /></div>
                        </div>
                        <div class="prlx__text">' . $content . '</div>
                    </div>
            ';
            //data-lax-scale="(vh) 1.5, ((vh-elh)/2) 1, (-elh) 1.2"
        }
    }

    return $message;
}
// register shortcode
add_shortcode('prlx', 'prlx_shortcode');

function prlx_scripts()
{
    wp_enqueue_style('prlx_style', plugin_dir_url(__FILE__) . '/style.css?v1.1');

    wp_enqueue_script('prlx_scripts', plugin_dir_url(__FILE__) . '/laxxx/lax.min.js', array('jquery'));
    //wp_enqueue_script( 'prlx_scripts', plugin_dir_url( __FILE__ ) . '/parallax-js/parallax.min.js', array( 'jquery' ) );
    wp_enqueue_script('prlx_scripts_init', plugin_dir_url(__FILE__) . '/script.js?v1.1', array('prlx_scripts'));
}
add_action('wp_enqueue_scripts', 'prlx_scripts');

function prlx_buttons()
{
    add_filter("mce_external_plugins", "prlx_add_buttons");
    add_filter('mce_buttons', 'prlx_register_buttons');
}
function prlx_add_buttons($plugin_array)
{
    $plugin_array['prlx'] = plugin_dir_url(__FILE__) . '/editors/wptuts-plugin.js';
    return $plugin_array;
}
function prlx_register_buttons($buttons)
{
    array_push($buttons, 'prlx'); // dropcap', 'recentposts
    return $buttons;
}
add_action('init', 'prlx_buttons');

function prlx_enqueue_scripts_styles_admin()
{
    //wp_enqueue_media();

    wp_enqueue_script('jquery');
    wp_enqueue_script('media-lib-uploader-js');
}
add_action('admin_enqueue_scripts', 'prlx_enqueue_scripts_styles_admin');