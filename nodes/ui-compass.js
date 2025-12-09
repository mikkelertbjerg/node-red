module.exports = function(RED) {
    function UICompassNode(config) {
        const node = this;

        // Create the Node-RED node
        RED.nodes.createNode(this, config);

        // Get the dashboard group
        const group = RED.nodes.getNode(config.group);

        // Register with Dashboard 2.0
        if (group) {
            group.register(node, config, {
                // This function processes messages before sending to the UI
                beforeSend: function(msg) {
                    // Extract the heading value from msg.payload
                    let heading = msg.payload;

                    // Validate and normalize the heading value
                    if (typeof heading === 'string') {
                        heading = parseFloat(heading);
                    }

                    if (typeof heading !== 'number' || isNaN(heading)) {
                        node.warn('Invalid heading value: ' + msg.payload);
                        return null; // Don't send invalid messages to UI
                    }

                    // Normalize to 0-360 range
                    heading = ((heading % 360) + 360) % 360;

                    // Update the message payload with normalized heading
                    msg.payload = heading;

                    return msg;
                }
            });
        } else {
            node.error('No group configured');
        }
    }

    RED.nodes.registerType('ui-compass', UICompassNode);
};
