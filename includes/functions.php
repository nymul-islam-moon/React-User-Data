<?php

/**
 * Fetch total Users form database
 *
 * @param $args
 * @return array|object|stdClass[]|null
 */
function rud_get_users( $args = [] ) {
    global $wpdb;
    $defaults = [
        'number'    => 20,
        'offset'    => 0,
        'orderby'   => 'id',
        'order'     => 'ASC'
    ];

    $args = wp_parse_args( $args, $defaults );

    $items = $wpdb->get_results(
        $wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}react_user_data_users ORDER BY {$args['orderby']} {$args['order']} LIMIT %d, %d", $args['offset'], $args['number']
        ) );

    return $items;
}

/**
 * Insert a new user
 *
 * @param $args
 * @return int|WP_Error
 */
function rud_insert_user( $args = [] ) {

    if ( empty( $args['name'] ) ) {
        return new \WP_Error( 'failed-to-insert', __( 'Name not found', 'rud' ) );
    }

    global $wpdb;

    $defaults = [
        'name'          => '',
        'email'         => '',
        'phone'         => '',
        'address'       => '',
        'created_by'    => get_current_user_id(),
        'created_at'    => current_time( 'mysql' )
    ];


    $data = wp_parse_args( $args, $defaults );

    error_log( print_r( $data, true ) );

    if ( isset( $data['id'] ) ) {
        $id = $data['id'];

        unset( $data['id'] );

        $updated = $wpdb->update(
            "{$wpdb->prefix}react_user_data_users",
            $data,
            [ 'id' => $id ],
            [
                '%s',
                '%s',
                '%s',
                '%s',
                '%d',
                '%s'
            ],
            [ '%d' ]
        );
        return $updated;
    } else {

        $inserted = $wpdb->insert(
            "{$wpdb->prefix}react_user_data_users",
            $data,
            [
                '%s',
                '%s',
                '%s',
                '%s',
                '%d',
                '%s'
            ]
        );

        if ( ! $inserted ) {
            return new \WP_Error( 'failed-to-insert', __( 'Failed to insert data', 'rud' ) );
        }

        return $wpdb->insert_id;
    }
}

/**
 * Fetch single data from a specific table in database
 *
 * @param $table_name
 * @param $id
 * @return array|object|stdClass|null
 */
function rud_fetch_single_data( $table_name ,$id ) {
    global $wpdb;

    return $wpdb->get_row(
        $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}{$table_name} WHERE id = %d", $id )
    );
}


/**
 * Get the count of total Data
 *
 * @return int
 */
function rud_count( $table_name = '' ) {
    global $wpdb;
    return (int) $wpdb->get_var( "SELECT count(id) FROM {$wpdb->prefix}{$table_name}" );
}


function rud_delete_data( $table_name = '', $id ) {
    global $wpdb;

    $deleted =  $wpdb->delete(
        $wpdb->prefix . $table_name,
        [ 'id' => $id ],
        [ '%d' ]
    );

    if ( ! $deleted ) {
        return new \WP_Error( 'failed-to-insert', __( 'Failed to insert data', 'rud' ) );
    }

    return $deleted;
}