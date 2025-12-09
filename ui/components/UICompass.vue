<template>
    <v-card class="ui-compass-card" elevation="2">
        <v-card-title v-if="props.label" class="text-subtitle-1 pa-2">
            {{ props.label }}
        </v-card-title>
        <v-card-text class="pa-4">
            <div class="compass-container">
                <!-- Visual Compass -->
                <div class="compass-visual">
                    <!-- Compass Circle Background -->
                    <svg class="compass-circle" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="31" fill="none" stroke="currentColor" stroke-width="2" />
                        <!-- Cardinal directions -->
                        <text x="32" y="10" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor">N</text>
                        <text x="54" y="35" text-anchor="middle" font-size="10" fill="currentColor">E</text>
                        <text x="32" y="58" text-anchor="middle" font-size="10" fill="currentColor">S</text>
                        <text x="10" y="35" text-anchor="middle" font-size="10" fill="currentColor">W</text>
                    </svg>

                    <!-- Rotating Needle -->
                    <svg
                        class="compass-needle"
                        viewBox="0 0 8 62"
                        xmlns="http://www.w3.org/2000/svg"
                        :style="{ transform: `rotate(${heading}deg)` }"
                    >
                        <path d="M4 0L8 31L0 31L4 0Z" fill="#FF5252" />
                        <path d="M4 31L0 0L8 0L4 31Z" fill="#424242" transform="translate(0 31)" />
                    </svg>
                </div>

                <!-- Numeric Display -->
                <div class="compass-display">
                    <span class="heading-value">{{ displayHeading }}</span>
                    <span class="degree-symbol">°</span>
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
    width: 150px;
    height: 150px;
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
    width: 12%;
    height: 92%;
    top: 4%;
    left: 44%;
    transition: transform 0.3s ease-out;
    transform-origin: center center;
}

.compass-display {
    display: flex;
    align-items: baseline;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 300;
    line-height: 1;
}

.heading-value {
    font-variant-numeric: tabular-nums;
}

.degree-symbol {
    font-size: 1.8rem;
    margin-left: 0.1em;
}
</style>
