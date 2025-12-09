# Node-RED Dashboard 2.0 Compass Widget

A custom widget for Node-RED Dashboard 2.0 that displays compass heading in degrees (0-360°) with a visual compass and rotating needle.

## Features

- **Visual compass display** with rotating needle
- **Real-time heading updates** with smooth animation
- **Numeric display** showing degree value
- Red needle tip points north, dark gray tip points south
- Cardinal direction labels (N, E, S, W)
- Automatic normalization of input values to 0-360° range
- Built with Vuetify components for consistent Dashboard 2.0 styling
- Responsive design that fits Dashboard 2.0 grid layout

## Installation

### Via npm

```bash
cd ~/.node-red
npm install @wexgaard/node-red-dashboard-2-ui-compass
```

Then restart Node-RED.

### Via Node-RED Palette Manager

1. Open Node-RED editor
2. Click **☰ menu → Manage palette**
3. Go to the **Install** tab
4. Search for `@wexgaard/node-red-dashboard-2-ui-compass`
5. Click **Install**

## Usage

### Basic Setup

1. Drag the **compass** node from the Dashboard category onto your flow
2. Double-click to configure:
   - **Group**: Select a Dashboard 2.0 group (required)
   - **Label**: Optional label to display above the compass
   - **Width**: Widget width in grid units (1-12, default: 2)
   - **Height**: Widget height in grid units (default: 5)
3. Connect a node that outputs numeric values to the compass node
4. Deploy your flow

### Input Format

The compass widget expects `msg.payload` to contain a numeric value representing degrees:

```javascript
// Example: Send heading of 45 degrees (Northeast)
msg.payload = 45;
return msg;
```

**Valid Input Values:**
- **0-360**: Direct compass heading
- **Negative values**: Automatically normalized (e.g., -90 becomes 270)
- **Values > 360**: Automatically normalized (e.g., 450 becomes 90)
- **Strings**: Parsed to numbers if valid (e.g., "180" becomes 180)

**Compass Directions:**
- 0° = North
- 90° = East
- 180° = South
- 270° = West

### Example Flow

```json
[
    {
        "id": "inject-node",
        "type": "inject",
        "name": "Test Heading",
        "props": [{"p":"payload"}],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "45",
        "payloadType": "num",
        "x": 150,
        "y": 100,
        "wires": [["compass-node"]]
    },
    {
        "id": "compass-node",
        "type": "ui-compass",
        "name": "Direction",
        "group": "group-id",
        "label": "Heading",
        "width": 2,
        "height": 5,
        "x": 350,
        "y": 100,
        "wires": []
    }
]
```

### Common Use Cases

**GPS Heading:**
```javascript
// From GPS data
msg.payload = msg.payload.heading; // 0-360
return msg;
```

**Random Direction (for testing):**
```javascript
msg.payload = Math.floor(Math.random() * 360);
return msg;
```

**Simulated Rotation:**
```javascript
// In a function node with context
let heading = context.get('heading') || 0;
heading = (heading + 10) % 360;
context.set('heading', heading);
msg.payload = heading;
return msg;
```

## Requirements

- Node-RED v3.0.0 or higher
- @flowfuse/node-red-dashboard v1.0.0 or higher
- Node.js v14.0.0 or higher

## License

MIT

## Author

Mikkel Nygaard

## Repository

https://github.com/mikkelertbjerg/node-red

## Support

For issues related to this widget, please open an issue on the [GitHub repository](https://github.com/mikkelertbjerg/node-red/issues).

For general Node-RED Dashboard 2.0 questions, visit the [Node-RED forums](https://discourse.nodered.org/).
