<?php

namespace React\User\Data\API;

use WP_REST_Server;

class WPD_Users extends \WP_REST_Controller {

    /**
     * Initialize the class
     */
    function __construct() {
        $this->namespace = 'user-master/v1';
        $this->rest_base = 'users';
    }

    /**
     * Registers the routes for the objects of the controller.
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_items' ],
                    'permission_callback' => [ $this, 'get_items_permissions_check' ],
                    'args'                => $this->get_collection_params(),
                ],
                'schema' => [ $this, 'get_item_schema' ],
            ]
        );
    }


    /**
     * @return array
     */
    public function get_item_schema()
    {
        if ( $this->schema ) {
            return $this->add_additional_fields_schema( $this->schema );
        }

        $schema = [
            '$schema'       => 'http://json-schema.org/draft-04/schema#',
            'title'         => 'users',
            'type'          => 'object',
            'properties'    => [
                'id'    => [
                    'description'   =>  esc_html('Unique identifier for the object.'),
                    'type'          =>  'integer',
                    'context'       =>  [ 'view', 'edit' ],
                    'readonly'      =>  true,
                ],
                'email' => [
                    'description'   =>  esc_html('E-mail of the user'),
                    'type'          =>  'string',
                    'required'      =>  true,
                    'context'       =>  [ 'view', 'edit' ],
                    'arg_options'   => [
                        'sanitize_callback' => 'sanitize_text_field',
                    ]
                ],
                'registered_at' => [
                    'description' => __( "The date the object was published, in the site's timezone." ),
                    'type'        => 'string',
                    'format'      => 'date-time',
                    'context'     => [ 'view' ],
                    'readonly'    => true,
                ],
            ],
        ];

        $this->schema = $schema;

        return $this->add_additional_fields_schema( $this->schema );
    }


    /**
     * Retrieves the query for collections.
     *
     * @return array
     */
    public function get_collection_params()
    {
        $params = parent::get_collection_params();

        unset( $params['search'] );

        return $params;
    }

    /**
     * Check permission for items collection
     * @param $request
     * @return bool
     */
    public function get_items_permissions_check( $request )
    {
        if ( current_user_can( 'manage_options' ) ) {
            return true;
        }
        return false;
    }

    public function get_items($request)
    {
        $args = [];

        $params = $this->get_collection_params();

        foreach ( $params as $key => $param ) {
            if ( isset( $request[ $key ] ) ) {
                $args[ $key ] = $request[ $key ];
            }
        }

        // change `per_page` to `number`
        $args['number'] = $args['per_page'];
        $args['offset'] = $args['number'] * ( $args['page'] - 1 );

        // unset others
        unset( $args['per_page'] );
        unset( $args['page'] );

        $data     = [];
        $users = get_all_users_data( $args );

        foreach ( $users as $key => $user ) {
            $response = $this->prepare_item_for_response( $user, $request );

            $data[] = $this->prepare_response_for_collection( $response );
        }

        $total = count( $data );
        $pages = ceil( $total / $args['number'] );
        $response = rest_ensure_response( $data );

        $response->header('X-WP-Total', (int) $total);
        $response->header('X-WP-Total-Pages', (int) $pages);

        return $response;
    }


    public function prepare_item_for_response($item, $request)
    {
        $data = [];
        $fields = $this->get_fields_for_response( $request );

        if ( in_array( 'id', $fields, true ) ) {
            $data['id'] = (int) $item['id'];
        }

        if ( in_array( 'email', $fields, true ) ) {
            $data['email'] = $item['email'];
        }

        if ( in_array( 'registered_at', $fields, true ) ) {
            $data['registered_at'] = mysql_to_rfc3339( $item['registered_at'] );
        }

        $context = ! empty( $request['context'] ) ? $request['context'] : 'view';
        $data   = $this->filter_response_by_context( $data, $context );

        $response = rest_ensure_response( $data );

        $response->add_links( $this->prepare_links($item) );

        return $response;
    }

    public function prepare_links( $item )
    {
        $base = sprintf( '%s/%s', $this->namespace, $this->rest_base );

        $links = [
            'self' => [
                'href'  => rest_url( trailingslashit( $base ) . $item['id'] ),
            ],
            'collection' => [
                'href'  => rest_url( $base ),
            ],
        ];

        return $links;
    }

}