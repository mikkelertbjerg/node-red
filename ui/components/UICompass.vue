<template>
    <v-card class="ui-compass-card" elevation="2">
        <v-card-title v-if="props.label" class="text-subtitle-1 pa-2">
            {{ props.label }}
        </v-card-title>
        <v-card-text class="pa-4">
            <div class="compass-container">
                <!-- Visual Compass -->
                <div class="compass-visual">
                    <!-- Compass Circle with Markings -->
                    <svg class="compass-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <!-- Main circle -->
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2" />

                        <!-- Degree tick marks every 30° -->
                        <line v-for="deg in [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]"
                              :key="deg"
                              :x1="50 + 45 * Math.sin(deg * Math.PI / 180)"
                              :y1="50 - 45 * Math.cos(deg * Math.PI / 180)"
                              :x2="50 + 40 * Math.sin(deg * Math.PI / 180)"
                              :y2="50 - 40 * Math.cos(deg * Math.PI / 180)"
                              stroke="currentColor"
                              stroke-width="1.5" />

                        <!-- Cardinal directions (inside circle) -->
                        <text x="50" y="18" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor">N</text>
                        <text x="82" y="53" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor">E</text>
                        <text x="50" y="86" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor">S</text>
                        <text x="18" y="53" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor">W</text>

                        <!-- Intercardinal directions (smaller) -->
                        <text x="73" y="30" text-anchor="middle" font-size="6" fill="currentColor" opacity="0.7">NE</text>
                        <text x="73" y="73" text-anchor="middle" font-size="6" fill="currentColor" opacity="0.7">SE</text>
                        <text x="27" y="73" text-anchor="middle" font-size="6" fill="currentColor" opacity="0.7">SW</text>
                        <text x="27" y="30" text-anchor="middle" font-size="6" fill="currentColor" opacity="0.7">NW</text>
                    </svg>

                    <!-- Rotating Needle (extends past circle) -->
                    <svg
                        class="compass-needle"
                        viewBox="0 0 10 100"
                        xmlns="http://www.w3.org/2000/svg"
                        :style="{ transform: `rotate(${heading}deg)` }"
                    >
                        <path d="M5 0L9 48L1 48L5 0Z" fill="#FF5252" />
                        <path d="M5 52L1 48L9 48L5 52Z" fill="#424242" />
                        <circle cx="5" cy="50" r="3" fill="currentColor" />
                    </svg>
                </div>

                <!-- Numeric Display with Cardinal Direction -->
                <div class="compass-display">
                    <span class="heading-value">{{ displayHeading }}°</span>
                    <span class="cardinal-direction">{{ cardinalDirection }}</span>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'UICompass',
    inject: ['$socket', '$dataTracker'],
    props: {
        id: { type: String, required: true },
        props: { type: Object, default: () => ({}) },
        state: { type: Object, default: () => ({}) }
    },
    data() {
        return {
            heading: 0
        }
    },
    computed: {
        displayHeading() {
            // Format to show whole number or one decimal place
            return this.heading % 1 === 0
                ? this.heading.toFixed(0)
                : this.heading.toFixed(1);
        },
        cardinalDirection() {
            // Calculate cardinal/intercardinal direction
            const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                              'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
            const index = Math.round(this.heading / 22.5) % 16;
            return directions[index];
        }
    },
    created() {
        // Register with Dashboard 2.0 data tracker
        this.$dataTracker(this.id, (msg) => {
            // Handle incoming messages from Node-RED
            if (msg && msg.payload !== undefined) {
                const value = msg.payload;
                if (typeof value === 'number') {
                    this.heading = value;
                }
            }
        });
    }
}
</script>

<style scoped>
.ui-compass-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.compass-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.compass-visual {
    position: relative;
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.compass-circle {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.compass-needle {
    position: absolute;
    width: 10%;
    height: 100%;
    top: 0;
    left: 45%;
    transition: transform 0.3s ease-out;
    transform-origin: center center;
}

.compass-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 2rem;
    font-weight: 300;
    line-height: 1;
}

.heading-value {
    font-variant-numeric: tabular-nums;
}

.cardinal-direction {
    font-size: 1.5rem;
    font-weight: 500;
    opacity: 0.8;
}
</style>
