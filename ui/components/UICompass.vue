<template>
    <v-card class="ui-compass-card" elevation="2">
        <v-card-title v-if="props.label" class="text-subtitle-1 pa-2">
            {{ props.label }}
        </v-card-title>
        <v-card-text class="pa-4">
            <div class="compass-display">
                <span class="heading-value">{{ displayHeading }}</span>
                <span class="degree-symbol">°</span>
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

.compass-display {
    display: flex;
    align-items: baseline;
    justify-content: center;
    font-size: 3rem;
    font-weight: 300;
    line-height: 1;
}

.heading-value {
    font-variant-numeric: tabular-nums;
}

.degree-symbol {
    font-size: 2rem;
    margin-left: 0.1em;
}
</style>
