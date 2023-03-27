function ohmylaw_enqueue_scripts() {
    wp_enqueue_style('ohmylaw-system-css', plugin_dir_url(__FILE__) . 'ohmylaw-system.css');
    wp_enqueue_script('ohmylaw-system-js', plugin_dir_url(__FILE__) . 'ohmylaw-system.js', array(), false, true);
}
add_action('wp_enqueue_scripts', 'ohmylaw_enqueue_scripts');

//

function ohmylaw_handle_ajax_request() {
    if (isset($_POST['question'])) {
        $question = sanitize_text_field($_POST['question']);

        // Envoyez la question à l'API OpenAI et traitez la réponse
        $response = "La réponse de l'API OpenAI pour la question : " . $question; // Remplacez cette ligne par le code pour interagir avec l'API OpenAI

        echo json_encode($response);
    }
    wp_die();
}
add_action('wp_ajax_envoyer_question', 'ohmylaw_handle_ajax_request');
add_action('wp_ajax_nopriv_envoyer_question', 'ohmylaw_handle_ajax_request');

