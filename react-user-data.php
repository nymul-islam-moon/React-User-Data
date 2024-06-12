<?php
/**
 * Plugin Name:       React User Data
 * Description:       A plugin with react for collecting user data
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            Nymul Islam
 * Author URI:        nymul-islam-moon.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       react-user-data
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

final class React_User_Data {

    /**
     * Plugin version
     *
     * @var string
     */
    const version = '1.0.0';

    /**
     * Class construct
     */
    private function __construct() {
        $this->define_constants();

        register_activation_hook( __FILE__, [ $this, 'activate' ] );

        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
    }

    /**
     * Initializes a singleton instance
     *
     * @return \React_User_Data
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new self();
        }

        return $instance;
    }

    /**
     * Define the required plugin constants
     *
     * @return void
     */
    public function define_constants() {
        define( 'RUD_VERSION', self::version );
        define( 'RUD_FILE', __FILE__ );
        define( 'RUD_PATH', __DIR__ );
        define( 'RUD_URL', plugins_url( '', RUD_FILE ) );
        define( 'RUD_ASSETS', RUD_URL . '/assets' );
    }

    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function init_plugin() {


        if ( is_admin() ) {
            new React\User\Data\Admin();
        } else {

        }

        new React\User\Data\API();
    }

    /**
     * Do stuff upon plugin activation
     *
     * @return void
     */
    public function activate() {
        $installer = new React\User\Data\Installer();
        $installer->run();
    }
}

function react_user_data() {
    return React_User_Data::init();
}

/** KICK OFF PLUGIN */
react_user_data();